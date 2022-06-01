import React, { useState } from "react";

export const Context = React.createContext();

const Provider = (props) => {
  // empty template for user data, used initial for state & to reset after sign up & logout
  const emptyUser = {
    email: "",
    password: "",
    name: "",
    city: "",
    age: "",
  };

  // states for checking login status & storing user data for both sign up & profile
  let [loggedIn, setLoggedIn] = useState(false);
  let [user, setUser] = useState(emptyUser);

  // set user data for either registration or login
  const handleInfo = (event, category) => {
    setUser({
      ...user,
      [category]: event.currentTarget.value,
    });
  };

  return (
    <Context.Provider
      value={{
        emptyUser,
        loggedIn,
        setLoggedIn,
        user,
        setUser,
        handleInfo,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
