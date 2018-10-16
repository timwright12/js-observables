import { onChange } from './observable.js';

let data = {
	a: 1
};

// Upon change, save to server
let changeable = onChange( data, () => save( data ) );

// Make a change that would trigger changes
changeable.a = 2;

// save() is triggered!

// data.a === 2

console.log( data.a );