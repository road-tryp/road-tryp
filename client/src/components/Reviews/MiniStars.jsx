import React from 'react';
import { Rating } from 'semantic-ui-react';

const stars = () => {
	return (
		<Rating maxRating={5} disabled={true} defaultRating={5} icon='star' size='mini' />
	)
}


export default stars;
