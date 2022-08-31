class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false;
    }

    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return this.amount * -1;
  }

  isAllowed() {
    return ((this.account.balance - this.amount) >= 0);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let sum = 0;
    for (let transaction of this.transactions) {
      sum += transaction.value;
    }

    return sum;

  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");
const t0 = new Deposit(500.00, myAccount);
t0.commit();
console.log('Balance:', myAccount.balance);
const t01 = new Withdrawal(600.00, myAccount);
console.log(`should be false for withdrawing more money than is in the account: ${t01.commit()}`);
console.log('Balance:', myAccount.balance);
const t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

const t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

console.log('Balance:', myAccount.balance);

const t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);
console.log('Balance:', myAccount.balance);
