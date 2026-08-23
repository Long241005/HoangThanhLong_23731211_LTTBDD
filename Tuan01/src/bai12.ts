interface Flyable12 {
    fly(): void;
  }
  interface Swimmable12 {
    swim(): void;
  }
   
  class Bird12 implements Flyable12 {
    fly(): void {
      console.log("Bird đang bay");
    }
  }
   
  class Fish12 implements Swimmable12 {
    swim(): void {
      console.log("Fish đang bơi");
    }
  }
 
  class Duck12 implements Flyable12, Swimmable12 {
    fly(): void {
      console.log("Duck đang bay");
    }
    swim(): void {
      console.log("Duck đang bơi");
    }
  }
   
  new Bird12().fly();
  new Fish12().swim();
  new Duck12().fly();