const express = require('express');
const http = require('http')
const socket = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socket(server)
const port = 4001

const messageArray = [
    {name: "Steph", message: "Hello World!"}
]

io.on('connection', socket => {
    //console log connection and get initial data
    console.log('User is connected')
    io.emit('chat', messageArray)

    //when there's a new data from the client, add it to array and emit back entire array to client
    socket.on('chat', (data) => {
        messageArray.push(data)
        console.log(messageArray)
        io.emit('chat', messageArray)
    })
})

server.listen(port, () => console.log(`listening on port ${port}`))
