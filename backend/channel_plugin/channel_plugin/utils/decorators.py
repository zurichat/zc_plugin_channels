import asyncio
from functools import wraps



def to_async(blocking):
    @wraps(blocking)
    def run_wrapper(*args, **kwargs):
        return asyncio.run(blocking(*args, **kwargs))
    return run_wrapper
