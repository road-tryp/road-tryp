import React from 'react';
import { Table, Header, Image, Label, Popup, Button, Message } from 'semantic-ui-react';
import formatTime from '../utils/formatTime.js';
import dateParser from '../utils/dateParser.js';
import Stars from '../Reviews/MiniStars.jsx';
import ReviewsModal from '../Reviews/reviewsModal.jsx';
import axios from 'axios';

class SearchResultRow extends React.Component {

    constructor(props) {
      super(props);
      this.state = ({
        open: false,
        driverOverallRating: 0
      });
      this.showModal = this.showModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      
    }

    componentWillMount() {
      this.getDriverOverallRating();
    }


  getDriverOverallRating() {

    axios.get(`/api/driver-ratings/${this.props.driverDetails.id}`)
    .then((data) => {
      console.log('overall rating', data.data[0].overall_rating);
      this.setState({
        driverOverallRating: data.data[0].overall_rating
      });
    });
  }


  showModal () {
    console.log('ran showModal');
    this.setState({
      open: true
    });
  }

  closeModal() {
    console.log('ran closeModal');
    this.setState({
      open: false
    });
  }

  render() {
    console.log('trip obj', this.props.driverDetails.id);

    return (

        <Table.Row>
            <Table.Cell>
            <Header as='h3' textAlign='left' color='green'>${this.props.trip.price}</Header>
            </Table.Cell>
            <Table.Cell textAlign='left'> {this.props.trip.departure_city}, {this.props.trip.departure_state}</Table.Cell>
            <Table.Cell singleLine>{formatTime(this.props.trip.departure_time)} <br/> {dateParser(this.props.trip.departure_date)}</Table.Cell>
            <Table.Cell textAlign='left'>{this.props.trip.arrival_city}, {this.props.trip.arrival_state}</Table.Cell>
            <Table.Cell singleLine>{formatTime(this.props.trip.arrival_time)} <br/> {dateParser(this.props.trip.arrival_date)}</Table.Cell>  
            <Table.Cell textAlign='left'>{this.props.driverDetails.year} {this.props.driverDetails.make || 'No Info'} {this.props.driverDetails.model}</Table.Cell>
            <Table.Cell singleLine>{this.props.trip.seats}</Table.Cell>
            <Table.Cell textAlign='left'><a onClick={this.showModal}>{this.props.driverDetails.first_name + ' ' + this.props.driverDetails.last_name}</a>, <Stars rating = {this.state.driverOverallRating} /> </Table.Cell>
            <Table.Cell singleLine textAlign='right'><Button color='green' value={this.props.trip.id} onClick={this.props.handleClick}>Select</Button> </Table.Cell>
            <ReviewsModal dimmer = {true} open = {this.state.open} close = {this.closeModal}  driverID = {this.props.trip.driver_id}/>

         </Table.Row>    
    )
  }


}

export default SearchResultRow;