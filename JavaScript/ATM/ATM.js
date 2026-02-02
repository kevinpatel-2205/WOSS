// // atm -js

// // in atm machine we have 100 , 200 , and 500 rs note
// // amount is always in divided by 100
// // Withdrawal amount is lessthan 1000
// // Withdrawal amount is lessthan amount
// // 	we use all the note avelabal in our atm machine
// // 	if amount is more than 1000 than not use only 100 rs note
// // 	if amount is more than 3000 than not use only 200  rs note

function atmWithdraw(withdrawAmount, accountBalance) {
  let ATM_notes = new Map([
    [500, 100],
    [200, 2],
    [100, 1],
  ]);

  let atm_amount = 0;
  ATM_notes.forEach((count, note) => {
    atm_amount += count * note;
  });

  if (withdrawAmount > atm_amount) return "ATM has insufficient funds";
  if (withdrawAmount > accountBalance) return "Insufficient balance";
  if (withdrawAmount % 100 !== 0) return "Enter amount in multiples of 100";
  if (withdrawAmount > 10000) return "ATM limit exceeded (Max 10000)";
  if (
    withdrawAmount >= 1000 &&
    ATM_notes.get(500) === 0 &&
    ATM_notes.get(200) === 0
  )
    return "Reduce amount, ATM has only ₹100 ATM_Notes";

  if (
    withdrawAmount >= 3000 &&
    ATM_notes.get(500) === 0 &&
    ATM_notes.get(100) === 0
  )
    return "Reduce amount, ATM has only ₹200 ATM_Notes";

  function MandatoryNotes(ATM_notes, amount) {
    let notes = new Map();
    let remaining = amount;
    for (let [note, count] of ATM_notes) {
      if (count > 0) {
        if (remaining < note) return null;

        notes.set(note, 1);
        ATM_notes.set(note, count - 1);
        remaining -= note;
      }
    }

    return { notes, remaining };
  }
  let { notes, remaining } = MandatoryNotes(ATM_notes, withdrawAmount);
  function withdrawRecursive(remaining) {
    if (remaining === 0) return;

    if (remaining >= 500 && ATM_notes.get(500) > 0) {
      notes.set(500, (notes.get(500) || 0) + 1);
      ATM_notes.set(500, ATM_notes.get(500) - 1);
      withdrawRecursive(remaining - 500);
    } else if (remaining >= 200 && ATM_notes.get(200) > 0) {
      notes.set(200, (notes.get(200) || 0) + 1);
      ATM_notes.set(200, ATM_notes.get(200) - 1);
      withdrawRecursive(remaining - 200);
    } else {
      notes.set(100, (notes.get(100) || 0) + 1);
      ATM_notes.set(100, ATM_notes.get(100) - 1);
      withdrawRecursive(remaining - 100);
    }
  }
  withdrawRecursive(remaining);
  return notes;
}

let account = 10000;
let withdrawAmount = 1000;
console.log(atmWithdraw(withdrawAmount, account));
