import { FC } from "react";

const Welcome:FC<WelcomeProps> = ({ setLoggedIn }) => {
    return (
      <div>
        Welcome

        <button onClick={() => setLoggedIn(true)}>Log In</button>
      </div>
    )
  }
  
export default Welcome;

export interface WelcomeProps {
  setLoggedIn: Function;
}