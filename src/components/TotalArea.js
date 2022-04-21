// import React from 'react';

// function TotalArea(props) {

//   const areas = props.data.map((e,i) => {
//     switch (e.type) {
//     case 'square':
//       return Number(Math.pow(e.length, 2)).toFixed(2);
//       break;
//     case 'rectangle':
//       return Number(e.length*e.width).toFixed(2);
//       break;
//     case 'trapezoid':
//       return Number(((Number(e.base)+Number(e.oppositeBase))*e.height)/2).toFixed(2)
//       break;
//     case 'triangle':
//       return Number((e.base*e.height)/2).toFixed(2);
//       break;
//     case 'circle':
//       return Number(Math.PI * Math.pow(e.radius,2)).toFixed(2);
//       break;
//     case 'area':
//       return Number((e.area)).toFixed(2);
//       break;
//     default:
//       return "Choose a shape"
//     }}
//   )

//   let total =0;
//   const combineArea = areas.map((area,i) => {
//       return total += Number(area)
//   })

//   return (
//     <div>
//           Total Area: {total.toFixed(2)} {props.unit}2
//     </div>
//   );
// }

// export default TotalArea;
