class Product8 {
  constructor(public name: string, public price: number) {}
}
 
const products8: Product8[] = [
  new Product8("Bút bi", 5),
  new Product8("Laptop", 15000000 / 1000),
  new Product8("Sách", 50),
  new Product8("Tai nghe", 150),
  new Product8("Bàn phím", 250),
];
 
const expensiveProducts8 = products8.filter((p) => p.price > 100);
console.log("Sản phẩm giá > 100:", expensiveProducts8.map((p) => p.name));

