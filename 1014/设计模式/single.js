class Person {
    // static instance = null;
    constructor(name) {
        // if (Person.instance) {
        //     return Person.instance;
        // }
        // Person.instance = this
        this.name = name
    }
}
let instance;

export default function createInstance(arg){
    if (!instance) {
        instance = new Person(arg);
    }
    return instance;
}