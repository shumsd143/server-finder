const fetch_function=require('./fetchfunction')
const fetching=fetch_function.fetching

module.exports.findServer = function(obj){
    return new Promise(
        (resolve,reject)=>{
            let output={} //will be used for storing lowest priority server
            let size=obj.length //no of servers in the array
            //console.log(size)
            if(size===0){
                reject({'status':'not found'}) //if no server is there then reject
            }
            else if(size===undefined){ //if only one object is passed as parameter
                fetching(obj.url).then(()=>{
                    obj.status="found"
                    resolve(obj)
                }).catch(()=>{
                    reject({'status':'not found'})
                })
            }
            else{
                obj.map(data=>{  //iterating through server
                    fetching(data.url) //used above function to check for server if online or not
                    .then(()=>{
                        if(!output.url){ //checking if the output is empty or not
                            output=data
                        }
                        else{
                            if(output.priority>data.priority){ //if we have got some online server then we are comparing with current server according to priority
                                output=data
                            }
                        }
                        size--;
                        if(size===0){ //checking for last server in array
                            if(output.url){ //if there is data in output then there is some server online and it is sorted based on priority
                                output.status="found"
                                resolve(output)
                            }
                            else{
                                reject({'status':'not found'})//reject the request if we dont have any online server
                            }
                        }
                    })
                    .catch(()=>{
                        size--;
                        if(size===0){
                            if(output.url){
                                output.status="found"
                                resolve(output)
                            }
                            else{
                                reject({'status':'not found'})
                            }
                        }
                    })
                })
            }
        }
    )    
}