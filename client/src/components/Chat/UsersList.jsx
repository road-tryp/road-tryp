import React from 'react';

const UsersList = (props) => (
  <div className='users'>
    <h3> Online Users </h3>
    <ul>
      {
        props.users.map((user, i) => {
          return (
            <li key={i}>
              {user}
            </li>
          );
        })
      }
    </ul>
  </div>
);

export default UsersList;