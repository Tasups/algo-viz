export function bubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSort(array, animations);
  return animations;
}


function bubbleSort(mainArray, animations) {
  for(let i = 0; i < mainArray.length; i++) {
    for (let j = 0; j < mainArray.length - i - 1; j++){
      if (mainArray[j + 1] && mainArray[j] > mainArray[j + 1]){
        // FIRST interation to lightup, swap, lightoff
        let temp = mainArray[j]
        mainArray[j] = mainArray[j + 1]
        mainArray[j + 1] = temp
        // signal to swap elements
        animations.push(1)
      } 
      if (mainArray[j + 1] && mainArray[j] < mainArray[j + 1]){
        // SECOND iteration to lightup and lightoff
        // signal to keep elements in place
        animations.push(0)
      } 
    }
  }
  return animations
}