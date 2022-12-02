import { FC } from "react";
import { NavLink } from "react-router-dom";

const UserHome = () => {
    return (
      <div className="full-page user-home">
        <NavLink to="" className="option"><button><h1>Profile</h1></button></NavLink>
        <NavLink to="/user/make-cake" className="option"><button><h1>Make a Cake</h1></button></NavLink>
        <NavLink to="/user/view-orders" className="option"><button><h1>View Orders</h1></button></NavLink>
      </div>
    )
}
  
export default UserHome;