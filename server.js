const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path'); // For cleaner file path handling

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

// Serve static files from the `public` directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin.html for the `/admin` path
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Socket.io with error handling (replace with your actual logic)
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('Connected...');

    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
        console.log('Received message:', msg);
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});
