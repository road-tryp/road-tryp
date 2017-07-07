import React from 'react';
import Message from '../Chat/Message.jsx';
import MessageForm from '../Chat/MessageForm.jsx';
import MessageList from '../Chat/MessageList.jsx';
import UsersList from '../Chat/UsersList.jsx';



class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: ['a','b','c','d'],
      messages: [{user: 'cry',text: 'cry was here oshfaskhksajhf kjsafh kjashf kjashfkjsahf kashfkashf kashfkjash'}, {user: 'crylai',text: 'crylai was here alhfkashdkjsahf kjsahfkjashfkjashfkasfhks fhjkshfksajhfkjfhkjsdfjdskgkdsgflkdfksdbsldiuhgsdlkjvhsofhosudhkdjsfhliusdhfgo;wdfhksdjfhlsdiuufhds '},{user: 'cry',text: 'cry was here oshfaskhksajhf kjsafh kjashf kjashfkjsahf kashfkashf kashfkjash'}, {user: 'crylai',text: 'crylai was here alhfkashdkjsahf kjsahfkjashfkjashfkasfhks fhjkshfksajhfkjfhkjsdfjdskgkdsgflkdfksdbsldiuhgsdlkjvhsofhosudhkdjsfhliusdhfgo;wdfhksdjfhlsdiuufhds '},{user: 'cry',text: 'cry was here oshfaskhksajhf kjsafh kjashf kjashfkjsahf kashfkashf kashfkjash'}, {user: 'crylai',text: 'crylai was here alhfkashdkjsahf kjsahfkjashfkjashfkasfhks fhjkshfksajhfkjfhkjsdfjdskgkdsgflkdfksdbsldiuhgsdlkjvhsofhosudhkdjsfhliusdhfgo;wdfhksdjfhlsdiuufhds '},{user: 'cry',text: 'cry was here oshfaskhksajhf kjsafh kjashf kjashfkjsahf kashfkashf kashfkjash'}, {user: 'crylai',text: 'crylai was here alhfkashdkjsahf kjsahfkjashfkjashfkasfhks fhjkshfksajhfkjfhkjsdfjdskgkdsgflkdfksdbsldiuhgsdlkjvhsofhosudhkdjsfhliusdhfgo;wdfhksdjfhlsdiuufhds '}],
      text: ''
    }
  }

  // componentDidMount() {
  //   socket.on('init', this._initialize);
  //   socket.on('send:message', this._messageRecieve);
  //   socket.on('user:join', this._userJoined);
  //   socket.on('user:left', this._userLeft);
  // }

  _initialize(data) {
    var { users, name } = data;
    this.setState({ users, user: name });
  }

  _messageRecieve(message) {
    var { messages } = this.state;
    messages.push(message);
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
    messages.push(message);
    this.setState({ messages });
    socket.emit('send:message', message);
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
          user={this.state.user}
        />
      </div>
    );
  }
};

export default ChatApp;