class Repository21<T> {
    private items: T[] = [];
   
    add(item: T): void {
      this.items.push(item);
    }
   
    getAll(): T[] {
      return this.items;
    }
  }
   
  const userRepo21 = new Repository21<string>();
  userRepo21.add("Long");
  userRepo21.add("An");
  console.log(userRepo21.getAll());