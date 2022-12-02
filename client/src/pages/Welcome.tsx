import { FC, useState } from "react";
import { Link } from "react-router-dom";
import Cake from "../assets/cake.png";
import InputText from "../components/input-text";

const Welcome = () => {

  const [currSelection, setCurrSelection] = useState("");

  const leftSide = (
    <section className="left-side">
      <h1>Welcome to Make a Cake!</h1>
      <h2>We create <b>custom cakes</b> with many personalization options!</h2>
      <h3>Tell us how many tiers you want, as well as what flavors, colors and decorations you desire</h3>
      <h3>We even offer <b>edible image printing</b>!</h3>
      <img alt="Cake" src={Cake}></img>
    </section>
  )

  if (currSelection === "create") {
    return (
      <div className="full-page welcome">
        {leftSide}
        <section className="right-side welcome-form">
          <h1>Create Account</h1>
          <InputText placeholder="First Name" />
          <InputText placeholder="Last Name" />
          <InputText placeholder="Email" />
          <InputText placeholder="Password" />
          <InputText placeholder="Confirm Password" />
          <Link to="/user">Create Account</Link>
          {/* eslint-disable-next-line */}
          <a href="" onClick={() => setCurrSelection("")}>Go Back</a>
        </section>
      </div>
    )
  } else if (currSelection === "login") {
    return (
      <div className="full-page welcome">
        {leftSide}
        <section className="right-side welcome-form">
          <h1>Log In</h1>
          <InputText placeholder="Email" />
          <InputText placeholder="Password" />
          <Link to="/user">Log In</Link>
          {/* eslint-disable-next-line */}
          <a href="" onClick={() => setCurrSelection("")}>Go Back</a>
        </section>
      </div>
    )
  }  else {
    return (
      <div className="full-page welcome">
        {leftSide}
        <section className="right-side">
          <h1>Make a Cake Today!</h1>
          <button className="login-option" onClick={() => setCurrSelection("create")}>Create Account</button>
          <button className="login-option" onClick={() => setCurrSelection("login")}>Log In</button>
          <div className="login-option"><Link to="/user">Log in as Guest</Link></div>
        </section>
      </div>
    )
  }
}
  
export default Welcome;

export interface WelcomeProps {
  setLoggedIn: Function;
  setUserType: Function;
}