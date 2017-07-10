import React from 'react';
import Message from './Message.jsx';

const listStyle = {height: '435px', overflow: 'auto', borderStyle: 'inset'}

const MessageList = (props) => (
  <div className='messages' style={listStyle}>
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