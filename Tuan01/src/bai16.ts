class Box16<T> {
    private value: T;
   
    constructor(value: T) {
      this.value = value;
    }
   
    getValue(): T {
      return this.value;
    }
   
    setValue(value: T): void {
      this.value = value;
    }
  }
   
  const numberBox16 = new Box16<number>(123);
  const stringBox16 = new Box16<string>("Hello");
  console.log(numberBox16.getValue(), stringBox16.getValue());