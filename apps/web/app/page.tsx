'use client';

import React, { useState } from 'react';
import { useSocket } from '../context/SocketProvider';

export default function Page() {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState('');
  return (
    <div>
      <h1>Welcome to the Scalable Chat App</h1>
      <h3>Start chatting with your friends now!</h3>

      <div>
        <input
          type="text"
          placeholder="Type your message here..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          
        />
        <button onClick={() => sendMessage(message)}>Send</button>
      </div>


      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
