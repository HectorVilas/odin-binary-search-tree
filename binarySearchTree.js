class Tree {
  constructor(array) {
    this.root = this.buildTree([... new Set(array)].sort(( a, b ) => { return a - b }));
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const middle = Math.floor((start + end) / 2);
    const root = new Node(array[middle]);

    root.left = this.buildTree(array, start, middle - 1);
    root.right = this.buildTree(array, middle + 1, end);

    return root;
  }

  insert(value) {
    let currentLevel = this.root;
    while (currentLevel !== null && value !== currentLevel.data) {
      if (value < currentLevel.data) {
        if (currentLevel.left === null) currentLevel.left = new Node(value);
        currentLevel = currentLevel.left;
      } else {
        if (currentLevel.right === null) currentLevel.right = new Node(value);
        currentLevel = currentLevel.right;
      }
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}


// testing
const list = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const treeList = new Tree(list);
// console.log(JSON.stringify(treeList, null, 4));

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

console.log("\n\n • Array to binary tree:");
prettyPrint(treeList.root);
treeList.insert(10);
console.log("\n\n • After inserting '10':");
prettyPrint(treeList.root);
treeList.insert(9);
console.log("\n\n • After trying to insert '9' (already exists):");
prettyPrint(treeList.root);
treeList.insert(20);
treeList.insert(30);
treeList.insert(50);
treeList.insert(60);
treeList.insert(61);
treeList.insert(62);
treeList.insert(63);
treeList.insert(64);
treeList.insert(65);
treeList.insert(70);
treeList.insert(6);
treeList.insert(2);
console.log("\n\n • After inserting more values:");
prettyPrint(treeList.root);