interface Movable29 {
    move(): void;
  }
   
  class Car29 implements Movable29 {
    move(): void {
      console.log("Car di chuyển bằng bánh xe");
    }
  }
   
  class Robot29 implements Movable29 {
    move(): void {
      console.log("Robot di chuyển bằng chân cơ khí");
    }
  }
   
  const movables29: Movable29[] = [new Car29(), new Robot29()];
  movables29.forEach((m) => m.move());