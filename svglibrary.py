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

env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=select_autoescape(['html'])
)

def update():
    print(datetime.now().strftime('%Y/%m/%d %H:%M:%S') + "    Updating web page")
    file = 'svglibrary.html'
    mypath = 'images'
    template = env.get_template('svglibrary.html')
    onlyfiles = [y for x in os.walk(mypath) for y in glob(os.path.join(x[0], '*.svg'))]
    with open(file, 'wb') as f:
        f.write(template.render(thumbfiles=onlyfiles))

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
