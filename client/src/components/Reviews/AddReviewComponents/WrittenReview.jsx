import React from 'react'
import { Input } from 'semantic-ui-react'

const WrittenReview = (props) => (
  <Input placeholder='Tell us more' size='massive' onChange={props.handleWrittenReview}/>
)

export default WrittenReview