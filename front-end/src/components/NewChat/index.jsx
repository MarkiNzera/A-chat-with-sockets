import { useContext } from "react";
import { ChatContext } from "../../providers/ChatProvider";
import NewChatCard from "../NewChatCard";
import styles from './newChat.module.css';

export default function NewChat () {

    const { newChats } = useContext(ChatContext);

    return (
        <div className={styles.newChatContainer}>
            <h2>Nova conversa</h2>
            <input type="text" />
            <div>
                {newChats?.map((chat, index) => (
                    <NewChatCard key={index} chat={chat} user={chat} />
                ))}
            </div>
        </div>
    )

}