import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMessages } from '../redux/slices/messagesSlice';
import '../styles/messagesPageStyle.css'

const Messages = () => {
  const dispatch = useDispatch();
  const { inbox, loading } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  return (
    <div className="messages-page container">
      <h2>Messages</h2>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <ul>
          {inbox.map((message) => (
            <Link to={`/messages/${message?.otherUser?._id}`} key={message._id} className="message-item">
              <div className="message-sender">{message?.otherUser?.name}</div>
              <div className="message-preview">{message?.content}</div>
              <div className="message-timestamp">{new Date(message?.createdAt).toLocaleString()}</div>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;