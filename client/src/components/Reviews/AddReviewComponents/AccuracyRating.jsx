import React from 'react';
import { Rating } from 'semantic-ui-react';

const AccuracyRating = (props) => {
	
	return (
		<div>
			<Rating maxRating={5} defaultRating={0} onRate={props.handleRatings} icon='star' size='huge' />
		</div>
	)

}


export default AccuracyRating;
