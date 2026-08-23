class Person27 {
    constructor(public name: string, public age: number) {}
  }
   
  class Teacher27 extends Person27 {
    constructor(name: string, age: number, public subject: string) {
      super(name, age); 
    }
   
    introduce(): void {
      console.log(
        `Tôi là ${this.name}, ${this.age} tuổi, dạy môn ${this.subject}`
      );
    }
  }
   
  const teacher27 = new Teacher27("Cô Lan", 35, "Toán");
  teacher27.introduce();