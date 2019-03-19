# JavaScript Reactivity

This is an example on how code can be reactive. To be able to update a stored variable and have an existing storage function or method update itself reactively.

**The Problem** - Totalling a price with a quantity
```javascript
let price = 5;
let quantity = 2;
let total = price * quantity;

console.log(total) // 10
```
...then either price or quantity get updated.
```javascript
quantity = 5;

console.log(total) // 10, expected 25
```

You expected the total to be updated but it has not.

**The Solution**
```javascript
let price = 5;
let quantity = 2;
let total = 0;
let reactiveCode = null; 
let storage = [];
```

Create some functions that handle 
1. storage of totals
2. recording updates to quantity or price
3. replaying reactive code total

```javascript
reactiveCode = () => total = quantity * price;

record = () => storage.push(reactiveCode);

replay = () => storage.forEach(rCode => rCode)
```

Now we log the initial total...
```javascript
reactiveCode();

console.log(total) // 10

// Let's update the quantity...
quantity = 10;

console.log(total) // 10

// ...but we need to run the reactive functions to see the update
record();
reactiveCode();
replay();

console.log(total) // 50



```