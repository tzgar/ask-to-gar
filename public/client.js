const socket = io()
let textarea = document.querySelector('#textarea')

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: "?",
        message: message.trim()
    }
    textarea.value = ''
    console.log(msg.message)
    // Send to server 
    socket.emit('message', msg)

}
