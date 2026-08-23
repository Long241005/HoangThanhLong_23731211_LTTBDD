class Book15 {
    constructor(public title: string) {}
  }
  class User15 {
    constructor(public name: string) {}
  }
   
  class Library15 {
    private books: Book15[] = [];
    private users: User15[] = [];
   
    addBook(book: Book15): void {
      this.books.push(book);
      console.log(`Đã thêm sách: ${book.title}`);
    }
   
    addUser(user: User15): void {
      this.users.push(user);
      console.log(`Đã thêm người dùng: ${user.name}`);
    }
   
    listBooks(): void {
      console.log("Danh sách sách:", this.books.map((b) => b.title));
    }
  }
   
  const library15 = new Library15();
  library15.addBook(new Book15("Dế Mèn Phiêu Lưu Ký"));
  library15.addUser(new User15("Long"));
  library15.listBooks();