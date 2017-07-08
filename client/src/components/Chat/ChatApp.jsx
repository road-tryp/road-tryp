import React from 'react';
import Message from '../Chat/Message.jsx';
import MessageForm from '../Chat/MessageForm.jsx';
import MessageList from '../Chat/MessageList.jsx';
import UsersList from '../Chat/UsersList.jsx';
import io from 'socket.io-client'

let socket = io();

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.user = props.currentUser.username
    this.state = {
      users: [],
      messages: [],
      text: ''
    }
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this._messageRecieve = this._messageRecieve.bind(this);
  }

  componentDidMount() {
    console.log('user',this.state.user)
    socket.on('init', this._initialize);
    socket.on('chat message', this._messageRecieve);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
  }

  _initialize(data) {
    var { users, name } = data;
    this.setState({ users, user: name });
  }

  _messageRecieve(message) {
    var { messages } = this.state;
    messages.push(message);
    console.log(message);
    this.setState({ messages });
  }

  _userJoined(data) {
    var { users, messages } = this.state;
    var { name } = data;
    users.push(name);
    messages.push({
      user: 'APPLICATION BOT',
      text: name + ' Joined'
    });
    this.setState({ users, messages });
  }

  _userLeft(data) {
    var { users, messages } = this.state;
    var { name } = data;
    var index = users.indexOf(name);
    users.splice(index, 1);
    messages.push({
      user: 'APPLICATION BOT',
      text: name + ' Left'
    });
    this.setState({ users, messages });
  }

  handleMessageSubmit(message) {
    var { messages } = this.state;
    // messages.push(message);
    this.setState({ messages });
    socket.emit('chat message', message);
  }

  render() {
    return (
      <div>
        <UsersList
          users={this.state.users}
        />
        <MessageList
          messages={this.state.messages}
        />
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit}
          user={this.user}
        />
      </div>
    );
  }
};

export default ChatApp;