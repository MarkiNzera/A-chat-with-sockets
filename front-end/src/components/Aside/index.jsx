import React, { useContext } from 'react';
import { MdLogoDev, MdOutlineSearch, MdAdd } from "react-icons/md";
import { ChatContext } from '../../providers/ChatProvider';
import { AuthContext } from '../../providers/AuthProvider';
import Card from "../Card";
import styles from './aside.module.css'
import DarkMode from '../DarkMode';

export default function Aside () {

    const { user } = useContext(AuthContext)
    const { chats, selectChat, showNewChatForm, onlineUsers } = useContext(ChatContext);
    return (
        <aside className={styles.asideBar}>

            <header className={styles.asideHeader}>
                <div className={styles.logo}>
                    <MdLogoDev size={28}/>
                    <span>Socket Chat</span>
                </div>
                <DarkMode className={styles.mode} />
            </header>

            <div className={styles.search}>
                <input type="text"
                    placeholder="Pesquisar"
                />
                <MdOutlineSearch className={styles.searchIcon} size={18}/>

                <div className={styles.newChat} onClick={showNewChatForm}>
                    <MdAdd size={20} />
                </div>
            </div>

            <div className={styles.chatsList}>
                {chats?.map((chat, index) => {
                    return (
                        <div className={styles.friendCardContainer} key={index} onClick={() =>{
                            selectChat(chat);
                        }}>
                            <Card chat={chat} user={user}/>
                            <span className={
                                onlineUsers?.some((friend) => friend?.userId === chat?.userId && friend.userId !== user.userId) ? styles.on : styles.off
                            }></span>
                        </div>
                    );
                })}
            </div>
        </aside>
    )
}