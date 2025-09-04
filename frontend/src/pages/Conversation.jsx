import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchConversation, sendMessage } from '../redux/slices/messagesSlice';
import '../styles/conversation.css';

const Conversation = () => {
    const { friendId } = useParams();
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.messages.conversation);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        dispatch(fetchConversation(friendId));
    }, [dispatch, friendId]);

    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            await dispatch(sendMessage({ receiverId: friendId, content: newMessage }));
            setNewMessage('');
            await dispatch(fetchConversation(friendId));
        }
    };

    return (
        <div className="messaging-conversation">
            <div className="messages-list">
                {messages.map((message) => (
                    <div key={message._id} className={`message ${message?.sender?._id === friendId ? 'received' : 'sent'}`}>
                        <p>{message?.content}</p>
                        <span>{new Date(message?.createdAt).toLocaleTimeString()}</span>
                    </div>
                ))}
            </div>
            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Conversation;