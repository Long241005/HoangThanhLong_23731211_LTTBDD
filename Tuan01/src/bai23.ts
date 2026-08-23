interface Payment23 {
    pay(amount: number): void;
  }
   
  class CashPayment23 implements Payment23 {
    pay(amount: number): void {
      console.log(`Thanh toán ${amount} bằng tiền mặt`);
    }
  }
   
  class CardPayment23 implements Payment23 {
    pay(amount: number): void {
      console.log(`Thanh toán ${amount} bằng thẻ`);
    }
  }
   
  const payments23: Payment23[] = [new CashPayment23(), new CardPayment23()];
  payments23.forEach((p) => p.pay(200));