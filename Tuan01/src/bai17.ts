class Logger17 {
    
    private static instance: Logger17;
   
    private constructor() {}
   
    static getInstance(): Logger17 {
      if (!Logger17.instance) {
        Logger17.instance = new Logger17();
      }
      return Logger17.instance;
    }
   
    log(message: string): void {
      console.log(`[LOG]: ${message}`);
    }
  }
   
  const logger1 = Logger17.getInstance();
  const logger2 = Logger17.getInstance();
  logger1.log("Xin chào");
  console.log(logger1 === logger2);