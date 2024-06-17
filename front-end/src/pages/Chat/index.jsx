import { io } from 'socket.io-client';
import { useState, useEffect } from 'react';
import styles from './chat.module.css';
import Header from "../../components/Header";
import Aside from '../../components/Aside';
import Footer from '../../components/Footer';
import Message from '../../components/Message';
import api from '../../services/api';
import NewChat from '../../components/NewChat';

export default function Chat () {
    const [socketRef, setSocketRef] = useState(null);

    useEffect(() => {
        setSocketRef(io("http://localhost:8080/"));
    }, []);

    async function getBDMessages() {
        const response = await api.get('/pvmessages');
        if(response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    }

    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const sendMessage = async () => {
        const user = JSON.parse(localStorage.getItem('userId'));
    
        if(inputMessage.trim() !== "") {
            const messageData = {
                content: inputMessage,
                friendshipId: 1,
                userId: user
            };
    
            const response = await api.post('/pvmessages', messageData);
    
            if (response.status === 201) {
                socketRef.emit("message", {msg: inputMessage, userId: user});
                setInputMessage("");
            } else {
                console.error('Error:', response);
            }
        }
    }

    useEffect(() => {
        const loadAndSaveMessages = async () => {
            const bdMessages = await getBDMessages();
            setMessages(bdMessages);
        };
    
        loadAndSaveMessages();
    
        if (socketRef) {
            const showMsg = (data) => {
                setMessages(prevMessages => {
                    const newMessage = {
                        content: data.msg,
                        friendshipId: 1,
                        userId: data.userId
                    };
                    return [...prevMessages, newMessage];
                });
            };
        
            socketRef.on("showmsg", showMsg);
        
            return () => {
                socketRef.off("showmsg", showMsg);
                socketRef.disconnect();
            };
        }
    }, [socketRef]);

    return (
        <div className={styles.chatContainer}>
            <NewChat  />
            <Aside setCurrentChat={setCurrentChat} />
            <main>
                <Header currentChat={currentChat} />
                <div className={styles.messagesContainer}>
                    {messages.map((msg, index) => {
                        const user = JSON.parse(localStorage.getItem('userId'));
                        const isSent = msg.userId === user;

                        return (
                            <Message key={index} text={msg.content} sent={isSent} />
                        );
                    })}
                </div>
                <Footer inputMessage={inputMessage} setInputMessage={setInputMessage} event={sendMessage} />
            </main>
        </div>
    )
}