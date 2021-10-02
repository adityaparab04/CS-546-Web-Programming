/* I pledge my honor that I have abided by the Stevens Honor System */
const arrayUtils = require('./arrayUtils')
const stringUtils = require('./stringUtils')
const objUtils = require('./objUtils')

//average Tests
try {   //should pass
    arrayUtils.average([[7, 6], [2], [3]]);
    console.log('average passed successfully')
} catch (error) {
    console.error('average failed test case')
}
try {   //should fail
    arrayUtils.average([[1,3], ["hi",4,5]]);
    console.error('average did not error');
} catch (error) {
    console.log('average failed successfully')
}

//mode square Tests
try {   //should pass
    arrayUtils.modeSquared([2,3,2,3,4,4,4]);
    console.log('modeSquared passed successfully');
} catch (error) {
    console.error('modeSquared failed test case')
}
try {   //should fail
    arrayUtils.modeSquared([]);
    console.error('modeSquared did not error');
} catch (error) {
    console.log('modeSquared failed successfully')
}


//median of elements

try {   //should pass
    arrayUtils.medianElement([2,1,3,4,5,6,9,8,7]);
    console.log('medianElement passed successfully');
} catch (error) {
    console.error('medianElement failed test case')
}
try {   //should fail
    arrayUtils.medianElement([1,2,1,1,2,'a']);
    console.error('medianElement did not error');
} catch (error) {
    console.log('medianElement failed successfully')
}


//merge two arrays tests
try {    //should pass 
    arrayUtils.merge(['B', 2],['a', 'y', 8, 6]);
    console.log('merge passed successfully');
} catch (error) {
    console.error('merge failed test case')
}
try {   //should fail
    arrayUtils.merge(['A', 1, 4, 10, 'A'],['1$', 'c', 8, 6]);
    console.error('merge did not error');
} catch (error) {
    console.log('merge failed successfully')
}

//string.Utilis

//sort string Tests
try {   //should pass
    stringUtils.sortString("AdityaParab04@gmail.com");
    console.log('sortString passed successfully');
} catch (error) {
    console.error('sortString failed test case')
}

try {   //should fail
    stringUtils.sortString([]);
    console.error('sortString did not error');
} catch (error) {
    console.log('sortString failed successfully')
}


//replace character in a string Tests
try {   //should pass
    stringUtils.replaceChar("Daddy", 2);
    console.log('replaceChar passed successfully');
} catch (error) {
    console.error('replaceChar failed test case')
}

try {      //should fail
    stringUtils.replaceChar("foaobor", 0);
    console.error('replaceChar did not error');
} catch (error) {
    console.log('replaceChar failed successfully')
}

//mashup String Tests
try {   //should pass
    stringUtils.mashUp('Suryavanshi', 'Aditya',  '+');
    console.log('mashUp passed successfully');
} catch (error) {
    console.error('mashUp failed test case')
}
try {   //should fail
    stringUtils.mashUp(1, "world", "#");
    console.error('mashUp did not error');
} catch (error) {
    console.log('mashUp failed successfully')
}

//obj.Utilis
//compute objects Tests
try {   //should pass
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    objUtils.computeObjects([first, second], x => x * 2);
    console.log('computeObjects passed successfully');
} catch (error) {
    console.error('computeObjects failed test case')
}
try {   //should fail
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 'b', y: 9, q: 10 };
    objUtils.computeObjects([first, third], x => x * 2);
    console.error('computeObjects did not error');
} catch (error) {
    console.log('computeObjects failed successfully')
}

//common Keys
try {    //should pass
    let first = {a: 2, b: 4};
    let second = {a: 5, b: 4};
    let third = {a: 2, b: {x: 7}};
    let fourth = {a: 3, b: {x: 7, y: 10}};
    let fifth = 23;
    objUtils.commonKeys(first, second);
    console.log('commonKeys passed successfully');
} catch (error) {
    console.error('commonKeys failed test case')
}
try {    //should fail
    let first = {a: 2, b: 4};
    let second = {a: 5, b: 4};
    let third = {a: 2, b: {x: 7}};
    let fourth = {a: 3, b: {x: 7, y: 10}};
    let fifth = 23;
    objUtils.commonKeys(fifth, second);
    console.error('commonKeys did not error');
} catch (error) {
    console.log('commonKeys failed successfully')
}

//Flip Object

try {   //should pass
    objUtils.flipObject({ a: 3, b: 7, c: { x: 1, y:2 } });
    console.log('flipObject passed successfully');
} catch (error) {
    console.error('flipObject failed test case');
}

try {   //should fail
    console.log(objUtils.flipObject({}))
} catch {console.log(error)}