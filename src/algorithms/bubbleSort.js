export function bubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}

function bubbleSort(mainArray, animations) {
  for(let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray.length; j++){
      // lightup arr[j] and arr[j + 1] as we compare them green?
      // FIRST iteration puts two indices in but no movement
      animations.push("turn both green",mainArray[j], mainArray[j + 1])
      if(mainArray[j] > mainArray[j + 1]) {
        // SECOND interation would be movement but NO color change
        animations.push("switch",mainArray[j], mainArray[j + 1])
        let temp = mainArray[j]
        mainArray[j] = mainArray[j + 1]
        mainArray[j + 1] = temp
        // THIRD iteration
        // stop lightup of the first index in the comparison and leave the second lit
        animations.push("unlight first index",mainArray[j])
      } else {
        // FOURTH iteration
        // toggle off the color if no swap is needed and we move on to the next index
        animations.push("unlight first index",mainArray[j])
      }
    }
  }
  return animations
}

// try logging this and looking at the procedure of iterations to figure out the 
// ways to animate the items

// if not switch, be sure to keep the color first index in the next iteration 
console.log(bubbleSortAnimations([1,2,5,4]))