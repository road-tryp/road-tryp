import React from 'react';
import { Segment, Container, Header, Button, Checkbox, Form, Input, Select } from 'semantic-ui-react';
import range from 'lodash/range';
import axios from 'axios';
import SearchResults from './SearchResults.jsx';
import {Redirect} from 'react-router-dom';
import query from 'query-string';
import moment from 'moment';
// Requirements for AirBnB's React-Calendar
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      trips: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.fetch();
  }

  fetch() {
    const depart = this.props.depart;
    const arrive = this.props.arrive;
    const seats = this.props.seats;
    const departdate = moment(this.props.date._d).format('YYYY-MM-DD');
    console.log('departure date: ', departdate)
    console.log('seats: ',  this.props.seats)
    axios.get('/api/trips', {
      params: { depart, arrive, departdate, seats }
    })
    .then((response) => {
      console.log('resonse inside axios', response);
      this.setState({
        redirectTo: '/searchresults',
        trips: response.data
      });
      console.log('Successfully fetched trips in the Search Component');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    let s = range(1, 6);
    const {redirectTo, trips} = this.state;
    const currentUser = this.props.currentUser;
    const depart = this.props.depart;
    const arrive = this.props.arrive;

    return (
      <Form size="large" onSubmit={this.handleSubmit} className="container">
        <Form.Group inline>
          <Form.Input width={6} type="text" name="depart" placeholder="Depart City" value={this.props.depart} onChange={this.props.handleChange}/>
          <Form.Input width={6} type="text" name="arrive" placeholder="Arrive City" value={this.props.arrive} onChange={this.props.handleChange}/>
          <Form.Field width={3}>
            <SingleDatePicker date={this.props.date} onDateChange={date => this.props.handleDate(date)} focused={this.props.focused} onFocusChange={({ focused }) => this.props.handleFocus(focused)} />
          </Form.Field>
          <Form.Field width={2}>
            <select className="ui dropdown" color="grey" name="seats" value={this.props.seats} onChange={this.props.handleChange}>
              <option key="Seats" value="#" >Seats</option>
              {s.map( (n, i) => {
                return <option key={i} value={n}>{n}</option>;
              })}
            </select>
          </Form.Field>
          <Button width={1} color="green" type="submit">Search</Button>
        </Form.Group>

        {redirectTo && (
          <Redirect from={'/'} push to={{
            pathname: redirectTo,
            state: { trips, depart, arrive, currentUser }
          }}/>
        )}
      </Form>
    );
  }
}

export default Search;