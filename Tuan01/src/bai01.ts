export class Person {
    name: string;
    age: number;
  
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  
    display(): void {
      console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
  }
  
  const p1 = new Person("Hoang Thanh Long", 21);
  p1.display();