import { Person } from "./bai01";

class Student extends Person {
  // Khai báo trực tiếp public/private ngay trong constructor
  constructor(name: string, age: number, public grade: string) {
    super(name, age);
  }

  displayAll(): void {
    console.log(`Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`);
  }
}

const s1 = new Student("Hoang Thanh Long", 21, "A");
s1.displayAll();