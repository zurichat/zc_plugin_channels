from datetime import datetime,timedelta
from pytz import utc
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.memory import MemoryJobStore
from apps.syncApp.queue_handler import QueueHandler as QHandler
from apps.syncApp.task_handler import JoinTaskHandler, RemoveTaskHandler


def job_function():
    print(datetime.now().time().strftime('%H:%M:%S'))


def run_qhandler_schedule(Handler=QHandler, Workers = [JoinTaskHandler,RemoveTaskHandler]):
    print("\n\n" +datetime.now().time().strftime('%H:%M:%S'))
    Handler.run(Workers)
    print("\n\nDone")

def my_listener(event):
    if event.exception:
        print('The job crashed :(')
    else:
        print('The job worked :)')

