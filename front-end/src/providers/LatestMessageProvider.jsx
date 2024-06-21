import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../src/providers/ChatProvider";
import api from "../services/api";

export const LatestMessageProvider = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            const response = await api.get(`/pvmessages/friendship/${chat.friendshipId}`);

            if(response.status === 200) {
                const lastMessage = response?.data[response?.data?.length - 1];

                if(lastMessage) {
                    setLatestMessage(lastMessage);
                }
            } else {
                console.error(response.data.message);
            }
        }

        getMessages();

    }, [newMessage, notifications, chat.friendshipId]);

    return { latestMessage };
}