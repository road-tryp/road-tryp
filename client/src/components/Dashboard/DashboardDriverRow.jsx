import React from 'react';
import { Table, Header, Label, Popup } from 'semantic-ui-react';
import TripsDetailsPopup from './TripDetailsPopup.jsx';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import formatTime from '../utils/formatTime.js';

class DashboardDriverRow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      driver: {},
      redirectTo: null,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  getDriverInfoById() {
    axios.get(`/api/users/id`, {
      params: {
        id: this.props.trip.driver_id
      }
    }) 
      .then( driverObj => {
        this.setState({ driver: driverObj.data});
      })
      .catch( err => {
        console.log('Error getting driver in DashboardDriverRow: ', err);
      })
  }

  handleClick(e) {
    console.log('click handler working', redirectTo)
    this.setState({
        redirectTo: `/trip/${e.target.value}`
    })
  }

  render() {

    return (
      <Table.Row>
      <Table.Cell>
        <Header as='h2' textAlign='center'>{this.props.trip.id}</Header>
      </Table.Cell>
      <Table.Cell textAlign='left'>{this.props.trip.departure_date} < br /> {formatTime(this.props.trip.departure_time)} </Table.Cell>
      <Table.Cell>{this.props.trip.departure_city}, {this.props.trip.departure_state} </Table.Cell>
      <Table.Cell>{this.props.trip.arrival_date} <br /> {formatTime(this.props.trip.arrival_time)} </Table.Cell>
      <Table.Cell singleLine>{this.props.trip.arrival_city}, {this.props.trip.arrival_state}  </Table.Cell>
      <Table.Cell singleLine>${this.props.trip.price}</Table.Cell>
      <Table.Cell singleLine>{this.props.trip.seats}</Table.Cell>
      <Table.Cell singleLine> 
  
      <Popup
        trigger={<Label ribbon>Details</Label>}
        content={
           <TripsDetailsPopup trip={this.props.trip} driverDetails={this.state.driver} handleClick={this.state.handleClick} />
          }
        on='click'
        onOpen={this.getDriverInfoById.bind(this)}
        position='bottom right'
      /> 
      </Table.Cell>
              {this.state.redirectTo &&
          <Redirect push to={{pathname: this.state.redirectTo}} />}
    </Table.Row>

    )
    
  } //end redner

} // end class

export default DashboardDriverRow;

