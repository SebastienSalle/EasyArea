const favoriteUnit = "m";
export default function unit(unit = { name: favoriteUnit, coeff: 1 }, action) {
  let currentUnit = unit.name;
  let selectedUnit = action.u;

  const newUnit = { name: action.u, coeff: unit.coeff };
  if (action.type === "selectUnit") {
    //Switch case to define the coeff
    //according to the previous unit (unit)
    //and the new one (action.u)
    switch (currentUnit) {
      case "cm":
        switch (selectedUnit) {
          case "m":
            newUnit.name = "m";
            newUnit.coeff = 0.01;
            return newUnit;
          case "in":
            newUnit.name = "in";
            newUnit.coeff = 0.3937007874;
            return newUnit;
          case "ft":
            newUnit.name = "ft";
            newUnit.coeff = 0.32808399;
            return newUnit;
          default:
            return newUnit;
        }
      case "m":
        switch (selectedUnit) {
          case "cm":
            newUnit.coeff = 100;
            return newUnit;
          case "in":
            newUnit.coeff = 39.3700787402;
            return newUnit;
          case "ft":
            newUnit.coeff = 3.280839895;
            return newUnit;
          default:
            return newUnit;
        }
      case "in":
        switch (selectedUnit) {
          case "cm":
            newUnit.coeff = 2.54;
            return newUnit;
          case "m":
            newUnit.coeff = 0.0254;
            return newUnit;
          case "ft":
            newUnit.coeff = 0.0833333333;
            return newUnit;
          default:
            return newUnit;
        }
      case "ft":
        switch (selectedUnit) {
          case "cm":
            newUnit.coeff = 30.48;
            return newUnit;
          case "m":
            newUnit.coeff = 0.3048;
            return newUnit;
          case "in":
            newUnit.coeff = 12;
            return newUnit;
          default:
            return newUnit;
        }
      default:
        return unit;
    }
  } else {
    return unit;
  }
}
