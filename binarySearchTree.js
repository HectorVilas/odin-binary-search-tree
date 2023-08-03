class Tree {
  constructor(array) {
    this.root = this.buildTree([... new Set(array)].sort(( a, b ) => { return a - b }));
  }

  buildTree(array) {
    return array;
  }
}

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}


// testing
const list = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const treeList = new Tree(list);
console.log(treeList);
