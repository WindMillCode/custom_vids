# Watchdog Python File Watcher

## [Youtube Tutorial Here](https://youtu.be/ouGI2_p0Bfo)
## Download the Lab [Here](https://downgit.github.io/#/home?url=https://github.com/codequickie123/custom_vids/tree/master/watchdog_python_file_watcher)
## Pip Install
```ps1
pip install watchdog --target .\site-packages
```

## module setup
* in watchdog.py
```py
import sys
import time
sys.path.append(sys.path[0] + "\\site-packages")
from watchdog.events import LoggingEventHandler
from watchdog.observers import Observer
from importlib import reload
# import your_sample_module_file chanllenge
```

## Do something on file changes
```py
class WatchDogEvent(LoggingEventHandler):
    def on_modified(self, event):
        print("file modified")
        restart_server = True   
```

## Start the thread 
```py
if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else '.'
    observer = Observer()
    observer.schedule(WatchDogEvent(), path, recursive=True)

    observer.start()
    try:
        while True:         
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
       
```

## Challenge Can you guess what this does
* watch the youtube video to find out
```py
class ModuleFinder(importlib.machinery.PathFinder):

    def __init__(self):
        self.path_map = {"tables":your_sample_module_file.__spec__.loader}

    def find_spec(self, fullname, path, target=None):
        
        if not fullname in self.path_map:
            return None
        print(importlib.util.spec_from_loader(fullname,self.path_map[fullname] ))
        return importlib.util.spec_from_loader(fullname, self.path_map[fullname])
        # return ".\\tables.py"

    def find_module(self, fullname, path):
        return None # No need to implement, backward compatibility only

sys.meta_path.append(ModuleFinder())
print(sys.meta_path)


while True:
	# start to modify your_sample_module_file.py
	importlib.reload(your_sample_module_file)
	print(your_sample_module_file.sample_var) # did it change :)))
	time.sleep(2)
```


### Resources

[watchdog](https://pypi.org/project/watchdog/)
[reload module hint](https://stackoverflow.com/questions/19009932/import-arbitrary-python-source-file-python-3-3)
[setting up an importer](https://docs.python.org/3/library/importlib.html#setting-up-an-importer)
