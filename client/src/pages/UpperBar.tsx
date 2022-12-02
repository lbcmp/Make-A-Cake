import { Link, Outlet } from "react-router-dom";
import Cake from "../assets/cake.png";

const UpperBar = () => {
    return (
        <>
            <div id="upper-bar">
                <div>
                    <h1>Make a Cake</h1>
                    <img alt="Cake" src={Cake}></img>
                </div>
                <Link to="/">Log Out</Link>
            </div>
            <Outlet />
        </>
    )
}

export default UpperBar;