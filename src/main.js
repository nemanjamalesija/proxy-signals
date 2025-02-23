let product = { price: 5, quantity: 2 };
let total = 0;

// let dep = new Set();
// const depsMap = new Map();
const targetMap = new WeakMap();
const effect = () => { total = product.price * product.quantity };

function track(target, key) {
    let depsMap = targetMap.get(target)

    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
        console.log("target map is ", targetMap.get(target));
    }

    let dep = depsMap.get(key)

    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }

    dep.add(effect);
}

function trigger(target,key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return

    let dep = depsMap.get(key);
    console.log("depsMap is:", depsMap);

    if (dep) {
        dep.forEach(effect => effect())
    }
}

track(product, 'price');
track(product, 'quantity')
product.quantity = 50;
trigger(product, 'price');
console.log("total:", total);
