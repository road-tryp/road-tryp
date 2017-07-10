import React from 'react';
import { Button, Header, Image, Modal, Item, Rating, Grid, Segment, Divider, Label } from 'semantic-ui-react';
import axios from 'axios';
import OverallRating from './AddReviewComponents/OverallRating.jsx';
import AccuracyRating from './AddReviewComponents/AccuracyRating.jsx';
import CommunicationRating from './AddReviewComponents/CommunicationRating.jsx';
import DrivingRating from './AddReviewComponents/DrivingRating.jsx';
import WrittenReview from './AddReviewComponents/WrittenReview.jsx';

class AddReview extends React.Component {

	constructor(props){
		super(props);
    this.state = {
    currentState: 'overallRating',
     overallRating: null,
     accuracyRating: null,
     drivingRating: null,
     communicationRating: null,
     writtenReview: '',
     driverID: null,
     riderID: null,
     tripID: null
    };

	}

	componentDidMount() {
    console.log('props', this.props);
	}

  handleOverallRating(e, { rating, maxRating }) {

    this.setState({
      overallRating: rating
    });

  }

  handleAccuracyRating(e, { rating, maxRating }) {

    this.setState({
      accuracyRating: rating
    });

  }


  handleDrivingRating(e, { rating, maxRating }) {

    this.setState({
      drivingRating: rating
    });

  }


  handleCommunicationRating(e, { rating, maxRating }) {

    this.setState({
      communicationRating: rating
    }, console.log(this.state));

  }

  handleWrittenReview(func, e) {
    this.setState({
      writtenReview: e.value
    });
  }

  handleSubmission() {

    axios.post('/api/add-review', {
     overallRating: this.state.overallRating,
     accuracyRating: this.state.accuracyRating,
     drivingRating: this.state.drivingRating,
     communicationRating: this.state.communicationRating,
     writtenReview: this.state.writtenReview,
     riderID: this.props.riderID,
     tripID: this.props.tripID,

    })
    .then((response) => {
      console.log('successfully added review', response);
    });

  this.props.close();

  }


	render() {

    return(
      <Modal dimmer={this.props.dimmer} open={this.props.open} onClose={this.props.close}  >


       <Modal.Header>Add a review</Modal.Header>
          <Modal.Content >
              <Grid centered columns={2}>
                <Divider hidden/>
                  
                    <Grid.Column textAlign={'center'}>
                    <div>
                     <Label size='big' pointing='below' > Overall </Label>
                    </div>  <br/>
                    <OverallRating handleRatings={this.handleOverallRating.bind(this)} />

                    <br/>
                    <br/>

                           <div>
                     <Label size='big' pointing='below' > Driving </Label>
                    </div>  <br/>
                    <DrivingRating handleRatings={this.handleDrivingRating.bind(this)} />
                    <br/><br/>

                           <div>
                     <Label size='big' pointing='below' > Accuracy </Label>
                    </div>  <br/>
                    <AccuracyRating handleRatings={this.handleAccuracyRating.bind(this)} />
                    <br/><br/>
                           <div>
                     <Label size='big' pointing='below' > Communication </Label>
                    </div>  <br/>
                    <CommunicationRating handleRatings={this.handleCommunicationRating.bind(this)}/>
                    <br/><br/>
                           <div>
                     <Label size='big' pointing='below' > Comments </Label>
                    </div>  <br/>
                    <WrittenReview handleWrittenReview={this.handleWrittenReview.bind(this)} />
                    </Grid.Column>
                </Grid>
          
          </Modal.Content>


          <Modal.Actions>
            <Button color='black' onClick={this.props.close}>
              Nope
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content="Done" onClick={this.handleSubmission.bind(this)} />
          </Modal.Actions>




      </Modal>

      )

  }

}

export default AddReview;