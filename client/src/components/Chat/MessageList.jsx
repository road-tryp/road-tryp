import React from 'react';
import Message from './Message.jsx';

const listStyle = {height: '435px', overflow: 'auto'}

const MessageList = (props) => (
  <div className='messages' style={listStyle}>
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