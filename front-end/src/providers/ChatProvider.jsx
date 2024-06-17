import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
    const [chats, setChats] = useState(null);
    const [newChats, setNewChats] = useState(null);


    useEffect(() => {
        const getUsers = async () => {
            const response = await api.get('/users');

            if (response.status !== 200) {
                console.error(response.data.message);
            }

            const newFriend = response.data.filter((u) => {
                let isFriend = false;

                if (u?.userId === user?.userId) {
                    return false;
                }

                if(chats) {
                    isFriend = chats.some((chat) => {
                        return chat.userId === u.userId || chat.friendId === u.userId;
                    })
                }

                return !isFriend
            })
            setNewChats(newFriend);
        }

        getUsers();
    }, [chats, user?.userId]);


    useEffect(() => {
        const getChats = async () => {
            if(user) {
                const response = await api.get(`/friendships/user/${user.userId}`);
                if(response.status === 200) {
                    setChats(response.data);
                } else {
                    console.error(response.data.message);
                }
            }
        };

        getChats();
    }, [user]);

    return (
        <ChatContext.Provider value={{
            chats,
            user,
            newChats,
        }}>
            {children}
        </ChatContext.Provider>
    ) 
}