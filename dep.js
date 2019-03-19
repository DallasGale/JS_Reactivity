let myData = { price: 5, quantity: 2 };
let internalValue = myData.price;
let total, salePrice, reactiveCode;


class Dep { 
    constructor() {

        // The Observer pattern offers a subscription model in which objects subscribe to an event and get notified when the event occurs. This pattern is the cornerstone of event driven programming, including JavaScript. The Observer pattern facilitates good object-oriented design and promotes loose coupling.
        this.subscribers = [];
    }

    // Replaces record()
    depend() {

        // If the code exists and it is not does not already exist, then push it into the subscribers array.
        if(reactiveCode && !this.subscribers.includes(reactiveCode)) {
            this.subscribers.push(reactiveCode);
        }
    }

    // Replaces replay()
    notify() {
        this.subscribers.forEach(rCode => rCode())
    }
}

// --------VARIABLES--------
const dep = new Dep();

Object.keys(myData).forEach(key => {
    let internalValue = myData[key]

    const dep = new Dep();

    Object.defineProperty(myData, key, {

        get() {
            dep.depend();
            console.log(`Getting ${key}: ${internalValue}`)
            return internalValue;
        },

        set(newVal) {
            console.log(`Setting ${key} to: ${newVal}`)
            internalValue = newVal;
            dep.notify();
        }
    })
})


// --------WATCHER----------
function watcher(myFunc) {
    reactiveCode = myFunc;
    reactiveCode();
    reactiveCode = null;
};

watcher(() => {
    total = `$${myData.price * myData.quantity}`;
});

watcher(() => {
    salePrice = `$${myData.price * 0.9}`;
});
