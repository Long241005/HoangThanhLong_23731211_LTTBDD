abstract class Shape13 {
   
    abstract area(): number;
   
    describe(): void {
      console.log(`Diện tích: ${this.area().toFixed(2)}`);
    }
  }
   
  class Square13 extends Shape13 {
    constructor(public side: number) {
      super();
    }
    area(): number {
      return this.side * this.side;
    }
  }
   
  class Circle13 extends Shape13 {
    constructor(public radius: number) {
      super();
    }
    area(): number {
      return Math.PI * this.radius * this.radius;
    }
  }
   
  new Square13(4).describe();
  new Circle13(3).describe();