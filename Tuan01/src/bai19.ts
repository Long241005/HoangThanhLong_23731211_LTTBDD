class Animal19 {
    sound(): void {
      console.log("Animal phát ra âm thanh");
    }
  }
   
  class Dog19 extends Animal19 {
   
    sound(): void {
      console.log("Dog: Gâu gâu!");
    }
  }
   
  class Cat19 extends Animal19 {
    sound(): void {
      console.log("Cat: Meo meo!");
    }
  }
   
  const animals19: Animal19[] = [new Animal19(), new Dog19(), new Cat19()];
  animals19.forEach((a) => a.sound());