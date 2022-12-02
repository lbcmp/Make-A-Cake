import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
Pages
- Welcome.tsx
----- Welcome to Make a Cake, Create Account, Log In, Log In as Guest
- UserHome.tsx
----- User will have the option to make a cake, view orders
- CreateCake.tsx
----- 
      Number of Tiers (n >= 1 && n <= 5)

      Tier 1 to n:
      - Batter Flavor
      - Inner Frosting
      - Outer Frosting
      - Decorations
      - Picture Design (Optional)
      - Notes

      Date Needed By
-----
- OrderConfirmation.tsx
----- List of Cake Information, Price, Ability to cancel order or checkout
- PlaceOrder.tsx
-----
      (Note: If information is defined, list it with option to edit. If undefined, show form to edit)
      Shipping Info (Shipping Speeds, Address, Special Instructions, Use as Billing Address)
      Payment Info (Credit/Debit Card Number, CCV, Expiration Date)
      Place Order
----- 
- ViewOrders.tsx
----- Show cake info, status of order (if shipped, include shipping company and number)
*/
