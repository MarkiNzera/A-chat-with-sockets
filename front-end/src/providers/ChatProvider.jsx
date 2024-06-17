import { createContext, useState, useEffect, useCallback, useRef } from "react";
import api from "../services/api";

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
    const [chats, setChats] = useState(null);
    const [newChats, setNewChats] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const messageContainer = useRef(null);
    const [showNewChat, setShowNewChat] = useState(false);

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


    useEffect(() => {
        const getMessages = async () => {
            if(currentChat) {
                const response = await api.get(`/pvmessages/friendship/${currentChat.friendshipId}`);
                if(response.status === 200) {
                    setMessages(response.data);
                } else {
                    console.log(response.data.message);
                    console.error(response.data.message);
                }
            }
        }

        getMessages();
    }, [currentChat])


    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    
    function scrollToBottom() {
        if (messageContainer.current) {
            messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
        }
    }


    const sendMessage = useCallback(async(
        message,
        friendshipId,
        userId,
        clearInput
    ) => {
        if(message) {
            const response = await api.post('/pvmessages', {
                content: message,
                friendshipId: friendshipId,
                userId: userId
            })
            if(response.status === 201) {
                setNewMessage(response.data.pvmessage)
                clearInput('');
                setMessages((prev) => [...prev, response.data.pvmessage])
                scrollToBottom();
            } else {
                console.error(response.data.message);
            }
        }
    }, [])


    const startChat = useCallback(async (userId, friendId) => {
        const response = await api.post('/friendships', {userId, friendId})
        if(response.status === 201) {
            setChats((prev) => [...prev, response.data.friendship])
            setCurrentChat(response.data.friendship);
            setShowNewChat(false);
        } else {
            console.error(response.data.message)
        }
    }, [])


    const selectChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, [])


    const showNewChatForm = useCallback(() => {
        setShowNewChat(!showNewChat);
    }, [showNewChat]);


    return (
        <ChatContext.Provider value={{
            chats,
            user,
            newChats,
            startChat,
            currentChat,
            selectChat,
            messages,
            sendMessage,
            messageContainer,
            showNewChat,
            showNewChatForm
        }}>
            {children}
        </ChatContext.Provider>
    ) 
}