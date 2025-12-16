'use client';

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
interface SocketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string) => void;
  messages: string[];
}

const SocketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
    return context;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
  const sendMessage: ISocketContext['sendMessage'] = useCallback(
    (msg: string) => {
      console.log("Send Message", msg);
        if (socket) {
            console.log("Emitting message via socket");
            socket.emit('event:message', { message: msg });
        }
    },
    [socket]
  );

  const onMessageReceived = useCallback((message: string) => {
    console.log("Message received from server:", message);
    const {message: messageObj} = JSON.parse(message) as { message: string };
    setMessages(prev=> [...prev, messageObj]);
  }, []);

  useEffect(() => {
    const _socket: Socket = io('http://localhost:8000');
    _socket.on('message', onMessageReceived);

    _socket.on('connect', () => {
      console.log(`Connected to server with id: ${_socket.id}`);
    });
    setSocket(_socket);

    return () => {
        _socket.disconnect();
        _socket.off('message', onMessageReceived);
        setSocket(null);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, messages }}>
      {children}
    </SocketContext.Provider>
  );
};
