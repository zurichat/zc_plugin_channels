from datetime import datetime,timedelta
from pytz import utc
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.memory import MemoryJobStore
from .queue_handler import QueueHandler as QHandler
# from .task_handlers import JoinTaskHandler

scheduler = BackgroundScheduler()

def job_function():
    print(datetime.now().time().strftime('%H:%M:%S'))


# def run_qhandler_schedule(Handler=QHandler, Workers):
    # print(datetime.now().time().strftime('%H:%M:%S'))
    # Handler.run(Workers)