// !(function() {
var personalDetails = {
    name: "Den Odell",
    email: "den.odell@me.com"
};
// console.log(Object.isExtensible(personalDetails));
// Object.preventExtensions(personalDetails);
// console.log(Object.isExtensible(personalDetails));
Object.freeze(personalDetails);
console.log(Object.isFrozen(personalDetails));
personalDetails.age = 35;
// })();
