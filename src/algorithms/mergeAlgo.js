export function mergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  // console.log("Start Index: " + startIdx,"End Index: " + endIdx)
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  // console.log("Middle Index: " + middleIdx)
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  // mainArray is equal to the array first passed in
  // startIdx is now resolving throughout the stack staying as 0 until it whittles upwards
  // endIdx is now resolving throughout the stack whittling down
  // middleIdx is continually changing, helping to separate the array into individual arrays
  // auxiliaryArray is the same as the array and hasn't changed
  // animations is empty
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second time to revert their color due to the fact that the remainder of 2/3 will equal 2 and switch the ternary operator to PRIMARY COLOR
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}