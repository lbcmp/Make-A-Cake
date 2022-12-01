import { FC } from "react";

const UserHome:FC<UserHomeProps> = ({ setLoggedIn }) => {
    return (
      <div>
        Home

        <button onClick={() => setLoggedIn(false)}>Log Out</button>
      </div>
    )
  }
  
export default UserHome;

export interface UserHomeProps {
  setLoggedIn: Function;
}