const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
app.use(express.static('public'));
const io = socketIO(server);

// TODO add event listener for socket.io connections
io.on('connection', socket => {
    console.log('a user has connected')

    socket.on('newMessage', data => {
        console.log(data)
        io.emit('dispenseMessage', data)
    })

    socket.on('disconnect', () => {
        console.log('a user has disconneted')
    })
})

app.get('/', (req, res) => {
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});