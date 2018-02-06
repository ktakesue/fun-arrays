var dataset = require("./dataset.json");

/*
  create an array with accounts from bankBalances that are
  greater than 100,000
  assign the resulting new array to `hundredThousandairs`
*/
var hundredThousandairs = dataset.bankBalances.filter(function(account) {
  // filters through the data.set of the amounts finding the accounts that are over 100000 //
  console.log(account.amount > 100000);
  return account.amount > 100000;
});
console.log("result", hundredThousandairs);
/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `rounded`

  `rounded` value is `amount` rounded to the nearest dollar

  Example:
    {
      "amount": "134758.44",
      "state": "HI",
      "rounded": 134758
    }
  assign the resulting new array to `datasetWithRoundedDollar`
*/
var datasetWithRoundedDollar = dataset.bankBalances.map(function(account) {
  // creates a new array returning with a rounded value //
  console.log(Math.round(account.amount));
  return {
    amount: account.amount,
    state: account.state,
    rounded: Math.round(account.amount)
  };
});
console.log("result", datasetWithRoundedDollar);

/*
  DO NOT MUTATE DATA.

  create a new dataset where each bank object is a new object.
  `amount` and `state` values will be transferred to the new object.
  This new object is different, you will add one new key of `roundedDime`

  `roundedDime` value is `amount` rounded to the nearest 10th of a cent

  Example 1
    {
      "amount": "134758.46",
      "state": "HI"
      "roundedDime": 134758.5
    }
  Example 2
    {
      "amount": "134758.44",
      "state": "HI"
      "roundedDime": 134758.4
    }
  assign the resulting new array to `roundedDime`
*/
var datasetWithRoundedDime = dataset.bankBalances.map(function(account) {
  // creates a new array with a roundedDime value //
  console.log(Math.round(account.amount * 10) / 10);
  return {
    amount: account.amount,
    state: account.state,
    roundedDime: Math.round(account.amount * 10) / 10
  };
});
console.log("result", datasetWithRoundedDime);

// set sumOfBankBalances to be the sum of all value held at `amount` for each bank object
var sumOfBankBalances = dataset.bankBalances.reduce(function(
  accumulator,
  current
) {
  // loop through array to add all account.amounts together //
  // while converting account.amounts into numbers from strings //
  accumulator += parseFloat(current.amount);
  // return the accumulator of amounts rounded to the nearest cent //
  console.log(Math.round(accumulator * 100) / 100);
  return Math.round(accumulator * 100) / 100;
  // initial value is 0 //
},
0);
console.log("result", sumOfBankBalances);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  take each `amount` and add 18.9% interest to it rounded to the nearest cent
  and then sum it all up into one value saved to `sumOfInterests`
 */
var sumOfInterests = dataset.bankBalances
  .filter(function(account) {
    // filter through array to find the specific states //
    return (
      account.state === "WI" ||
      account.state === "IL" ||
      account.state === "WY" ||
      account.state === "OH" ||
      account.state === "GA" ||
      account.state === "DE"
    );
    // loop through the new array with reduce //
  })
  .reduce(function(accumulator, current) {
    // add 18.9% to each amount & add the new totals together //
    accumulator += parseFloat(current.amount * 0.189);
    // round it to the nearest cent //
    console.log(Math.round(accumulator * 100) / 100);
    return Math.round(accumulator * 100) / 100;
  }, 0);
console.log("result", sumOfInterests);

/*
  aggregate the sum of bankBalance amounts
  grouped by state
  set stateSums to be a hash table where

  the key is:
    the two letter state abbreviation
  and the value is:
    the sum of all amounts from that state
    the value must be rounded to the nearest cent

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
// make a new object //
// {key is account.state : value is sum of ALL account.amount from that account.state,
// rounded to nearest cent}
var stateSums = dataset.bankBalances.reduce(function(accumulator, current) {
  // create a variable to convert current.amount into a number //
  const numAmount = parseFloat(current.amount);
  // if there is a key, then add amounts together from that state setting it as value //
  // while rounding to the nearest cent //
  if (accumulator[current.state]) {
    accumulator[current.state] += Math.round(numAmount * 100) / 100;
    accumulator[current.state] =
      Math.round(accumulator[current.state] * 100) / 100;
  } else {
    accumulator[current.state] = numAmount;
  }
  return accumulator;
}, {});
console.log("result", stateSums);
/*
  for all states *NOT* in the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  sum the amount for each state (stateSum)
  take each `stateSum` and calculate 18.9% interest for that state
  sum the interest values that are greater than 50,000 and save it to `sumOfHighInterests`

  note: During your summation (
    if at any point durig your calculation where the number looks like `2486552.9779399997`
    round this number to the nearest 10th of a cent before moving on.
  )
 */
