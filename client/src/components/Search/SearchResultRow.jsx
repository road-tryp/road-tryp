import React from 'react';
import { Table, Header, Image, Label, Popup, Button, Message } from 'semantic-ui-react';
import formatTime from '../utils/formatTime.js';
import dateParser from '../utils/dateParser.js';
import Stars from '../Reviews/MiniStars.jsx';
import ReviewsModal from '../Reviews/reviewsModal.jsx';

class SearchResultRow extends React.Component {

    constructor(props) {
      super(props);
      this.state = ({
        open: false
      });
      this.showModal = this.showModal.bind(this);
      this.closeModal = this.closeModal.bind(this);

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

    return (

        <Table.Row>
            <Table.Cell>
            <Header as='h3' textAlign='left' color='green'>${this.props.trip.price}</Header>
            </Table.Cell>
            <Table.Cell textAlign='left'> {this.props.trip.departure_city}, {this.props.trip.departure_state}</Table.Cell>
            <Table.Cell singleLine>{formatTime(this.props.trip.departure_time)} <br/> {dateParser(this.props.trip.departure_date)}</Table.Cell>
            <Table.Cell singleLine>{this.props.trip.arrival_city}, {this.props.trip.arrival_state}</Table.Cell>
            <Table.Cell singleLine>{formatTime(this.props.trip.arrival_time)} <br/> {dateParser(this.props.trip.arrival_date)}</Table.Cell>  
            <Table.Cell singleLine>{this.props.driverDetails.year} {this.props.driverDetails.make || 'No Vehicle Information'} {this.props.driverDetails.model}</Table.Cell>
            <Table.Cell singleLine>{this.props.trip.seats}</Table.Cell>
            <Table.Cell textAlign='left'><a onClick={this.showModal}>Joe Lei</a>, <Stars /> </Table.Cell>
            <Table.Cell singleLine textAlign='right'><Button color='green' value={this.props.trip.id} onClick={this.props.handleClick}>Select</Button> </Table.Cell>
            <ReviewsModal dimmer = {true} open = {this.state.open} close = {this.closeModal}  driverID = {this.props.trip.driver_id}/>

         </Table.Row>    
    )
  }


}

export default SearchResultRow;