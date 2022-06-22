import shapes from "./shapes";

test('add square of 3m length', () => {
    expect(shapes([],{type: "addShape", data: {type:"square",length:3}})).toStrictEqual([{length: 3, type:"square"}]);
    expect(shapes([{}],{type: "addShape", data: {type:"square",length:3}})).toStrictEqual([{},{length: 3, type:"square"}]);
    expect(shapes([{}],{type: "addShape", data: {type:"square",length:3}})).not.toStrictEqual([{length: 3, type:"square"}, {}]);
  });

test('delete card', () => {
    expect(shapes([{val:"A"},{val:"B"},{val: "C"}], {type: 'delete', index:0})).toStrictEqual([{val:"B"},{val: "C"}]);
    expect(shapes([{val:"A"},{val:"B"},{val: "C"}], {type: 'delete', index:1})).toStrictEqual([{val:"A"},{val: "C"}]);
    expect(shapes([{val:"A"},{val:"B"},{val: "C"}], {type: 'delete', index:2})).toStrictEqual([{val:"A"},{val: "B"}]);
    expect(shapes([{val:"A"},{val:"B"},{val: "C"}], {type: 'delete', index:'2'})).toStrictEqual([{val:"A"},{val: "B"}]);
});


test('area of square', () => {
    expect(shapes([{length:null, area:null}],{type: "update", value: {type:"square", index:0, L:3}})).toStrictEqual([{length: 3, area:9}]);
    expect(shapes([{length:null, area:null}],{type: "update", value: {type:"square", index:0, L:3}})).toStrictEqual([{length: 3, area:9}]);
  });

test('area of circle', () => {
    expect(shapes([{radius:null, area:null}],{type: "update", value: {type:"circle", index:0, r:2}})).toStrictEqual([{radius: 2, area:(Math.PI * Math.pow(2, 2))}]);
    expect(shapes([{},{radius:null, area:null}],{type: "update", value: {type:"circle", index:1, r:2}})).toStrictEqual([{},{radius: 2, area:(Math.PI * Math.pow(2, 2))}]);
  });

test('area of rectangle', () => {
    expect(shapes([{length:null, width:null, area:null}],{type: "update", value: {type:"rectangle", index:0, L:3, w:null}})).toStrictEqual([{length: 3, width:null, area:0}]);
    expect(shapes([{length:3, width:null, area:null}],{type: "update", value: {type:"rectangle", index:0, w:4}})).toStrictEqual([{length: 3, width:4, area:12}]);
    expect(shapes([{length:4, width:4, area:null}],{type: "update", value: {type:"rectangle", index:0, L:4, w:4}})).toStrictEqual([{length: 4, width:4, area:16}]);
  });

test('area of triangle', () => {
    expect(shapes([{base:3, height:null, area:null}],{type: "update", value: {type:"triangle", index:0, B:3, h:null}})).toStrictEqual([{base: 3, height:null, area:0}]);
    expect(shapes([{base:3, height:null, area:null}],{type: "update", value: {type:"triangle", index:0, h:4}})).toStrictEqual([{base: 3, height:4, area:6}]);
    expect(shapes([{base:3, height:4, area:null}],{type: "update", value: {type:"triangle", index:0, B:3, h:4}})).toStrictEqual([{base: 3, height:4, area:6}]);
    expect(shapes([{base:3, height:4, area:6}],{type: "update", value: {type:"triangle", index:0, B:5, h:4}})).toStrictEqual([{base: 5, height:4, area:10}]);
    expect(shapes([{},{base:3, height:4, area:6}],{type: "update", value: {type:"triangle", index:1, B:5, h:4}})).toStrictEqual([{},{base: 5, height:4, area:10}]);
  });

test('area of trapezoid of base 5 by height 3 by 3', () => {
    expect(shapes([{base:null, oppositeBase: null, height:null, area:null}],{type: "update", value: {type:"trapezoid", index:0, B:5}})).toStrictEqual([{base: 5, oppositeBase:null, height:null, area:0}]);
    expect(shapes([{base:5, oppositeBase: null, height:null, area:null}],{type: "update", value: {type:"trapezoid", index:0, b:3}})).toStrictEqual([{base: 5, oppositeBase:3, height:null, area:0}]);
    expect(shapes([{base:null, oppositeBase: 3, height:null, area:null}],{type: "update", value: {type:"trapezoid", index:0, B:5}})).toStrictEqual([{base: 5, oppositeBase:3, height:null, area:0}]);
    expect(shapes([{base:null, oppositeBase: null, height:3, area:null}],{type: "update", value: {type:"trapezoid", index:0, b:3}})).toStrictEqual([{base: null, oppositeBase:3, height:3, area:4.5}]);
    expect(shapes([{base:null, oppositeBase: null, height:3, area:null}],{type: "update", value: {type:"trapezoid", index:0, B:5}})).toStrictEqual([{base: 5, oppositeBase:null, height:3, area:7.5}]);
    expect(shapes([{base:5, oppositeBase: null, height:3, area:null}],{type: "update", value: {type:"trapezoid", index:0, b:3}})).toStrictEqual([{base: 5, oppositeBase:3, height:3, area:12}]);
    expect(shapes([{base:5, oppositeBase: 3, height:3, area:12}],{type: "update", value: {type:"trapezoid", index:0, h:4}})).toStrictEqual([{base: 5, oppositeBase:3, height:4, area:16}]);
  });

test('simple area', () => {
    expect(shapes([{area:null}], {type: "update", value: {type:"area", index:0, A:7}})).toStrictEqual([{area:7}]);
    expect(shapes([{area:null}], {type: "update", value: {type:"area", index:0, A:0}})).toStrictEqual([{area:0}]);
    expect(shapes([{area:null}], {type: "update", value: {type:"area", index:0, A:-5}})).toStrictEqual([{area:-5}]);
  });

test ('deduct on', ()=>{
    expect(shapes([{deduct:1}], {type: "deduct", index:0})).toStrictEqual([{deduct:-1}])
});
test ('deduct off', ()=>{
    expect(shapes([{deduct:-1}], {type: "deduct" ,index:0})).toStrictEqual([{deduct:1}])
});