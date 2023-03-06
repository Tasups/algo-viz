# algo-viz

## An algorithm visualization tool

### Merge_Sort
#### The Basic
The "Merge Sort" algorithm is a solution to sorting a list of things, often numbers, by breaking down the list into individual pieces and then comparing those pieces to one another. It takes these pieces and merges them, thus earning its name, and returns back to us that sorted list.

#### The Nitty-Gritty
The algorithm is usually broken into two different functional components. The first functional component breaks down the list from the middle, having one side usually named "left" and the other "right". It's able to return single pieces by doing this recursively or successively by using what is known as "the stack." The stack is filled up and must be emptied before moving on with the second functional component for the algorithm to work as expected. 

Once everything has been broken down into individual pieces, the algorithm's second functional component takes over and sorts each piece, usually smallest to largest when using numbers, and merges them together. It does this until there are no individual pieces left and returns to us the merged, sorted list.

