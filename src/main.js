// let dep = new Set();
// const depsMap = new Map();
const targetMap = new WeakMap();

let activeEffect = null;

function effect(eff) {
    activeEffect = eff
    activeEffect()
    activeEffect = null;
}

function track(target, key) {
    if (!activeEffect) return;

    let depsMap = targetMap.get(target)

    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
        // console.log("target map is ", targetMap.get(target));
    }

    let dep = depsMap.get(key)

    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }

    dep.add(activeEffect);
}

function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if (!depsMap) return

    let dep = depsMap.get(key);
    // console.log("depsMap is:", depsMap);

    if (dep) {
        dep.forEach(effect => effect())
    }
}

function reactive(target) {
    const handler = {
        get(target, key, reciever) {
            const result = Reflect.get(target, key, reciever)
            track(target, key)
            return result;
        },
        set(target, key, value, reciever) {
            const oldValue = target[key];
            const result = Reflect.set(target, key, value, reciever)
            if (result && oldValue != value) {
                trigger(target, key)
            }
            return result
        }
    }

    return new Proxy(target, handler)
}

function ref(raw) {
    const r = {
        get value() {
            track(r, 'value')
            return raw
        },
        set value(newVal) {
            raw = newVal
            trigger(r, 'value')
        }
    }
    return r
}


function computed(getter){
    let result = ref()

    effect(() => result.value = getter())
    return result
}


const product = reactive({ price: 5, quantity: 2 })
let total = computed(() => product.price * product.quantity)
// effect(() => { total = product.price * product.quantity })

console.log("total:", total.value);
product.price = 10

console.log("total:", total.value);


