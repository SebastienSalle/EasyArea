function addingAreas(data) {
  // useEffect(() => {
  //  //const updateTotal =()=>data.onUpdateTotal(total)
  //  if(total){combineArea(total)}
  // },[total]);

  //combineArea(total)

  console.log("Helper addingAreas ", data);
  const areas = data.cards.map((e, i) => {
    switch (e.type) {
      case "square":
        return Number(Math.pow(e.length, 2)).toFixed(2);
        break;
      case "rectangle":
        return Number(e.length * e.width).toFixed(2);
        break;
      case "trapezoid":
        return Number(
          ((Number(e.base) + Number(e.oppositeBase)) * e.height) / 2
        ).toFixed(2);
        break;
      case "triangle":
        return Number((e.base * e.height) / 2).toFixed(2);
        break;
      case "circle":
        return Number(Math.PI * Math.pow(e.radius, 2)).toFixed(2);
        break;
      case "area":
        return Number(e.area).toFixed(2);
        break;
      default:
        return "Choose a shape";
    }
  });

  let total = 0;
  //const[total, setTotal]=useState(0);

  const combineArea = (total) => {
    //let newTotal = total
    areas.map((area, i) => {
      {
        //let newTotal = total;
        // Number((newTotal += Number(area)));
        // return newTotal;
        //   return Number((total += Number(area)));
        return Number((total += Number(area)));
      }
    });
    //setTotal(newTotal);
    console.log("Total-Helper ", total);
    //   data.onUpdateTotal(newTotal)
    return total;
  };
  return total, combineArea(total), console.log(combineArea(total));
}

export default addingAreas;
