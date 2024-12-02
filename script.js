// fibonacci ------------------------------------------------------------------

function fibonacci(n, r = 0) {
  if (n < 2) return (r += n), n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(30)); // 832040

// merge sort -----------------------------------------------------------------

function mergeSort(array) {
  if (array.length <= 1) return array;

  const mid = Math.floor(array.length / 2);
  const left = mergeSort(array.slice(0, mid));
  const right = mergeSort(array.slice(mid));

  return merge(left, right);
}

function merge(left, right, sortedArray = []) {
  if (!left.length) return [...sortedArray, ...right];
  if (!right.length) return [...sortedArray, ...left];

  left[0] < right[0]
    ? sortedArray.push(left.shift())
    : sortedArray.push(right.shift());

  return merge(left, right, sortedArray);
}

const array1 = [3, 2, 1, 13, 8, 5, 0, 1]; // [0, 1, 1, 2, 3, 5, 8, 13]
const array2 = [105, 79, 100, 110]; // [79, 100, 105, 110]

console.log(mergeSort(array1));
console.log(mergeSort(array2));
