class BankAccount5 {
    private balance: number; // private: chỉ truy cập được bên trong class
   
    constructor(initialBalance: number = 0) {
      this.balance = initialBalance;
    }
   
    deposit(amount: number): void {
      if (amount <= 0) {
        console.log("Số tiền nạp phải lớn hơn 0");
        return;
      }
      this.balance += amount;
      console.log(`Đã nạp ${amount}. Số dư hiện tại: ${this.balance}`);
    }
   
    withdraw(amount: number): void {
      if (amount > this.balance) {
        console.log("Số dư không đủ để rút");
        return;
      }
      this.balance -= amount;
      console.log(`Đã rút ${amount}. Số dư hiện tại: ${this.balance}`);
    }
  }
   
  const account5 = new BankAccount5(100);
  account5.deposit(50);
  account5.withdraw(30);
  account5.withdraw(1000); // sẽ báo không đủ số dư