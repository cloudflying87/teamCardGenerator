class User {
    constructor(name) { this.name = name; }
    sayHi() { console.log(this.name); }
  }
  
  // proof: User is a function
  console.log(typeof User); // function