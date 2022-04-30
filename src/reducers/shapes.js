export default function shapes(shapes = [], action) {
  if (action.type === "addShape") {
    const newShapes = [...shapes, action.data];
    return newShapes;
  } else if (action.type === "delete") {
    const newShapes = [...shapes];
    newShapes.splice(action.index, 1);
    return newShapes;
  } else if (action.type === "update") {
    const newShapes = [...shapes];

    const aV = action.value;
    switch (action.value.type) {
      case "area":
        return (
          (newShapes[Number(action.value.index)].area = action.value.A),
          newShapes
        );

      case "square":
        return (
          (newShapes[Number(action.value.index)].length = action.value.L),
          (newShapes[Number(action.value.index)].area = Math.pow(
            action.value.L,
            2
          )),
          newShapes
        );

      case "circle":
        return (
          (newShapes[Number(action.value.index)].radius = action.value.r),
          (newShapes[Number(action.value.index)].area =
            Math.PI * Math.pow(action.value.r, 2)),
          newShapes
        );

      case "rectangle":
        if (action.value.L !== undefined) {
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

      case "triangle":
        if (aV.B !== undefined) {
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

      case "trapezoid":
        if (action.value.B !== undefined) {
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
        } else if (aV.b !== undefined) {
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
      default:
        return newShapes;
    }
  } else if (action.type === "title") {
    const newShapes = [...shapes];
    newShapes[action.value.index].title = action.value.title;
    return newShapes;
  } else if (action.type === "convert") {
    const newShapes = [...shapes];
    const eachShape = (coeff) => {
      newShapes.map((shape, i) => {
        switch (shape.type) {
          case "area":
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;

          case "circle":
            shape.radius = shape.radius * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;

          case "square":
            shape.length = shape.length * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;

          case "rectangle":
            shape.length = shape.length * coeff;
            shape.width = shape.width * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;

          case "triangle":
            shape.base = shape.base * coeff;
            shape.height = shape.height * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;

          case "trapezoid":
            shape.base = shape.base * coeff;
            shape.oppositeBase = shape.oppositeBase * coeff;
            shape.height = shape.height * coeff;
            shape.area = shape.area * Math.pow(coeff, 2);
            return newShapes;

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

          case "in":
            eachShape(1 / 2.54);
            return newShapes;

          case "ft":
            eachShape(1 / 30.48);
            return newShapes;

          default:
            return newShapes;
        }

      case "m":
        switch (action.newUnit) {
          case "cm":
            eachShape(100);
            return newShapes;

          case "in":
            eachShape(1 / 0.0254);
            return newShapes;

          case "ft":
            eachShape(1 / 0.3048);
            return newShapes;

          default:
            return newShapes;
        }

      case "in":
        switch (action.newUnit) {
          case "cm":
            eachShape(2.54);
            return newShapes;

          case "m":
            eachShape(0.0254);
            return newShapes;

          case "ft":
            eachShape(1 / 12);
            return newShapes;

          default:
            return newShapes;
        }

      case "ft":
        switch (action.newUnit) {
          case "cm":
            eachShape(30.48);
            return newShapes;
          case "m":
            eachShape(0.3048);
            return newShapes;
          case "in":
            eachShape(12);
            return newShapes;
          default:
            return newShapes;
        }
      default:
        return newShapes;
    }
  } else if (action.type === "deduct") {
    const newShapes = [...shapes];
    newShapes[Number(action.index)].deduct < 0
      ? (newShapes[Number(action.index)].deduct = Number(1))
      : (newShapes[Number(action.index)].deduct = Number(-1));
    return newShapes;
  } else {
    return shapes;
  }
}
