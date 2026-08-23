class Account10 {
    public username: string;       
    private password: string;       
    readonly accountId: string;   
   
    constructor(username: string, password: string, accountId: string) {
      this.username = username;
      this.password = password;
      this.accountId = accountId;
    }
   
    checkPassword(input: string): boolean {
      return input === this.password; 
    }
  }
   
  const account10 = new Account10("long21", "123456", "ACC001");
  console.log(account10.username); 
  console.log(account10.checkPassword("123456"))