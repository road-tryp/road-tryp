import React from 'react';

const Message = (props) => (
  <div className="message">
    <strong>{props.user} :</strong>
    <span>{props.text}</span>
  </div>
);

export default Message;
