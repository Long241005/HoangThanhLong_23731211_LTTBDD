class Rectangle4 {
    constructor(public width: number, public height: number) { }

    DienTich(): number {
        return this.width * this.height;
    }


    Chuvi(): number {
        return 2 * (this.width + this.height);
    }
}
const rect4 = new Rectangle4(5, 10);
console.log(`Dientich: ${rect4.DienTich()}, Chuvi: ${rect4.Chuvi()}`);