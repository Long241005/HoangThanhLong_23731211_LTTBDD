class User7 {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(newName: string) {
    if (newName.trim().length === 0) {
      console.log("Tên không được để trống");
      return;
    }
    this._name = newName;
  }
}
const user7 = new User7("Long");
console.log(user7.name);
user7.name = "Hoang Thanh Long";
console.log(user7.name);