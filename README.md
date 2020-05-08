# server-finder
Project Created By :- SHUBHAM SHEKHAR
Phone No :-8296007119

Tech Stack Used in Project :-
1.Nodejs

To use this module follow these steps-:
step-1-open the project(where this module is required) in terminal
step-2-then type command 'npm i serverfindershumsd143'
step-3-now you can use the module
step-4-now import this module in project e.g.-: 'const findServer=require('serverfindershumsd143').findServer'
step-5-findServer function takes only one parameter either a object or array of objects
step-6-each object should contain two property url and priority
       e.g-:{
                "url": "http://google.com",
                "priority": 1
            }
step-7-this function should be handled as promise as it involves asynchronous task
step-8-if the server is present then promise will return resolve and can be handled in then block and response status will be found and it will send the response of lowest priority object
step-9-if the server is not present then promise will return in catch block and response status will be not found



**Hope you like this module**