import React, { useContext, useEffect } from "react";
import { Context } from "../context/Provider";

const Profile = () => {
  const context = useContext(Context);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => context.setUser(data));
  }, []);

  return (
    <>
      <h1>Hi {context.user.name}, you made it here, congrats!</h1>
      <section className="user-card">
        <img src="/images/avatar.png" className="avatar" alt="avatar" />
        <div>
          <h4>Name: {context.user.name}</h4>
          <h4>Age: {context.user.age}</h4>
          <h4>City: {context.user.city}</h4>
        </div>
      </section>
    </>
  );
};

export default Profile;
