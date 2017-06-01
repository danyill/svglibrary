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

env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=select_autoescape(['html'])
)
env.globals['quote'] = urllib.quote

def pywalker(path):
    folderFiles = {}
    for dirName, subDirs, files in os.walk(path):
        # print dirName
        folderFiles[dirName.split('\\')[-1]] = [os.path.join(dirName, f) for f in files]
        # for f in files:
        #    print( '  * ' + os.path.join(dirName, f) )
    return folderFiles

def update():
    print(datetime.now().strftime('%Y/%m/%d %H:%M:%S') + "    Updating web page")

    tagsAndFiles = pywalker('images')
    file = 'svglibrary.html'
    mypath = 'images'
    template = env.get_template('svglibrary.html')

    with open(file, 'wb') as f:
        f.write(template.render(thumbfiles=tagsAndFiles, keys=tagsAndFiles.keys().sort()))


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
