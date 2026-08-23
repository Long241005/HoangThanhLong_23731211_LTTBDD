class Stack22<T> {
    private items: T[] = [];
   
    push(item: T): void {
      this.items.push(item);
    }
   
    pop(): T | undefined {
      return this.items.pop();
    }
   
    peek(): T | undefined {
      return this.items[this.items.length - 1]; 
    }
   
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  }
   
  const stack22 = new Stack22<number>();
  stack22.push(1);
  stack22.push(2);
  stack22.push(3);
  console.log(stack22.peek()); 
  console.log(stack22.pop());  
  console.log(stack22.isEmpty()); 