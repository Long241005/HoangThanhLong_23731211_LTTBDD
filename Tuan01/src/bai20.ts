interface Vehicle20 {
    drive(): void;
  }
   
  class Car20 implements Vehicle20 {
    drive(): void {
      console.log("Car đang chạy trên đường");
    }
  }
   
  class Bike20 implements Vehicle20 {
    drive(): void {
      console.log("Bike đang đạp trên đường");
    }
  }
   
  const vehicles20: Vehicle20[] = [new Car20(), new Bike20()];
  vehicles20.forEach((v) => v.drive());