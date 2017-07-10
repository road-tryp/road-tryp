import React from 'react';
import { Rating } from 'semantic-ui-react';

const stars = (props) => {
	let rating = props.rating || 0;
	return (
		<Rating maxRating={5} disabled={true} defaultRating={5} rating={rating} icon='star' size='mini' />
	)
}


export default stars;
