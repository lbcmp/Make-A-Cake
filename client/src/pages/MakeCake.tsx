import InputText from "../components/InputText";
import { useState, useEffect } from "react";
import InputCheckboxField from "../components/InputCheckboxField";

const batterFlavors: Record<string, string> = {
  "vanilla":"Vanilla",
  "chocolate":"Chocolate",
  "strawberry":"Strawberry",
  "confetti":"Confetti",
  "butter-pecan":"Butter Pecan",
  "lemon-poppyseed":"Lemon Poppyseed",
}

const frostingOptions: Record<string, string> = {
  "american-buttercream":"American Buttercream",
  "cream-cheese":"Cream Cheese",
  "salted-caramel":"Salted Caramel",
  "lemon-orange":"Lemon-Orange Buttercream",
  "strawberry":"Strawberry",
  "bourbon-vanilla":"Bourbon Vanilla Bean Buttercream",
  "coffee-liqueur":"Coffee Liqueur Ganache",
  "godiva-dark":"Godiva Dark Chocolate",
  "milk-chocolate":"Milk Chocolate"
}

const decorations: Record<string, string> = {
  "funfetti":"Funfetti",
  "watercolor":"Watercolor",
  "edible-flowers":"Edible Flowers",
  "sprinkles":"Sprinkles",
  "ganache-drip":"Ganache Drip",
  "fruit":"Fruit",
  "piping":"Piping",
}

const MakeCake = () => {
  const [currTierNumber, setCurrTierNumber] = useState(1);
  const [cake, setCake] = useState<Array<TierType>>([]);
  const defaultTier: TierType = {
    batterFlavor: "",
    innerFrostings: [],
    outerFrostings: [],
    decorations: []
  };
  const [tier, setTier] = useState<TierType>(defaultTier);

  useEffect(() => {
    console.log(cake)
  }, [cake])

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    console.log(e.target.name)
    setTier({
      ...tier,
      ...(e.target.name === "batter-flavor") && { batterFlavor: e.target.value },
      ...(e.target.name.includes("inner-frosting")) && { innerFrostings: (
        tier.innerFrostings.length < 3 && !tier.innerFrostings.includes(e.target.value) ?
        tier.innerFrostings.concat(e.target.value) :
        tier.innerFrostings.filter(frosting => frosting !== e.target.value)
      )},
      ...(e.target.name.includes("outer-frosting")) && { outerFrostings: (
        tier.outerFrostings.length < 3 && !tier.outerFrostings.includes(e.target.value) ?
        tier.outerFrostings.concat(e.target.value) :
        tier.outerFrostings.filter(frosting => frosting !== e.target.value)
      )},
      ...(e.target.name.includes("decorations")) && { decorations: (
        tier.decorations.length < 3 && !tier.decorations.includes(e.target.value) ?
        tier.decorations.concat(e.target.value) :
        tier.decorations.filter(decoration => decoration !== e.target.value)
      )},
      ...(e.target.name === "notes") && { notes: e.target.value }
    })
  }

  const addTier = (duplicateLastTier: boolean) => {
    setCake(cake.concat(duplicateLastTier ? cake[cake.length - 1] : tier))
    setTier(defaultTier)
    setCurrTierNumber(currTierNumber + 1)
    const form: HTMLFormElement = document.getElementById("make-cake-form") as HTMLFormElement;
    form.reset();
  }

  const leftSide = (
    <div id="left-side">
        Left Side
      <div id="cake-table"></div>
    </div>
  )

  const rightSide = (
    <div id="right-side">
        <h1>Tier {currTierNumber} </h1>
        <form id="make-cake-form">
          <button type="reset" onClick={() => setTier(defaultTier)}>Clear</button>

          {
            cake.length > 0 &&
            <button type="button" onClick={() => addTier(true)}>Duplicate Last Tier</button>
          }

          <h2>Batter Flavors:</h2>
          <select
            id="batter-flavor"
            name="batter-flavor"
            value={tier.batterFlavor}
            onChange={(e) => inputChangeHandler(e)}
            required
          >
            <option value="" disabled>Select a Flavor</option>
            {
              Object.keys(batterFlavors).map((flavorId, index) => (
                  <option key={index} value={flavorId}>{batterFlavors[flavorId]}</option>
              ))
            }
          </select>

          <h2>Inner Frosting:</h2>
          <InputCheckboxField
            name="inner-frosting"
            record={frostingOptions}
            changeHandler={inputChangeHandler}
          />

          <h2>Outer Frosting:</h2>
          <InputCheckboxField
            name="outer-frosting"
            record={frostingOptions}
            changeHandler={inputChangeHandler}
          />

          <h2>Decorations:</h2>
          <InputCheckboxField
            name="decorations"
            record={decorations}
            changeHandler={inputChangeHandler}
          />

          <h2>Image Printing (Optional):</h2>
          <input name="image-printing" type="file" onChange={(e) => {
            setTier({
              ...tier,
              ...(e.target.files && e.target.files.length > 0) && { image: e.target.files[0] }
            })
          }} />

          <h2>Notes:</h2>
          <p>Please include any special instructions for this tier</p>
          <textarea id="notes" name="notes" value={tier.notes} onChange={(e) => inputChangeHandler(e)} />

          <button type="button" onClick={() => addTier(false)}>Add Tier</button>
          <button type="submit">Finish Cake</button>
        </form>
    </div>
  )

  return (
    <div id="make-cake">
      { leftSide }
      { rightSide }
    </div>
  )
}
  
export default MakeCake;

export interface TierType {
  batterFlavor: string;
  innerFrostings: Array<string>;
  outerFrostings: Array<string>;
  decorations: Array<string>;
  image?: File;
  notes?: string;
}
/*
      Number of Tiers (n >= 1 && n <= 5)

      Tier 1 to n:
      - Batter Flavor
      - Inner Frosting
      - Outer Frosting
      - Decorations
      - Picture Design (Optional)
      - Notes

      Date Needed By
*/