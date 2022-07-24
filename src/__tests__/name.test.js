import name from "../reducers/name";

test('project name', () => {
    expect(name('',{type: "project", value:"Any string"})).toBe("Any string");
    expect(name('',{type: "project", value:"Any string"})).not.toBe('');
    expect(name('',{type: "project", value:24})).not.toBe('');
    expect(name('',{type: "project", value:{name: 'Hello'}})).toEqual({name: 'Hello'});
  });