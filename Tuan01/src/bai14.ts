class Employee14 {
    constructor(public name: string, public salary: number) {}
  }
   
  class Manager14 extends Employee14 {
    manageTeam(): void {
      console.log(`${this.name} đang quản lý đội nhóm`);
    }
  }
   
  class Developer14 extends Employee14 {
    writeCode(): void {
      console.log(`${this.name} đang viết code`);
    }
  }
   
  new Manager14("An", 2000).manageTeam();
  new Developer14("Long", 1500).writeCode();