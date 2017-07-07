import React from 'react';

const MessageList = (props) => (
  <div className='messages'>
    <h2> Conversation: </h2>
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