from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler
from jinja2 import Environment, FileSystemLoader, select_autoescape
from os import listdir
from glob import glob
import os
import sys
import time

env = Environment(
    loader=FileSystemLoader('templates'),
    autoescape=select_autoescape(['html'])
)

class Event(LoggingEventHandler):

    def dispatch(self, event):
        print("Updating web page")
        self.file = 'svgility.html'
        self.mypath = 'images'
        template = env.get_template('svgility.html')
        onlyfiles = [y for x in os.walk(self.mypath) for y in glob(os.path.join(x[0], '*.svg'))]
        with open(self.file, 'wb') as f:
            f.write(template.render(thumbfiles=onlyfiles))

if __name__ == "__main__":

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
