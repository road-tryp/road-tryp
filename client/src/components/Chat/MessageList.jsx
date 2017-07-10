import React from 'react';
import Message from './Message.jsx';

const MessageList = (props) => (
  <div className='messages'>
    <h3> Chat with your trip-mates: </h3>
    {
      props.messages.map((message, i) => {
        return (
          <Message
            key={i}
            user={message.user}
            text={message.text}
          />
        );
      })
    }
  </div>
);

export default MessageList;