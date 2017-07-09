import React from 'react';
import { Button, Header, Image, Modal, Item, Rating } from 'semantic-ui-react';
import axios from 'axios';
import ReviewCard from './ReviewCard.jsx';

class DriverReviews extends React.Component {

	constructor(props){
		super(props);
    this.state = {
      review: [{driver: 'Joe', accuracy_rating: 4, communication_rating: 3, driving_rating: 5, overall_rating: 4, rider: 'Dylan', written_review: 'This tryp was pretty cool I guess'}, {driver: 'Joe', accuracy_rating: 4, communication_rating: 3, driving_rating: 5, overall_rating: 1, rider: 'Dylan', written_review: 'Meh'}],
      ratings: ''
    }
	}

	componentWillMount() {

    axios.get(`/api/users/${this.props.driverID}`)
    .then((data) => {
      // console.log('data inside fetch', data);
      this.setState({
        review: data.data.data,
        ratings: data.data.ratings
      }, () => {console.log('inside fetch', this.state.review); console.log('ratings inside fetch', this.state.ratings)});
    });


	}

	render() {
    
      return (<div>
       <Modal dimmer={this.props.dimmer} open={this.props.open} onClose={this.props.close}>
          <Modal.Header>{this.state.review[0].driver}'s Reviews</Modal.Header>

            <Rating maxRating={5} defaultRating={3} icon='star' size='massive' />
            <Rating maxRating={5} defaultRating={3} icon='star' size='huge' />
            <Rating maxRating={5} defaultRating={3} icon='star' size='huge' />
            <Rating maxRating={5} defaultRating={3} icon='star' size='huge' />

            
          <Item.Group>

            {this.state.review.map((review, key) => {
              const {driver, accuracy_rating, communication_rating, driving_rating, overall_rating, rider, written_review, arrival_city, departure_city} = review;
              return <ReviewCard key={key} driver={driver} accuracy_rating={accuracy_rating} communication_rating={communication_rating} driving_rating = {driving_rating} overall_rating = {overall_rating} rider={rider} written_review={written_review} arrival_city={arrival_city} departure_city={departure_city}  />
            })}
  
          </Item.Group>
          </Modal>

    </div>)
	}


}

export default DriverReviews;