import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import axios from 'axios';



class DriverReviews extends React.Component {

	constructor(props){
		super(props);
    this.state = {
      review: {driver: 'Joe', accuracy_rating: 4, communication_rating: 3, driving_rating: 5, overall_rating: 4, rider: 'Dylan', written_review: 'This tryp was pretty cool I guess'  }
    }
	}

	componentWillMount() {

    axios.get(`/api/users/${this.props.driverID}`)
    .then((data) => {
      console.log('data inside fetch', data);
      this.setState({
        review: data.data[0]
      });
    });


	}

	render() {
    const { review } = this.state;

    
      return (<div>
       <Modal dimmer={this.props.dimmer} open={this.props.open} onClose={this.props.close}>
          <Modal.Header>{review.driver}'s Reviews</Modal.Header>
            
          </Modal>

    </div>)

    
		
	}


}

export default DriverReviews;