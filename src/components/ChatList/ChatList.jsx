// src/components/ChatList/ChatList.jsx
import React from "react";
import "./ChatList.css";
// PATH DIPERBAIKI: Naik dua tingkat (dari src/components/ChatList/)
import { assets } from "../../assets/assets.js"; 

const ChatList = ({ onViewChange }) => {
  const chats = assets.chats_data;

  return (
    <section className="chatlist">
      <header className="chatlist-header">WhatsApp</header>
      <div className="chatlist-items">
        {chats.map(chat => (
          // Klik pada chat list akan membuka chat utama (Main)
          <div key={chat.id} className="chatlist-entry" onClick={() => onViewChange('Main')}> 
            <img src={chat.avatar} className="chatlist-avatar" alt={chat.name} />
            <div className="chatlist-info">
              <div className="chatlist-top">
                <span className="chatlist-name">{chat.name}</span>
                <span className="chatlist-time">{chat.time}</span>
              </div>
              <span className="chatlist-last">{chat.last}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChatList;