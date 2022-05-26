import React, { useContext } from 'react';
import { Context } from '../context/Provider';

const Profile = () => {
  const context = useContext(Context);

  return(
  <h1>Hi {context.user.name}, you made it here, congrats!</h1>
  )
};

export default Profile;
