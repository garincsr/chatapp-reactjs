import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import io from "socket.io-client";
import ChatBot from "./pages/ChatBot";
import Chat from "./Chat";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <div className="App" >
              {!showChat ? (
                <div className="joinChatContainer">
                  <h3>Join A Chat</h3>
                  <input
                    type="text"
                    placeholder="Enter your nickname"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Enter your room name or ID"
                    onChange={(event) => {
                      setRoom(event.target.value);
                    }}
                  />
                  <button onClick={joinRoom}>Join A Room</button>
                  <a href="/chat"><button>Join Chat Bot</button></a>
                </div>
              ) : (
                <Chat socket={socket} username={username} room={room} />
              )}
            </div>
          } />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
