import unit from '../reducers/units.js';

describe('shoul convert units', () =>{

  test('from m', () => {
      expect(unit({ name: 'm', coeff: 1 }, {type:"selectUnit", u:'cm'})).toStrictEqual({name: 'cm', coeff: 100});
      expect(unit({ name: 'm', coeff: 1 }, {type:"selectUnit", u:'in'})).toStrictEqual({name: 'in', coeff: 39.3700787402});
      expect(unit({ name: 'm', coeff: 1 }, {type:"selectUnit", u:'ft'})).toStrictEqual({name: 'ft', coeff: 3.280839895});
    });

  test('from cm', () => {
      expect(unit({ name: 'cm', coeff: 1 }, {type:"selectUnit", u:'m'})).toStrictEqual({name: 'm', coeff: 0.01});
      expect(unit({ name: 'cm', coeff: 1 }, {type:"selectUnit", u:'in'})).toStrictEqual({name: 'in', coeff: 0.3937007874});
      expect(unit({ name: 'cm', coeff: 1 }, {type:"selectUnit", u:'ft'})).toStrictEqual({name: 'ft', coeff: 0.32808399});
    });

  test('from in', () => {
      expect(unit({ name: 'in', coeff: 1 }, {type:"selectUnit", u:'cm'})).toStrictEqual({name: 'cm', coeff: 2.54});
      expect(unit({ name: 'in', coeff: 1 }, {type:"selectUnit", u:'m'})).toStrictEqual({name: 'm', coeff: 0.0254});
      expect(unit({ name: 'in', coeff: 1 }, {type:"selectUnit", u:'ft'})).toStrictEqual({name: 'ft', coeff: 0.0833333333});
    });

  test('from ft', () => {
      expect(unit({ name: 'ft', coeff: 1 }, {type:"selectUnit", u:'cm'})).toStrictEqual({name: 'cm', coeff: 30.48});
      expect(unit({ name: 'ft', coeff: 1 }, {type:"selectUnit", u:'in'})).toStrictEqual({name: 'in', coeff: 12});
      expect(unit({ name: 'ft', coeff: 1 }, {type:"selectUnit", u:'m'})).toStrictEqual({name: 'm', coeff: 0.3048});
    });  
});
 