# test server request async abilites

""" 
    Purpose of this test is  To see if an our async endpoints are truly
    asynchronus.
    To test this program run 
    uvicorn config.asgi:application --reload
    To be sure that the server is runing asynchronusly
    then run this script to observe the behaviour of the server

    Final Note we lose alot of efficiency by runing both sync and ascyn view so its in our best
    intrest to switch all view to async
"""
import asyncio
import json
from aiohttp  import ClientSession
from requests.sessions import session
import time
import random

async def simple_get_request(url):
    print("started")
    async with ClientSession() as session:        
        res = await session.get(url)
        print("DONE")

async def main():
    print("Runing on an async endpoint")
    
    url = "http://127.0.0.1:8000/api/v1/socket/tests/async/"
    await asyncio.gather(
        simple_get_request(url),
        simple_get_request(url),
        simple_get_request(url),
    )



async def main_2():
    print("Runing on an a sync endpoint")

    url = "http://127.0.0.1:8000/api/v1/socket/tests/sync/"
    
    await asyncio.gather(
        simple_get_request(url),
        simple_get_request(url),
        simple_get_request(url),
    )

if __name__ == "__main__":
    start = time.time()
    asyncio.run(main())
    end = time.time()
    print(f"3 requests to an async endpoint at the sametime took {end-start} seconds")

    start = time.time()
    asyncio.run(main_2())
    end = time.time()
    print(f"3 requests to an sync endpoint at the sametime took {end-start} seconds")
