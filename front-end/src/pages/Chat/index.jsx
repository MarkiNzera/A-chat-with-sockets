import { useContext, useEffect } from 'react';
import styles from './chat.module.css';
import Header from "../../components/Header";
import Aside from '../../components/Aside';
import Footer from '../../components/Footer';
import Message from '../../components/Message';
import NewChat from '../../components/NewChat';
import { AuthContext } from '../../providers/AuthProvider';
import { ChatContext } from '../../providers/ChatProvider';
import { FriendsProvider } from '../../providers/FriendsProvider';

export default function Chat () {

    const { user } = useContext(AuthContext);
    const { currentChat, messages, messageContainer, showNewChat, showNewChatForm } = useContext(ChatContext);
    const { friend } = FriendsProvider(currentChat, user);

    useEffect(() => {
        function handleClickOutside(event) {
            if (document.getElementById("newChat") && !document.getElementById("newChat").contains(event.target) && showNewChat){
                showNewChatForm();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showNewChat, showNewChatForm]);

    return (
        <div className={styles.chatContainer}>
            {showNewChat && <NewChat />}
            <Aside />
            <main>
                {
                    currentChat && (
                        <>
                            <Header friend={friend} />
                            <div className={styles.messagesContainer} ref={messageContainer}>
                                {messages?.map((message, index) => (
                                    <Message key={index} text={message.content} sender={message.userId} createdAt={message.createdAt} />
                                ))}
                            </div>
                            <Footer currentChat={currentChat} />
                        </>
                    )
                }
            </main>
        </div>
    )
}