class Animal11 {
    constructor(public name: string) {}
  }
   
  class Dog11 extends Animal11 {
    bark(): void {
      console.log(`${this.name}: Gâu gâu!`);
    }
  }
   
  class Cat11 extends Animal11 {
    meow(): void {
      console.log(`${this.name}: Meo meo!`);
    }
  }
   
  const dog11 = new Dog11("Milo");
  dog11.bark();
  const cat11 = new Cat11("Kitty");
  cat11.meow();