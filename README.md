# odin-binary-search-tree
For this practice I'm creating a binary search tree. This is how it works:

Considering the next array:
```javascript
const list = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
```

We can create a binary tree, like this:
```javascript
const treeList = new Tree(list);
```

This will use the `Tree` class, which will sort the list and remove any duplicated items:
```javascript
class Tree {
  constructor(array) {
    this.root = this.buildTree([... new Set(array)].sort(( a, b ) => { return a - b }));
  }
  // ...
}
```

The `buildTree` method will then create recursively a balanced binary tree, setting the "middle item" as root, then adding each new value to it's left (lower) and right (higher) keys:
```javascript
  // ...
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    const middle = Math.floor((start + end) / 2);
    const root = new Node(array[middle]);

    root.left = this.buildTree(array, start, middle - 1);
    root.right = this.buildTree(array, middle + 1, end);

    return root;
  }
```

For optimal memory usage, a `Node` class is used here to store `value`, `left` and `right` keys:
```javascript
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
```

Here's a visual representation of the tree:

```
│           ┌── 6345
│       ┌── 324
│   ┌── 67
│   │   │   ┌── 23
│   │   └── 9
└── 8
    │       ┌── 7
    │   ┌── 5
    └── 4
        │   ┌── 3
        └── 1
```

> Which has been created using this [Odin](https://www.theodinproject.com/lessons/javascript-binary-search-trees#assignment)'s function:
> ```javascript
> const prettyPrint = (node, prefix = "", isLeft = true) => {
>   if (node === null) {
>     return;
>   }
>   if (node.right !== null) {
>     prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
>   }
>   console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
>   if (node.left !== null) {
>     prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
>   }
> };
> ```
>

## methods

### insert
New values can be inserted on the binary tree. This method will find an appropiate position (left or right) to the new value, or just ignore it if already exists:
```javascript
insert(...values) {
  values.forEach(value => {
    let currentLevel = this.root;
    while (currentLevel !== null && value !== currentLevel.data) {
      if (values < currentLevel.data) {
        if (currentLevel.left === null) currentLevel.left = new Node(value);
        currentLevel = currentLevel.left;
      } else {
        if (currentLevel.right === null) currentLevel.right = new Node(value);
        currentLevel = currentLevel.right;
      }
    }
  });
}
```

After adding some numbers, this is the result:
```
│                                                           ┌── 2
│                                                       ┌── 6    
│                                                   ┌── 70       
│                                               ┌── 65
│                                           ┌── 64
│                                       ┌── 63
│                                   ┌── 62
│                               ┌── 61
│                           ┌── 60
│                       ┌── 50
│                   ┌── 30
│               ┌── 20
│           ┌── 6345
│       ┌── 324
│   ┌── 67
│   │   │   ┌── 23
│   │   │   │   └── 10
│   │   └── 9
└── 8
    │       ┌── 7
    │   ┌── 5
    └── 4
        │   ┌── 3
        └── 1
```

This method only adds values to the current tree, it won't balance it: another method will do this.
<!--
```javascript

```
-->
