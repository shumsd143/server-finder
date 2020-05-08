const finder=require('../index')

const find_server=finder.findServer
const fetch=require('node-fetch')

jest.mock('node-fetch', ()=>jest.fn())


describe("Testing for multiple servers",()=>{
    it('testing when all server is offline',()=>{
        fetch.mockResolvedValue(null,null);
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
    it('testing for if server is send on priority',()=>{
        fetch.mockResolvedValue({'status':200},{'status':201},{'status':202});
        return find_server([
        {
            "url": "https://filesshar.herokuapp.com/",
            "priority": 17
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
            expect(data.url).toBe('http://google.com')
        })
    })
    it('testing for if only one server is passed',()=>{
        fetch.mockResolvedValue({ status: 200 });
        return find_server({
            "url": "http://google.com",
            "priority": 4
        }).then(data=>{
            expect(data.url).toBe('http://google.com')
        })
    })
    it('testing for if only one server is passed and is offline',()=>{
        fetch.mockResolvedValue(null);
        return find_server({
            "url": "http://doesNotExist.boldtech.co",
            "priority": 4
        }).catch(data=>{
            expect(data.status).toBe('not found')
        })
    })
})