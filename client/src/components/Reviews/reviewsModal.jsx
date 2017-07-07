import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import axios from 'axios';



class DriverReviews extends React.Component {

	constructor(props){
		super(props);
    this.state = {
      review: {}
    }
	}

	componentDidMount() {

    axios.get(`/api/users/${this.props.driverID}`)
    .then((data) => {
      console.log(data);
      this.setState({
        review: data[0]
      });
    });


	}

	render() {
		return (<div>
			 <Modal dimmer={this.props.dimmer} open={this.props.open} onClose={this.props.close}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='/assets/images/avatar/large/rachel.png' />
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button color='black' onClick={this.props.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Yep, that's me" onClick={this.props.close} />
          </Modal.Actions>
        </Modal>

		</div>)
	}


}

export default DriverReviews;