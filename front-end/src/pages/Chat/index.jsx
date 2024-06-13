import { io } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import styles from './chat.module.css';
import Header from "../../components/Header";
import Aside from '../../components/Aside';
import Footer from '../../components/Footer';
import Message from '../../components/Message';

export default function Chat () {
    const socketRef = useRef(io("http://localhost:8080/"));


    const [currentChat, setCurrentChat] = useState(null);


    const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem('messages')) || []);
    const [inputMessage, setInputMessage] = useState("");

    const sendMessage = () => {
        if(inputMessage.trim() !== "") {
            
            socketRef.current.emit("message", {msg: inputMessage});
            setInputMessage("");
        }
    }

    useEffect(() => {
        const showMsg = (data) => {
            setMessages(prevMessages => {
                const newMessages = [...prevMessages, data.msg];
                localStorage.setItem('messages', JSON.stringify(newMessages));
                return newMessages;
            });
        };
    
        socketRef.current.on("showmsg", showMsg);
    
        return () => {
            socketRef.current.off("showmsg", showMsg);
        };
    }, []);

    return (
        <div className={styles.chatContainer}>
            <Aside setCurrentChat={setCurrentChat} />
            <main>
                <Header currentChat={currentChat} />
                <div className={styles.messagesContainer}>
                    {messages.map((msg, index) => (
                        <Message key={index} text={msg} />
                    ))}
                </div>
                <Footer inputMessage={inputMessage} setInputMessage={setInputMessage} event={sendMessage} />
            </main>
        </div>
    )
}