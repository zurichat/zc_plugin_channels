from apscheduler.schedulers.background import BackgroundScheduler

class SingleJobBackgroundScheduler(BackgroundScheduler):
    
    def __init__(self, **options):
        self.Custom_is_running_task = False
        super().__init__(**options)
    
    
    