import asyncio


async def main():
    print('Hello ...')
    await asyncio.sleep(1)
    print('... World!')
    await asyncio.sleep(1)
    print('Welcome')

asyncio.run(main())


async def func1():
    await asyncio.sleep(1)
    print('One')
    await func2()
    print('Four')
    await asyncio.sleep(2)
    print('Five')
    await asyncio.sleep(1)
    print('End of function 1')


async def func2():
    await asyncio.sleep(1)
    print("Two")
    await asyncio.sleep(1)
    print('Three')
    print('End of function 2')

asyncio.run(func1())

print("________________________________________")


async def func1():
    print('function 1 started...')
    await asyncio.sleep(1)
    print('function 1 ended...')


async def func2():
    print('function 2 started...')
    await asyncio.sleep(1)
    print('function 2 ended...')


async def func3():
    print('function 3 started...')
    await asyncio.sleep(1)
    print('function 3 ended...')


async def main():
    l = await asyncio.gather(func1(), func2(), func3())
    print('Main ended...')

asyncio.run(main())
