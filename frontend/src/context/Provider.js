import React, { useState } from "react";

export const Context = React.createContext();

const Provider = (props) => {
  let [loggedIn, setLoggedIn] = useState(false);
  let [registration, setRegistration] = useState(false);
  let [user, setUser] = useState("");
  let [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    city: "",
    age: "",
  })

  const handleInfo = (event, category) => {
    setNewUser({
      ...newUser,
      [category]: event.currentTarget.value,
    });
  }; 

  return (
    <Context.Provider value={{
      loggedIn,
      setLoggedIn,
      registration,
      setRegistration,
      user,
      setUser,
      newUser,
      setNewUser,
      handleInfo
    }}>
      {props.children}
    </Context.Provider>
  )
};

export default Provider;
