export class Car {
    brand: string;
    model: string;
    year: number;
  
    constructor(brand: string, model: string, year: number) {
      this.brand = brand;
      this.model = model;
      this.year = year;
    }
  
    showInfo(): void {
      console.log(`Car Info: ${this.brand} ${this.model} (${this.year})`);
    }
  }
  
  const myCar = new Car("Toyota", "Camry", 2026);
  myCar.showInfo();