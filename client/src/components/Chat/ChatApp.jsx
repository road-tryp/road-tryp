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
    this.user = props.currentUser.username;
    this.tripId = props.tripId;
    this.state = {
      users: [],
      messages: [],
      text: ''
    }
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this._messageRecieve = this._messageRecieve.bind(this);
    this._initialize = this._initialize.bind(this);
  }

  componentDidMount() {
    // on mount, send a request to the server to get all the saved messages
    console.log('trip id', this.tripId);
    socket.emit('connected', this.tripId);
    socket.on('archivedMessages', this._initialize);
    socket.on('init', this._initialize);
    socket.on('chat message', this._messageRecieve);
    socket.on('user:join', this._userJoined);
    socket.on('user:left', this._userLeft);
  }

  _initialize(data) {
    // console.log('initialized');
    // var { users, name } = data;
    // this.setState({ users, user: name });
    let allMessages = data.map((message) => {
      return {'user': message.username, 'text': message.message_text}
    })
    console.log('allmessages', allMessages);
    this.setState({messages: allMessages});
  }

  _messageRecieve(message) {
    var { messages } = this.state;
    messages.push(message);
    this.setState({ messages });
  }

  _userJoined(data) {
    console.log('a user joined');
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
    this.setState({ messages });
    socket.emit('chat message', message);
  }

  render() {
    const formWidth = {width:'100%'};
    return (
      <div>
        <h3> Chat with your trip-mates: </h3>
        <MessageList
          messages={this.state.messages}
        />
        <MessageForm
          onMessageSubmit={this.handleMessageSubmit}
          user={this.user}
          tripId={this.tripId}
          style={formWidth}
        />
      </div>
    );
  }
};

export default ChatApp;