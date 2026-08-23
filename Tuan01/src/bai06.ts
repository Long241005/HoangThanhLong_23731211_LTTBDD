class Book6 {
    constructor(
      public title: string,
      public author: string,
      public year: number
    ) {}
   
    showInfo(): void {
      console.log(`"${this.title}" by ${this.author} (${this.year})`);
    }
  }
   
  const book6 = new Book6("Nha gia kim", "Kim Dong", 2008);
  book6.showInfo();