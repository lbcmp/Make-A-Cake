import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {

  const location = useLocation();
  const orderId = location.state;

  return (
    <div id="order-confirm">
      <div>
        <h1>Thank you for your order!</h1>
        <h2>We appreciate your support and hope you enjoy your cake when the time comes</h2>
        <p>Order #{orderId} is now processing</p>
        <Link to="/user/view-orders">View orders</Link>
      </div>
    </div>
  )
}

export default OrderConfirmation;

