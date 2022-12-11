import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputText from "../components/InputText";
import { TierType } from "./MakeCake";

const PlaceOrder = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const cake: Array<TierType> = location.state.reverse();
  console.log(cake)

  const flatTierRate = 15; // Flat rate per tier
  const perAdditionalTierRate = 5; // Per additional tier, add this amount to flat rate
  const extraFrostingRate = 2; // One type of inner/outer frosting is included; Add this amount per extra type of frosting
  const decorationRate = 3; // Add this amount per decoration
  const flatImageRate = 5; // Add this amount if there is an image
  const overheadAmount = 15;
  const shippingSelections: Record<string, number> = {
    "Expedited":15,
    "Priority Express":10.00,
    "Standard":5
  }

  const [tierPrices, setTierPrices] = useState<Array<TierPriceType>>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfoType>({
    address: "",
    city: "",
    state: "",
    zipcode: "",
    notes: ""
  });
  const [submittedShippingInfo, setSubmittedShippingInfo] = useState(false);
  const [totalPriceWithShipping, setTotalPriceWithShipping] = useState(0);
  const [shippingSelection, setShippingSelection] = useState("");

  const getStates = () => {
    return [ "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Washington DC", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
  }

  useEffect(() => {
    let cakeTierPrices: Array<TierPriceType> = [];
    let totalCakePrice = 0;
    
    for(let i = 0; i < cake.length; ++i) {
      const tier = cake[i];

      const flatTierAmount = flatTierRate + (perAdditionalTierRate * i);
      const extraInnerFrostingAmount = extraFrostingRate * (tier.innerFrostings.length - 1);
      const extraOuterFrostingAmount = extraFrostingRate * (tier.outerFrostings.length - 1);
      const decorationsAmount = decorationRate * tier.decorations.length;
      const imageAmount = tier.image ? flatImageRate : 0;
      const tierTotal = flatTierAmount + extraInnerFrostingAmount + extraOuterFrostingAmount + decorationsAmount + imageAmount;
      
      cakeTierPrices.push({
        flatTierAmount: flatTierAmount,
        extraInnerFrostingAmount: extraInnerFrostingAmount,
        extraOuterFrostingAmount: extraOuterFrostingAmount,
        decorationsAmount: decorationsAmount,
        imageAmount: imageAmount,
        tierTotal: tierTotal
      })

      totalCakePrice += tierTotal;
    }

    setTierPrices(cakeTierPrices)
    setTotalPrice(totalCakePrice + overheadAmount)
  }, [])

  const shippingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      ...(e.target.name === "address") && { address: e.target.value },
      ...(e.target.name === "city") && { city: e.target.value },
      ...(e.target.name === "state") && { state: e.target.value },
      ...(e.target.name === "zipcode") && { zipcode: e.target.value },
      ...(e.target.name === "notes") && { notes: e.target.value },
    })
  }

  const paymentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

  const contactChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

  const placeOrder = () => {

    let modifiedCake = []
    
    for (let i = 0; i < cake.length; ++i) {
      let tier: any = {...cake[i]}
      tier = {
        tier_order: i + 1,
        batter_flavor: tier.batterFlavor,
        ...(tier.innerFrostings.length >= 1) && { inner_frosting_1 : tier.innerFrostings[0] },
        ...(tier.innerFrostings.length >= 2) && { inner_frosting_2 : tier.innerFrostings[1] },
        ...(tier.innerFrostings.length >= 3) && { inner_frosting_3 : tier.innerFrostings[2] },
        ...(tier.outerFrostings.length >= 1) && { outer_frosting_1 : tier.outerFrostings[0] },
        ...(tier.outerFrostings.length >= 2) && { outer_frosting_2 : tier.outerFrostings[1] },
        ...(tier.outerFrostings.length >= 3) && { outer_frosting_3 : tier.outerFrostings[2] },
        ...(tier.decorations.length >= 1) && { decoration_1 : tier.decorations[0] },
        ...(tier.decorations.length >= 2) && { decoration_2 : tier.decorations[1] },
        ...(tier.decorations.length >= 3) && { decoration_3 : tier.decorations[2] },
        ...(tier.image && tier.image.name) && { image: tier.image.name },
        ...(tier.notes) && { notes: tier.notes }
      }
      delete tier.innerFrostings;
      delete tier.outerFrostings;
      delete tier.decorations;

      modifiedCake.push(tier)
    }

    fetch("http://localhost:8080/api/orders/12345678", {
      method: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({
        cake: modifiedCake,
        price: totalPriceWithShipping === 0 ? totalPrice : totalPriceWithShipping,
        shippingSelection: shippingSelection
      })
    })
    .then(res => {
      if(res.ok) {
          return res.json()
      }

      throw new Error("Content validation")
    })
    .then(data => {
      navigate("/user/order-confirmation", { state: data.orderId })
    })
    .catch(e => {
        console.log(e)
        console.log("Error")
    })
  }

  const subtotalPanel = (
    <div id="subtotal">
      <h1>Pricing</h1>
      {
        tierPrices.map((tier, index) => (
          <div key={index} className="row">
            <div className="col1">Tier {index + 1}</div>
            <div className="col2">
              <React.Fragment key={index}>
                <b>Flat Tier Amount</b><p>${tier.flatTierAmount}</p>
                { tier.extraInnerFrostingAmount !== 0 && <React.Fragment><b>Extra Inner Frosting</b><p>${tier.extraInnerFrostingAmount}</p></React.Fragment> }
                { tier.extraOuterFrostingAmount !== 0 && <React.Fragment><b>Extra Outer Frosting</b><p>${tier.extraOuterFrostingAmount}</p></React.Fragment> }
                { tier.decorationsAmount !== 0 && <React.Fragment><b>Decorations</b><p>${tier.decorationsAmount}</p></React.Fragment> }
                { tier.imageAmount !== 0 && <React.Fragment><b>Image</b><p>${tier.imageAmount}</p></React.Fragment> }
                <b className="total">Total</b><p className="total">${tier.tierTotal}</p>
              </React.Fragment>
            </div>
          </div>
        ))
      }
      <div className="row">
        <div className="col1"></div>
        <div className="col2">
          <b>Service Fee</b><p>${overheadAmount}</p>
        </div>
      </div>
      <div className="row">
        <div className="col1"></div>
        <div className="col2">
          <b>Subtotal</b><p>${totalPrice}</p>
        </div>
      </div>
    </div>
  )

  const shippingPanel = (
    <div id="shipping">
      <h1>Shipping</h1>
      {
        !submittedShippingInfo &&
        <form onSubmit={(e) => {
          e.preventDefault()
          setSubmittedShippingInfo(true)
        }}>
          <InputText id="address" name="address" value={shippingInfo.address} placeholder="Address" changeHandler={shippingChangeHandler}/>
          <InputText id="city" name="city" value={shippingInfo.city} placeholder="City" changeHandler={shippingChangeHandler}/>
          <label htmlFor="state">
              <InputText
                  id="state"
                  name="state"
                  value={shippingInfo.state} placeholder="State"
                  // value={shippingInfo.state}
                  changeHandler={shippingChangeHandler}
                  list="state-datalist"
              />
              <datalist id="state-datalist">
                  {
                      getStates().map((state, index) => (
                          <option key={index} value={state}></option>
                      ))
                  }
              </datalist>
            </label>
          <InputText id="zipcode" name="zipcode" value={shippingInfo.zipcode} placeholder="Zipcode" changeHandler={shippingChangeHandler}/>
          <InputText id="notes" name="notes" value={shippingInfo.notes} placeholder="Notes" changeHandler={shippingChangeHandler}/>
          <button id="submit" type="submit">Select Shipping Speed</button>
        </form>
      }
      {
        submittedShippingInfo &&
        <form>
          <b>{`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.zipcode}`}</b>
          <button id="edit" type="button" onClick={() => setSubmittedShippingInfo(false)}>Edit</button>
          <label htmlFor="expedited">
            <input
              id="expedited"
              name="shipping"
              type="radio"
              value="Expedited"
              checked={shippingSelection === "Expedited"}
              onChange={(e) => {
                setShippingSelection(e.target.value)
                setTotalPriceWithShipping(totalPrice + shippingSelections[e.target.value])
              }}
            />
            Expedited (Overnight, ${shippingSelections["Expedited"]})
            <p>* Recommended for maximum freshness and quality</p>
          </label>
          <label htmlFor="priority-express">
            <input
              id="priority-express"
              name="shipping"
              type="radio"
              value="Priority Express"
              checked={shippingSelection === "Priority Express"}
              onChange={(e) => {
                setShippingSelection(e.target.value)
                setTotalPriceWithShipping(totalPrice + shippingSelections[e.target.value])
              }}
            />
            Priority (1 day, ${shippingSelections["Priority Express"]})
          </label>
          <label htmlFor="standard">
            <input
              id="standard"
              name="shipping"
              type="radio"
              value="Standard"
              checked={shippingSelection === "Standard"}
              onChange={(e) => {
                setShippingSelection(e.target.value)
                setTotalPriceWithShipping(totalPrice + shippingSelections[e.target.value])
              }}
            />
            Standard (2-3 days, ${shippingSelections["Standard"]})
          </label>
        </form>
      }
      {
        shippingSelection && submittedShippingInfo &&
        <div id="bottom">
          <div><b>Shipping Selection:</b><p>{shippingSelection}</p></div>
          <div><b>New Total: </b><p>${totalPriceWithShipping}</p></div>
        </div>
      }
    </div>
  )

  const paymentPanel = (
    <div id="payment">
      <h1>Payment</h1>
      <form>
        <InputText placeholder="Cardholder Name" changeHandler={paymentChangeHandler}/>
        <InputText placeholder="Card Number" changeHandler={paymentChangeHandler}/>
        <div>
          <input type="date" placeholder="Exp Date" />
          <input type="number" placeholder="CVC" />
        </div>
      </form>
    </div>
  )

  const contactPanel = (
    <div id="contact">
      <h1>Contact</h1>
      <InputText id="first-name" name="first-name" placeholder="First Name" changeHandler={contactChangeHandler} />
      <InputText id="last-name" name="last-name" placeholder="Last Name" changeHandler={contactChangeHandler} />
      <InputText id="email" name="email" placeholder="Email" changeHandler={contactChangeHandler} />
      <InputText id="phone" name="phone" placeholder="Phone" changeHandler={contactChangeHandler} />
    </div>
  )

  return (
    <div id="place-order">
      { subtotalPanel }
      { shippingPanel }
      { paymentPanel }
      { contactPanel }
      <button id="place-order-button" onClick={() => placeOrder()}>Place Order</button>
    </div>
  )

}
  
export default PlaceOrder;

export interface TierPriceType {
  flatTierAmount: number;
  extraInnerFrostingAmount: number;
  extraOuterFrostingAmount: number;
  decorationsAmount: number;
  imageAmount: number;
  tierTotal: number;
}

export interface ShippingInfoType {
  address: string;
  city: string;
  state: string;
  zipcode: string;
  notes: string;
}