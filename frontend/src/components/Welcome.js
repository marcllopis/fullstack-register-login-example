import { Link } from "react-router-dom";
import '../App.css';

const Welcome = () => (
  <section className="welcome">
    <h1>Welcome to Profilebook</h1>
    <h3>Some short description</h3>
    <div>
      <Link to={"/register"} className="buttonify">
        Sign up for a free account
      </Link>
      <Link to={"/login"} className="buttonify">
        Log in with existing account
      </Link>
    </div>
  </section>
);

export default Welcome;
