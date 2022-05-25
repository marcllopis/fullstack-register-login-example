import { Link } from "react-router-dom";

const Error = () => (
  <>
    <h1>Sorry, something went wrong... &#128543;</h1>
    <Link to={"/"} className="buttonify">
      Return to the main page
    </Link>
  </>
)

export default Error;
