import React from 'react';
// import { Card, Icon } from 'semantic-ui-react';
import { Image, Item } from 'semantic-ui-react'


const ReviewCard = ({driver, accuracy_rating, communication_rating, driving_rating, overall_rating, rider, written_review, arrival_city, departure_city, add_date}) => {

  let parsedAddDate = add_date.split('T')[0];

	return (
    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />

      <Item.Content>
        <Item.Header as='a'>From {departure_city} to {arrival_city}</Item.Header>
        <Item.Meta>Added on:  {parsedAddDate} by {rider}</Item.Meta>
        <Item.Description className="largeFont">
          {written_review}
        </Item.Description>

      </Item.Content>

      <br/>
    </Item>


	)


}


export default ReviewCard;