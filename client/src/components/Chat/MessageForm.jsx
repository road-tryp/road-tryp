import React from 'react';

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var message = {
      user: this.props.user || 'anonymous',
      text: this.state.text,
      tripId: this.props.tripId
    }
    console.log('handlesubmit message',message);
    this.props.onMessageSubmit(message);
    this.setState({ text: '' });
  }

  changeHandler(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    return (
      <div className='message_form'>
        <h3>Write New Message</h3>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.changeHandler}
            value={this.state.text}
          />
        </form>
      </div>
    );
  }
};

export default MessageForm;