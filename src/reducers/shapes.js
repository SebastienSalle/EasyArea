export default function (shapes = [], action) {
  if (action.type === "addShape") {
    const newShapes = [...shapes, action.data];
    //console.log(`addShape `,shapes)
    return newShapes;
  } else if (action.type === "delete") {
    const newShapes = [...shapes];
    newShapes.splice(action.index, 1);
    //console.log("delete ",shapes)
    return newShapes;
  } else if (action.type === "update") {
    const newShapes = [...shapes];
    //newShapes.splice(action.value, 1)
    //console.log("ReducerUpdate ",action.value)
    // {name: 'area1', A: '345', type: 'area'}
    const isAlreadyHere = (element) => element.name == action.value.name;
    const checkingCard = shapes.findIndex(isAlreadyHere);

    const aV = action.value;
    //swicth A REGLER
    //let coeff=1/10
    switch (action.value.type) {
      // switch (newShapes[action.value.index].type) {
      //switch (shapes[checkingCard].type) {

      case "area":
        return (
          (newShapes[Number(action.value.index)].area = action.value.A),
          newShapes
        );
        break;
      case "square":
        return (
          (newShapes[Number(action.value.index)].length = action.value.L),
          (newShapes[Number(action.value.index)].area = Math.pow(
            action.value.L,
            2
          )),
          newShapes
        );
        break;
      case "circle":
        return (
          (newShapes[Number(action.value.index)].radius = action.value.r),
          (newShapes[Number(action.value.index)].area =
            Math.PI * Math.pow(action.value.r, 2)),
          newShapes
        );
        break;
      case "rectangle":
        if (action.value.L != undefined) {
          //here if the width is not defined it will still be equal to 0
          return (
            (newShapes[Number(action.value.index)].length = action.value.L),
            (newShapes[Number(action.value.index)].area = Number(
              action.value.L * newShapes[Number(action.value.index)].width
            )),
            newShapes
          );
        } else {
          //here if the length is not defined it will still be equal to 0
          return (
            (newShapes[Number(action.value.index)].width = action.value.w),
            (newShapes[Number(action.value.index)].area = Number(
              action.value.w * newShapes[Number(action.value.index)].length
            )),
            newShapes
          );
        }
        break;
      case "triangle":
        //const aV = action.value;
        if (aV.B != undefined) {
          //here if the height is not defined it will still be equal to 0
          return (
            (newShapes[Number(aV.index)].base = aV.B),
            (newShapes[Number(aV.index)].area =
              Number(aV.B * newShapes[Number(aV.index)].height) / 2),
            newShapes
          );
        } else {
          //here if the base is not defined it will still be equal to 0
          return (
            (newShapes[Number(aV.index)].height = aV.h),
            (newShapes[Number(aV.index)].area =
              Number(aV.h * newShapes[Number(aV.index)].base) / 2),
            newShapes
          );
        }
        break;
      // case "triangle":
      //     if(action.value.B != undefined){ //here if the height is not defined it will still be equal to 0
      //         return (newShapes[Number(action.value.index)].base = action.value.B,
      //         newShapes[Number(action.value.index)].area = Number((action.value.B*newShapes[Number(action.value.index)].height))/2,
      //         newShapes);
      //     }else{ //here if the base is not defined it will still be equal to 0
      //         return (newShapes[Number(action.value.index)].height = action.value.h,
      //         newShapes[Number(action.value.index)].area = Number((action.value.h*newShapes[Number(action.value.index)].base))/2,
      //         newShapes);
      //     }
      //     break;
      case "trapezoid":
        //const aV = action.value;
        if (action.value.B != undefined) {
          //here if the oppositeBase and the height are not defined they will still be equal to 0
          return (
            (newShapes[Number(aV.index)].base = aV.B),
            (newShapes[Number(aV.index)].area = Number(
              ((Number(aV.B) +
                Number(newShapes[Number(aV.index)].oppositeBase)) *
                newShapes[Number(aV.index)].height) /
                2
            )),
            newShapes
          );
        } else if (aV.b != undefined) {
          //here if the base and the height are not defined they will still be equal to 0
          return (
            (newShapes[Number(aV.index)].oppositeBase = aV.b),
            (newShapes[Number(aV.index)].area = Number(
              ((Number(aV.b) + Number(newShapes[Number(aV.index)].base)) *
                Number(newShapes[Number(aV.index)].height)) /
                2
            )),
            newShapes
          );
        } else {
          //here if the base and the oppositeBase are not defined they will still be equal to 0
          return (
            (newShapes[Number(aV.index)].height = aV.h),
            (newShapes[Number(aV.index)].area = Number(
              ((Number(newShapes[Number(aV.index)].base) +
                Number(newShapes[Number(aV.index)].oppositeBase)) *
                Number(aV.h)) /
                2
            )),
            newShapes
          );
        }
        break;
    }

    // return newShapes
  } else if (action.type === "title") {
    const newShapes = [...shapes];
    //newShapes.splice(action.value, 1)
    // console.log("Reducertitle ",action.value)
    //{name: 'area1', title: 'AHAHH', type: 'area'}

    // const updateTitle = (card) => {
    //const isAlreadyHere = (element) => element.name == action.value.name;
    //const checkingCard = newShapes.findIndex(isAlreadyHere);
    //if (checkingCard == -1) {
    //const newCards = [...cards];
    //newShapes.push(action.value);
    //setCards(newCards);
    //return newShapes
    //} else {
    //const newCards = [...cards];
    newShapes[action.value.index].title = action.value.title;
    // newShapes[checkingCard].title = action.value.title;
    //setCards(newCards);
    //return newShapes
    //}
    //};
    return newShapes;
  } else if (action.type === "convert") {
    const newShapes = [...shapes];
    
    const eachShape = (coeff) => {
      newShapes.map((shape, i) => {
        switch (shape.type) {
          case "area":
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;
            break;
          case "circle":
            shape.radius = shape.radius * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;
            break;
          case "square":
            shape.length = shape.length * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;
            break;
          case "rectangle":
            shape.length = shape.length * coeff;
            shape.width = shape.width * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;
            break;
          case "triangle":
            shape.base = shape.base * coeff;
            shape.height = shape.height * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;
            break;
          case "trapezoid":
            shape.base = shape.base * coeff;
            shape.oppositeBase = shape.oppositeBase * coeff;
            shape.height = shape.height * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;
            break;
          default:
            return "no such shape";
        }
      });
    };

    switch (action.currentUnit) {
      case "cm":
        switch (action.newUnit) {
          case "m":
            eachShape(0.01);
            return newShapes;
            break;
          case "in":
            eachShape(1 / 2.54);
            return newShapes;
            break;
          case "ft":
            eachShape(1 / 30.48);
            return newShapes;
            break;
        }
        return newShapes;
        break;
      case "m":
        switch (action.newUnit) {
          case "cm":
            eachShape(100);
            return newShapes;
            break;
          case "in":
            eachShape(1 / 0.0254);
            return newShapes;
            break;
          case "ft":
            eachShape(1 / 0.3048);
            return newShapes;
            break;
        }
        return newShapes;
        break;
      case "in":
        switch (action.newUnit) {
          case "cm":
            eachShape(2.54);
            return newShapes;
            break;
          case "m":
            eachShape(0.0254);
            return newShapes;
            break;
          case "ft":
            eachShape(1 / 12);
            return newShapes;
            break;
        }
        return newShapes;
        break;
      case "ft":
        switch (action.newUnit) {
          case "cm":
            eachShape(30.48);
            return newShapes;
            break;
          case "m":
            eachShape(0.3048);
            return newShapes;
            break;
          case "in":
            eachShape(12);
            return newShapes;
            break;
        }
        return newShapes;
        break;
    }
    return newShapes;
  } else {
    return shapes;
  }
}

// const [cards, setCards] = useState([
//     // {type : "rectangle" , name : "", length : 2 , width : 4},
//     // {type : "trapezoid" , name : "", height : 3 , base : 7, oppositeBase : 1},
//     // {type : "triangle" , name : "", height : 4 , base : 8},
//     // {type : "circle" , name : "", radius : 6},
//     { type: "square", name: "", length: 5 },
//     // {type : "square" , name : "", length : 3},
//     {type : "area" , name : "", area : 0},
//   ]);
