export function bubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}


function bubbleSort(mainArray, animations) {
  for(let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray.length; j++){
      // but j + 1 cannot be undefined
      if (mainArray[j + 1] && mainArray[j] > mainArray[j + 1]){
        // FIRST interation would be including lightup, swap, lightoff
        let temp = mainArray[j]
        mainArray[j] = mainArray[j + 1]
        mainArray[j + 1] = temp
        // animation of switch
        animations.push("swap")
      } 
      if (mainArray[j + 1] && mainArray[j] < mainArray[j + 1]){
        animations.push("skip")
      }
      if(mainArray[j + 1] === "undefined") {
        break
      }
    }
  }
  console.log(animations)
  return animations
}

// try logging this and looking at the procedure of iterations to figure out the 
// ways to animate the items

// if not switch, be sure to keep the color first index in the next iteration 
// console.log(bubbleSortAnimations([1,2,5,4]))