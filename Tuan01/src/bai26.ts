class Product26 {
    constructor(public name: string, public price: number) {}
  }
   
  class Order26 {
    private products: Product26[] = [];
   
    addProduct(product: Product26): void {
      this.products.push(product);
    }
   

    getTotal(): number {
      return this.products.reduce((sum, p) => sum + p.price, 0);
    }
  }
   
  const order26 = new Order26();
  order26.addProduct(new Product26("Áo", 100));
  order26.addProduct(new Product26("Quần", 150));
  console.log(`Tổng tiền: ${order26.getTotal()}`);