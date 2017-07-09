import React from 'react';
// import { Card, Icon } from 'semantic-ui-react';
import { Image, Item } from 'semantic-ui-react'


const ReviewCard = ({driver, accuracy_rating, communication_rating, driving_rating, overall_rating, rider, written_review, arrival_city, departure_city}) => {

	return (
    <Item>
      <Item.Image size='tiny' src='https://react.semantic-ui.com/assets/images/avatar/small/jenny.jpg' />

      <Item.Content>
        <Item.Header as='a'>From {departure_city} to {arrival_city}</Item.Header>
        <Item.Meta>{written_review}</Item.Meta>
        <Item.Description>
          {written_review}
        </Item.Description>
        <Item.Extra>Additional Details</Item.Extra>
      </Item.Content>
    </Item>

	)


}


export default ReviewCard;