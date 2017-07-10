import React from 'react';
import { Button, Header, Image, Modal, Item, Rating, Grid, Segment, Divider, Label } from 'semantic-ui-react';
import axios from 'axios';
import ReviewCard from './ReviewCard.jsx';

class DriverReviews extends React.Component {

	constructor(props){
		super(props);
    this.state = {
      review: [{driver: 'Joe', accuracy_rating: 4, communication_rating: 3, driving_rating: 5, overall_rating: 4, rider: 'Dylan', written_review: 'This tryp was pretty cool I guess', add_date: '2017-07-09'}, {driver: 'Joe', accuracy_rating: 4, communication_rating: 3, driving_rating: 5, overall_rating: 1, rider: 'Dylan', written_review: 'Meh'}],
      ratings: {accuracyRating:4 ,communicationRating: 3, drivingRating: 5, overallRating: 5}
    }


	}

	componentDidMount() {

    axios.get(`/api/reviews/${this.props.driverID}`)
    .then((data) => {
      this.setState({
        review: data.data.data,
        ratings: data.data.ratings
      }, () => {console.log('inside fetch', this.state.review); console.log('ratings inside fetch', this.state.ratings)});
    });


	}

	render() {

          const { accuracyRating, communicationRating, drivingRating, overallRating } = this.state.ratings;


      return (<div>
       <Modal dimmer={this.props.dimmer} open={this.props.open} onClose={this.props.close}>
          <Modal.Header>{this.state.review[0].driver}'s Reviews</Modal.Header>

        <Grid>
        <Divider hidden/>
          <Grid.Row>
            <Grid.Column textAlign={'center'}>
            <div><Label size='big' pointing='below' > Overall </Label></div><br/>
                <Rating maxRating={5} defaultRating={overallRating} icon='star' size='massive' />
            </Grid.Column>

          </Grid.Row>

          </Grid>

        <Grid columns={3} divided>

          <Grid.Row>
            <Grid.Column textAlign={'center'}>
                <div><Label size='medium' pointing='below' > Driving </Label></div><br/>
              <Rating maxRating={5} defaultRating={drivingRating} disabled={true} icon='star' size='huge' />

            </Grid.Column>
            <Grid.Column textAlign={'center'}>
                            <div><Label size='medium' pointing='below' > Communication </Label></div><br/>
              <Rating maxRating={5} defaultRating={communicationRating} disabled={true} icon='star' size='huge' />

            </Grid.Column>
            <Grid.Column textAlign={'center'}>
                                        <div><Label size='medium' pointing='below' > Accuracy </Label></div><br/>
              <Rating maxRating={5} defaultRating={accuracyRating} disabled={true} icon='star' size='huge' />

            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />

            
          <Item.Group>

            {this.state.review.map((review, key) => {
              const {driver, accuracy_rating, communication_rating, driving_rating, overall_rating, rider, written_review, arrival_city, departure_city, add_date} = review;
              return <ReviewCard add_date={add_date} key={key} driver={driver} accuracy_rating={accuracy_rating} communication_rating={communication_rating} driving_rating = {driving_rating} overall_rating = {overall_rating} rider={rider} written_review={written_review} arrival_city={arrival_city} departure_city={departure_city}  />
            })}
  
          </Item.Group>

          </Modal>

    </div>)
	}


}

export default DriverReviews;