const fetch_function=require('../fetchfunction')
const fetching=fetch_function.fetching

const fetch=require('node-fetch')

jest.mock('node-fetch', ()=>jest.fn())

console.log(fetch)

describe("request from different server",()=>{
    it('testing for correct request',()=>{
        fetch.mockResolvedValue({ status: 200 });
        return fetching('https://www.google.co.in/').then(data=>{
            expect(data.status).toBe('found')
        })
    })  
    it('testing for incorrect request',()=>{
        fetch.mockResolvedValue(null);
        return fetching('http://offline.boldtech.co').catch(data=>{
            expect(data.status).toBe('not found')
        })
    })
    it('testing for incorrect errorcode',()=>{
        fetch.mockResolvedValue({ status: 300 });
        return fetching('https://filessharygweviuewui.herokuapp.com/').catch(data=>{
            expect(data.status).toBe('wrong code')
        })
    })
    /* it('testing for website taking more than 5 second',()=>{
        return fetching('http://localhost:5000/test').catch(data=>{ //created a local server with delay time of 5 second to test
            expect(data.status).toBe('timeout')
        })
    }) */
})