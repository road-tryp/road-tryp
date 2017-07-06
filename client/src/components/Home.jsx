import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import Search from './Search/Search.jsx';
import { withRouter } from 'react-router';
import FeaturedDestinations from './FeaturedDestinations.jsx';
import mapChart from './utils/mapChart.js';


class Home extends React.Component {
  constructor(props) {
    super(props);
    mapChart();
  }

  render() {
    return (
    <Container>
      <Header as='h1' id='main-header'>
        ToadTryp
      </Header>
      <Header as='h2' id='main-header2'>
        Go anywhere with a fellow Toad.
      </Header>
      <Search currentUser={this.props.currentUser} />
      <div className="container">
        <div id="chartdiv"></div>
      </div>

      <FeaturedDestinations currentUser={this.props.currentUser}/>
    </Container>
    );
  }
}

export default withRouter(Home);