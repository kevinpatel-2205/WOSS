interface Loggable {
  logInfo(): void;
}

abstract class User {
  static userCount: number = 0;          
  readonly id: number;                   

  constructor(
    id: number,
    public name: string,                 
    protected role: string               
  ) {
    this.id = id;
    User.userCount++;
  }

  abstract getDetails(): string;          

  static getUserCount(): number {
    return User.userCount;
  }
}

class Admin extends User implements Loggable {
  private _salary: number;

  constructor(
    id: number,
    name: string,
    salary: number
  ) {
    super(id, name, "Admin");             
    this._salary = salary;
  }

  // getter
  get salary(): number {
    return this._salary;
  }

  // setter
  set salary(value: number) {
    if (value < 0) {
      throw new Error("Salary cannot be negative");
    }
    this._salary = value;
  }

  // override abstract method
  getDetails(): string {
    return `Admin: ${this.name}, Role: ${this.role}`;
  }

  // interface method
  logInfo(): void {
    console.log(this.getDetails());
  }
}

const admin1 = new Admin(1, "Kevin", 12000);

admin1.logInfo();                 
console.log(admin1.salary);       

admin1.salary = 6000;             
console.log(User.getUserCount()); 
