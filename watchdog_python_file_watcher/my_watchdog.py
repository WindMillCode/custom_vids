import sys
import time
sys.path.append(sys.path[0] + "\\site-packages")
from watchdog.events import LoggingEventHandler
from watchdog.observers import Observer
from importlib import reload


class WatchDogEvent(LoggingEventHandler):
    def on_modified(self, event):
        print("file modified")
        restart_server = True


if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
    observer = Observer()
    observer.schedule(WatchDogEvent(), path, recursive=True)
    print("Starting File Watcher")
    observer.start()
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
