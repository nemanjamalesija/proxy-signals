import './style.css';

class MyClass {

    static staticLogger() {
        console.log('static method');
    }

    constructor() {}

    logger() {
        console.log('logg');
    }


}

const stra = new MyClass()
// const bla = Object.getPrototypeOf(stra);
// const bla = Object.getPrototypeOf(stra).constructor;
// console.log("bla", bla);
// bla.logger();
// bla.staticLogger();

// kako da dohvatis prototip klase
// kako da dohvatis nazad referencu same klase MyClass
// sta je constructor klase
