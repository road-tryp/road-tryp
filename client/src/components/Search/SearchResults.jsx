import React from 'react';
import { Container, Header, Button, Table } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';
import SearchResultRow from './SearchResultRow.jsx';
import SearchResultTableHeader from './SearchResultTableHeader.jsx';
import Search from './Search.jsx';
import moment from 'moment';


//Resulting trips array can be found at props.location.state.trips

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      depart: '',
      arrive: '',
      seats: '',
      date: moment(),
      focused: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // date => this.setState({ date })
    console.log(e.target.name, e.target.value)
  }

  handleDate(date) {
    console.log("handle date: ", date);
    this.setState({date:date});
  }

  handleFocus(focused) {
    console.log("focused: ",focused);
    this.setState({focused:focused});
  }

  handleClick(e) {
    if (!this.props.currentUser.email) {
      this.setState({
        redirectTo: `/login`
      })
    } else {
      this.setState({
        redirectTo: `/trip/${e.target.value}`,
      })
    }
  }

  render() {
    const { currentUser, location, match } = this.props;
    const { redirectTo } = this.state;
    const tableHeaders = ['Price', 'Departure', 'Depart Date', 'Arrival', 'Arrive Date', 'Vehicle', 'Seats', 'Driver', ''];
    const fromHeader = (location.state.depart) ? `from ${location.state.depart}` : '';
    const toHeader = (location.state.arrive) ? `to ${location.state.arrive}` : '';

    return (
    <Container>
      <Header as='h1' id='main-header'>Search Results</Header>
      <Header as='h2' id='main-header2'>Showing trips <span className="green-text">{fromHeader}</span> <span className="green-text">{toHeader}</span> </Header>
      <Search currentUser={this.props.currentUser} depart={this.state.depart} arrive={this.state.arrive} seats={this.state.seats} handleChange={this.handleChange.bind(this)} date={this.state.date} handleDate={this.handleDate.bind(this)} focused={this.state.focused} handleFocus={this.handleFocus.bind(this)}/>
      <Container className="search-results">
        { (() => {
            if (location.state.trips) {
              {
                if (Array.isArray(location.state.trips)) {
                  return (
                  <Table striped padded='very'>
                    <SearchResultTableHeader headers={tableHeaders} />
                    {location.state.trips.map((trip, index) => <SearchResultRow trip={trip} driverDetails={trip.driver} handleClick={this.handleClick} key ={index}/> )}
                  </Table>);
                } else {
                  return (
                  <Table>

                    <SearchResultTableHeader  headers={tableHeaders} />
                    <SearchResultRow trip={location.state.trips} driverDetails={location.state.trips.driver} handleClick={this.handleClick}/>

                  </Table>);
                }
              }
            } else {
              return <Header>No Results Found For This Date</Header>
            }
          })()
        }

        {redirectTo &&
          <Redirect push to={{
            pathname: this.state.redirectTo,
            state: {location, match}
          }} />}
      </Container>
    </Container>);
  }
};



export default SearchResults;
