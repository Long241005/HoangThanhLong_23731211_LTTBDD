class MathUtil18 {
    static add(a: number, b: number): number {
      return a + b;
    }
    static subtract(a: number, b: number): number {
      return a - b;
    }
    static multiply(a: number, b: number): number {
      return a * b;
    }
    static divide(a: number, b: number): number {
      if (b === 0) {
        console.log("Không thể chia cho 0");
        return NaN;
      }
      return a / b;
    }
  }
   
  console.log(MathUtil18.add(5, 3));
  console.log(MathUtil18.divide(10, 2));