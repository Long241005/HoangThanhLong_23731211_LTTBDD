interface Animal9 {
    name: string;
    sound(): void;
  }

  class Dog9 implements Animal9 {
    constructor(public name: string) {}
    sound(): void {
      console.log(`${this.name} says: Woof!`);
    }
  }
   
  const dog9 = new Dog9("Lu");
  dog9.sound();