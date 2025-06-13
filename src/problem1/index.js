const isNonNegativeInteger = (n) => {
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError("n must be a non-negative integer");
  }
};

/**
 * Formula
 * TC: O(1)
 * SC: O(1)
 */
const sum_to_n_a = function (n) {
  isNonNegativeInteger(n);
  return (n * (n + 1)) / 2;
};

/**
 * Brute force
 * TC: O(n)
 * SC: O(1)
 */
const sum_to_n_b = function (n) {
  isNonNegativeInteger(n);
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

/**
 * Recursion
 * TC: O(n)
 * SC: O(n)
 */
const sum_to_n_c = function (n) {
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_c(n - 1);
};

const TEST_CASES = [
  { input: 5, expected: 15 },
  { input: 10, expected: 55 },
  { input: 100, expected: 5050 },
  { input: 1000, expected: 500500 },
];

for (const testCase of TEST_CASES) {
  const resultA = sum_to_n_a(testCase.input);
  const resultB = sum_to_n_b(testCase.input);
  const resultC = sum_to_n_c(testCase.input);

  console.log(`Test case: ${testCase.input}`);
  console.log(`Result A: ${resultA}`);
  console.log(`Result B: ${resultB}`);
  console.log(`Result C: ${resultC}`);
  console.log(`Expected: ${testCase.expected}`);
  console.log("--------------------------------");
}
