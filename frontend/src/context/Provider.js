import React, { useState } from "react";

export const Context = React.createContext();

const Provider = (props) => {
  let [loggedIn, setLoggedIn] = useState(false);
  let [userName, setUserName] = useState("");
  let [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
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
      userName,
      setUserName,
      newUser,
      setNewUser,
      handleInfo
    }}>
      {props.children}
    </Context.Provider>
  )
};

export default Provider;
