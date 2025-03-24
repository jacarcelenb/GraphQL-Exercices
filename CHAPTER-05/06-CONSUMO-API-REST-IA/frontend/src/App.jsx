import { useState } from 'react'
import "./App.css";
import { useMutation } from "@apollo/client";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

import { SEND_PROMPT } from "./services/chatbot-service";
import './App.css'

function App() {
  const [messages, setMessages] = useState([
    {
      message: "Hola, Soy Chat AI! Pregúntame lo que sea!",
      sentTime: "justo ahora",
      sender: "ChatAI",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const [sendPrompt] = useMutation(SEND_PROMPT);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToChatGPT(message);
  };

  const processMessageToChatGPT = (message) => {
    sendPrompt({
      variables: {
        prompt: message,
      },
    })
      .then((resp) => {
        const value = resp.data.SendPrompt;

        const newMessage = {
          message: value,
          sentTime: "justo ahora",
          sender: "ChatAI",
        };

        const newMessages = [...messages, newMessage];
        setMessages(newMessages);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              isTyping ? (
                <TypingIndicator content="ChatAI está escribiendo" />
              ) : null
            }
          >
            {messages.map((message, i) => {
              console.log(message);
              return <Message key={i} model={message} />;
            })}
          </MessageList>
          <MessageInput
            placeholder="Escribe tu mensaje aquí"
            onSend={handleSend}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App
