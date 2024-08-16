const socket = io();

let messageArea = document.querySelector('.message__area');

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div');
  let className = type;
  mainDiv.classList.add(className, 'message');

  // Handle different message types
  if (type === 'incoming') {
    mainDiv.innerHTML = `
        <p>question:</p>
        <h4 class="mess">${msg.message}</h4>
    `;
  } else if (type === 'outgoing') {
    mainDiv.innerHTML = `
        <p>answer:</p>
        <h4 class="mess">${msg.message}</h4>
    `;
  }

  messageArea.appendChild(mainDiv);
}

// Handle socket connection events
socket.on('connect', () => {
  console.log('Connected to server');
  // Show a message or hide a loading indicator
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  // Show a message or display a connection error indicator
});

socket.on('error', (error) => {
  console.error('Socket error:', error);
  // Show an error message to the user
});

// Recieve messages 
socket.on('message', (msg) => {
  appendMessage(msg, 'incoming');
  // Only scroll to bottom if necessary
  if (messageArea.scrollTop + messageArea.clientHeight >= messageArea.scrollHeight - 10) {
    scrollToBottom();
  }
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
