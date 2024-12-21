// to initialize node project, type 'npm init -y' into the terminal
    // common framework/package used in Node.js ecosystem is Express.js

// run server by typing 'node server.js' in terminal or
// run server using npm and package.json by adding a script to package.json 
// add "dev": "node server.js" then type 'npm run dev', but this method doesn't respond to changes in codebase
// instead, install nodemon, a developer dependency, using 'npm install --save-dev nodemon'
// change "dev": "node server.js" to "dev": "nodemon server.js", now changes will be reflected in terminal

// initialize server using Express.js with 4 main lines of code

// 1) define variable express set to require express package

const express = require('express')

// 2) define backend application

const app = express()

// 3) define port
    // port - subdirectory in IP address, location within a device
    // IP address - address of a device
    // The address of this sever connected to the network is: 
    // URL -> http://localhost:8383
    // IP -> 127.0.0.1:8383

const PORT = 8383

let data = ['Chris']

// Middleware - configuration between incoming request and interpreting request
    // this line below configures server to expect JSON data as incoming request

app.use(express.json())

// Different request methods have different status code 
    // 200 range indicates sucess
    // 400 range indicates communication error
    // 500 range indicates server-side error
    // ex: res.sendStatus(201)

// CRUD - create, read, update, delete
    // create - POST request
    // read - GET request
    // update - PUT request
    // delete - DELETE request

// Endpoint = HTTP verbs (method) and routes (aka paths)
// two arguments, route and arrow function with request and response as arguments
// the method informs the nature of the request and the route is a further subdirectory
// direct request to this body of code to respond appropriately and these routes are called endpoints

// Type 1 - Website endpoint 
// these endpoints are for sending back HTML and come when user enters URL into browser

app.get('/', (req, res) => {
    console.log('User requested home page')
    res.send(`
        <body style="background:green; color:red;">
            <h1>Data:</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        <script>console.log('This is a script that appears in the web browser')</script>
        `)
})

app.get('/dashboard', (req, res) => {
    console.log('User requested dashboard')
    res.send(`
        <body>
            <h1>Dashboard</h1>
            <a href="/">Home</a>
        </body>
        `)
})

// Type 2 - API endpoint (nonvisual)
    // to test these endpoints, use a client emulator (REST Client extension) to emulate process of sending network requests

app.get('/api/data', (req, res) => {
    console.log('This endpoint is for data')
    res.status(200).send(data)
})

app.post('/api/data', (req, res) => {
    // define newEntry to access incoming request and look for body (data) of request
        // ex: someone wants to create a new user
        // the new user clicks the sign up button after entering their credentials, and their browser sends
        // a network request to the server to handle that action

    const newEntry = req.body 
    console.log(newEntry)

    // push newEntry and add name entry to array
    data.push(newEntry.name)

    res.sendStatus(201)
})

app.delete('/api/data', (req, res) => {
    data.pop()
    console.log('Deleted element at end of array')
    res.sendStatus(203)
})

// 4) configure and listen to incoming requests to IP address at specific PORT
    // second argument is callback function to be executed when server is running
    // this line always goes at the very bottom of our code

app.listen(PORT, () => console.log(`Server has started on: ${PORT}`))