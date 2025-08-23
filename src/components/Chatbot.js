import React, { useState } from 'react';
import { sendChatMessage } from '../api';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    // Call backend
    const response = await sendChatMessage(input);
    setMessages([...newMessages, { sender: "bot", text: response.reply }]);
  };

  return (
    <div className="chatbot">
      <div className="chat-window" style={{ border: "1px solid #ccc", padding: 10, height: 300, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          style={{ width: "80%" }}
        />
        <button onClick={handleSend} style={{ width: "18%", marginLeft: "2%" }}>
          Send
        </button>
      </div>
    </div>
  );
}