// create a new array with stateSums' keys //
var sumOfHighInterests = Object.keys(stateSums)
  .filter(function(account) {
    // filter out the states not included //
    console.log(account);
    return (
      account !== "WI" &&
      account !== "IL" &&
      account !== "WY" &&
      account !== "OH" &&
      account !== "GA" &&
      account !== "DE"
    );
  })
  .reduce(function(accumulator, current) {
    // make variable for calculating interest sum //
    let sum = stateSums[current] * 0.189;
    // if sum is greater than 50,000 than add together //
    if (sum > 50000) {
      accumulator += sum;
    }
    // round sum to the nearest cent //
    return Math.round(accumulator * 100) / 100;
  }, 0);
console.log("results", sumOfHighInterests);

/*
  set `lowerSumStates` to be an array of two letter state
  abbreviations of each state where the sum of amounts
  in the state is less than 1,000,000
 */
// filter through keys of stateSums into a new array //
var lowerSumStates = Object.keys(stateSums).filter(function(account) {
  // return keys of states whose values are less than 1,000,000 //
  return stateSums[account] < 1000000;
});
console.log("result", lowerSumStates);

/*
  aggregate the sum of each state into one hash table
  `higherStateSums` should be the sum of all states with totals greater than 1,000,000
 */
// reduce through keys of stateSums since they'll be added together //
var higherStateSums = Object.keys(stateSums).reduce(function(accumulator,current) {
  // if the stateSums are greater than 1000000, add the totals together //
  if (stateSums[current] > 1000000) {
    accumulator += stateSums[current];
  }
  return accumulator;
}, 0);
console.log("result", higherStateSums);

/*
  from each of the following states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware

  Check if all of these states have a sum of account values
  greater than 2,550,000

  if true set `areStatesInHigherStateSum` to `true`
  otherwise set it to `false`
 */
// filter out the specific states into new array // 
var areStatesInHigherStateSum = Object.keys(stateSums)
.filter(function(account) {
  return (
    account !== "WI" &&
    account !== "IL" &&
    account !== "WY" &&
    account !== "OH" &&
    account !== "GA" &&
    account !== "DE"
  );
  // return true or false if all sums are greater 2,550,000 //
}).every(function (account) {
    return stateSums[account] > 2550000;
});
console.log("result", areStatesInHigherStateSum);

/*
  Stretch Goal && Final Boss

  set `anyStatesInHigherStateSum` to be `true` if
  any of these states:
    Wisconsin
    Illinois
    Wyoming
    Ohio
    Georgia
    Delaware
  have a sum of account values greater than 2,550,000
  otherwise set it to be `false`
 */
// same thing as above problem, but using SOME method to check if ANY are true //
var anyStatesInHigherStateSum = Object.keys(stateSums)
.filter(function(account) {
  return (
    account !== "WI" &&
    account !== "IL" &&
    account !== "WY" &&
    account !== "OH" &&
    account !== "GA" &&
    account !== "DE"
  );
  // return true or false if ONE sum is greater 2,550,000 //
}).some(function (account) {
    return stateSums[account] > 2550000;
});
console.log("result", anyStatesInHigherStateSum);

module.exports = {
  hundredThousandairs: hundredThousandairs,
  datasetWithRoundedDollar: datasetWithRoundedDollar,
  datasetWithRoundedDime: datasetWithRoundedDime,
  sumOfBankBalances: sumOfBankBalances,
  sumOfInterests: sumOfInterests,
  sumOfHighInterests: sumOfHighInterests,
  stateSums: stateSums,
  lowerSumStates: lowerSumStates,
  higherStateSums: higherStateSums,
  areStatesInHigherStateSum: areStatesInHigherStateSum,
  anyStatesInHigherStateSum: anyStatesInHigherStateSum
};
