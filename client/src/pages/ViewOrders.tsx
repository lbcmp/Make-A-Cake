import React, { useEffect, useState, FC } from "react";
import { TierType } from "./MakeCake";

const ViewOrders = () => {

  const [orders, setOrders] = useState<Array<OrderInfoType>>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/orders/12345678")
    .then((res) => res.json())
    .then((orders) => {
      console.log(orders)
      setOrders(orders)
    })
    .catch((e) => {
      console.log(e)
    })
  }, [])

  const Order:FC<OrderInfoType> = ({ order, cake, price }) => {
    return (
      <div className="order-card">
        <div
          className="order-info"
          style={{width: order.orderStatus === "Shipped" ? "70%" : "100%"}}
        >
          <h1>{`Order #${order.orderId}, Status: ${order.orderStatus}`}</h1>
          <p>Price: ${price}</p>
          {
            cake.map((tier, index) => (
              <React.Fragment key={index}>
                <h2>Tier {tier.tierOrder}</h2>
                <ul>
                  <li><b>Batter Flavor: </b>{tier.batterFlavor}</li>
                  <li><b>Inner Frosting: </b>{tier.innerFrostings.join(", ")}</li>
                  <li><b>Outer Frosting: </b>{tier.outerFrostings.join(", ")}</li>
                  <li><b>Decorations: </b>{tier.decorations.join(", ")}</li>
                  <li><b>Image File: </b>{(tier.image && tier.image.name) || "N/A" }</li>
                  <li><b>Notes: </b>{tier.notes || "N/A"}</li>
                </ul>
              </React.Fragment>
            ))
          }
        </div>
        {
          order.orderStatus === "Shipped" &&
          <div className="shipping">
            <h2>Shipping Information</h2>
            <div><b>Company: </b><p>{order.shippingCompany}</p></div>
            <div><b>Speed: </b><p>{order.shippingSpeed}</p></div>
            <div><b>Number: </b><p>{order.shippingNumber}</p></div>
          </div>
        }
      </div>
    )
  }

  return (
    <div id="view-orders">
      <h1>View Orders</h1>
      {
        orders.length === 0 &&
        <p id="no-orders">There is no history of orders to display</p>
      }
      {
        orders.length > 0 &&
        orders.map((order, index) => (
          <Order key={index} order={order.order} cake={order.cake} price={order.price} />
        ))
      }
    </div>
  )
}
  
export default ViewOrders;

export interface OrderInfoType {
  order: {
    orderId: string;
    orderPlacedTimedate: string;
    orderStatus: string;
    shippingCompany: string;
    shippingNumber: string;
    shippingSpeed: string;
  };
  cake: Array<TierType>;
  price: number;
}