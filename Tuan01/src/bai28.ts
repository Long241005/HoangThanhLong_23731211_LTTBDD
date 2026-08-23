class Animal28 {
    protected makeSound(): void {
      console.log("Animal tạo ra âm thanh chung chung");
    }
   
    performSound(): void {
      this.makeSound();
    }
  }
   
  class Dog28 extends Animal28 {
    protected makeSound(): void {
      console.log("Dog: Gâu gâu!");
    }
  }
   
  class Cat28 extends Animal28 {
    protected makeSound(): void {
      console.log("Cat: Meo meo!");
    }
  }
   
  new Dog28().performSound();
  new Cat28().performSound();