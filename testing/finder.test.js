const finder=require('../index')

const find_server=finder.findServer

test('testing when all server is offline',()=>{
    return find_server([
        {
            "url": "http://doesNotExist.boldtech.co",
            "priority": 1
          },
          {
            "url": "http://offline.boldtech.co",
            "priority": 2
          }
    ]).catch(data=>{
        expect(data.status).toBe('not found')
    })
})
test('testing for if server is send on priority',()=>{
    return find_server([
    {
        "url": "https://filesshar.herokuapp.com/",
        "priority": 1
    },
    {
        "url": "http://boldtech.co",
        "priority": 7
    },
    {
        "url": "http://google.com",
        "priority": 4
    }
    ]).then(data=>{
        expect(data.url).toBe('https://filesshar.herokuapp.com/')
    })
})
test('testing for if only one server is passed',()=>{
    return find_server({
        "url": "http://google.com",
        "priority": 4
    }).then(data=>{
        expect(data.url).toBe('http://google.com')
    })
})
test('testing for if only one server is passed and is offline',()=>{
    return find_server({
        "url": "http://doesNotExist.boldtech.co",
        "priority": 4
    }).catch(data=>{
        expect(data.status).toBe('not found')
    })
})