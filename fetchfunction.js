const fetch=require('node-fetch')

//checking for response of server
module.exports.fetching=function(url){
    return new Promise(
        (resolve,reject)=>{
            fetch(url)
            .then((res)=>{
                if(res.status>199 && res.status<300){  //checking if the status code is between 200 and 299 if not reject
                    resolve({'status':'found'}) //status code is between 200 and 299 then resolve
                }
                else{
                    reject({'status':'wrong code'}) //status code not in betwee 200 and 299 then reject
                }
            })
            .catch((err)=>{reject({'status':'not found'})}) //if server is not found then reject
            setTimeout(()=>{  //here request is waiting for response for 5 seconds if request is not received in 5 seconds then reject
                reject({'status':'timeout'})
            },5000)
        }
    )
}