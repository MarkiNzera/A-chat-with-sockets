import { createContext, useState, useEffect, useCallback, useRef } from "react";
import api from "../services/api";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatProvider = ({ children, user }) => {
    const [chats, setChats] = useState(null);
    const [newChats, setNewChats] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState(null);
    const messageContainer = useRef(null);
    const [showNewChat, setShowNewChat] = useState(false);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    
    useEffect(() => {
        const newSocket = io("http://localhost:4000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }
    }, [user])


    useEffect(() => {
        if(socket && user?.userId) {
            socket.emit("login", user?.userId);
            socket.on("getConnectedUsers", (response) => {
                setOnlineUsers(response);
            })
        }
    }, [socket, user?.userId])


    //send messages
    useEffect(() => {
        if (newMessage !== null && newMessage?.isSent !== null) {
            if(socket && !newMessage?.isSent) {
                const friendId = currentChat ? (currentChat.friendId === user?.userId ? currentChat.userId : currentChat.friendId) : null;
        
                socket.emit("sendMessage", {...newMessage?.message, friendId});
                newMessage.isSent = true;
            }
        }        
    }, [chats, currentChat,socket, newMessage, user?.userId])


    //receive messages
    useEffect(() => {
        if(socket) {

            socket.on("getMessage", (message) => {
                if(currentChat?.userId !== message.userId && currentChat?.friendId !== message.userId) {
                    return;
                }

                setMessages((prev) => [...prev, message]);
            })

            socket.on("getNotification", (res) => {
                const isChatOpen = currentChat?.friendId === res?.senderId || currentChat?.userId === res?.senderId;

                if(isChatOpen) {
                    setNotifications((prev) => [{...res, isRead: true}, ...prev]);
                } else {
                    setNotifications(prev => [res, ...prev])
                }
            })

            return () => {
                socket.off("getMessage");
                socket.off("getNotification");
            }
        }
    }, [socket, currentChat])


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
    }, [chats, user?.userId, onlineUsers]);


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
        clearInput,
        isSent = false
    ) => {
        if(message) {
            const response = await api.post('/pvmessages', {
                content: message,
                friendshipId: friendshipId,
                userId: userId
            })
            if(response.status === 201) {
                let message = response.data.pvmessage;
                setNewMessage({message, isSent})
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

    
        const showNewChatForm = useCallback(() => {
            setShowNewChat(!showNewChat);
        }, [showNewChat]);

        
        const checkNotifications = useCallback((userUnreadMessages, notifications) => {

            const readedNotifications = notifications.map(e => {
                let notification;

                userUnreadMessages.forEach(n => {
                    if(n.senderId === e.senderId) {
                        notification = {...n, isRead: true}
                    } else {
                        notification = e;
                    }
                })

                return notification;
            }) 


            setNotifications(readedNotifications);
            
        }, [])
        
        
        const selectChat = useCallback((chat) => {
            setCurrentChat(chat);
        }, [])

        function formatDate(date) {
            const formatTime = new Date(date);
        
            return formatTime.toLocaleTimeString("pt-BT", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            });
        }
        

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
            showNewChatForm,
            onlineUsers,
            notifications,
            checkNotifications,
            formatDate
        }}>
            {children}
        </ChatContext.Provider>
    ) 
}