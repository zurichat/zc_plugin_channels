from apscheduler.schedulers.background import BackgroundScheduler

class SingleJobBackgroundScheduler(BackgroundScheduler):

    def __init__(self):
        self.Custom_is_running = False
        super().__init__()
    