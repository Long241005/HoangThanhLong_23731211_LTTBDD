abstract class Appliance24 {
    abstract turnOn(): void;
  }
   
  class Fan24 extends Appliance24 {
    turnOn(): void {
      console.log("Quạt đã bật");
    }
  }
   
  class AirConditioner24 extends Appliance24 {
    turnOn(): void {
      console.log("Máy lạnh đã bật");
    }
  }
   
  new Fan24().turnOn();
  new AirConditioner24().turnOn();