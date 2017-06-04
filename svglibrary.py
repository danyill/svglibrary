#!/usr/bin/python2

from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
from jinja2 import Environment, FileSystemLoader, select_autoescape
from os import listdir
from glob import glob
import os
import sys
import time
from datetime import datetime
import urllib
import collections

BASE_PATH = os.path.abspath(os.path.dirname(sys.argv[0])) + os.path.sep

env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=select_autoescape(['html'])
)
env.globals['quote'] = urllib.quote

def pywalker(path):
    folderFiles = {}
    for dirName, subDirs, files in os.walk(path):
        file_list = [os.path.join(dirName, f) for f in files]
        if file_list != []:
            folderFiles[os.path.split(dirName)[-1]] = file_list
    folderFiles.pop('images')
    all_sorted = collections.OrderedDict(sorted(folderFiles.items()))
    return all_sorted

def update():

    # we sleep a second in case the user has copied a number of files to minimise the events
    time.sleep(1)
    tagsAndFiles = pywalker('images')
    file = 'svglibrary.html'
    mypath = 'images'
    template = env.get_template('svglibrary.html')

    with open(file, 'wb') as f:
        f.write(template.render(thumbfiles=tagsAndFiles, keys=tagsAndFiles.keys().sort(), basepath=BASE_PATH))

    print(datetime.now().strftime('%Y/%m/%d %H:%M:%S') + "    Updated web page")


class Event(LoggingEventHandler):

    def dispatch(self, event):
        update()

if __name__ == "__main__":

    update()

    event = Event()
    observer = Observer()
    observer.schedule(event, 'images', recursive=True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()

    observer.join()
