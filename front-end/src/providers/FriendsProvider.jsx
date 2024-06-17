import { useEffect, useState } from "react";
import api from "../services/api";

export const FriendsProvider = ( chat, user ) => {
    const [friend, setFriend] = useState(null);

    const friendId = chat ? (chat.friendId === user.userId ? chat.userId : chat.friendId) : null;

    useEffect(() => {
        const getFriend = async () => {
            if(friendId) {
                const response = await api.get(`/users/${friendId}`);
                if(response.status === 200) {
                    setFriend(response.data);
                } else {
                    console.error(response.data.message);
                }
            } else {
                return null;
            }
        }

        getFriend();
    }, [friendId]);

    return {friend};
}