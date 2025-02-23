let price = 5;
let quantity = 2;
let total = 0;

let dep = new Set();
const effect = () => { total = price * quantity };

function track() {
    dep.add(effect)
}

function trigger() {
    dep.forEach(effect => effect())
}
