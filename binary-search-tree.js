const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
// const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const cleanedArray = cleanArray(test)

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
  }
}
function cleanArray(array) {
  let sortedArray = array.sort((a, b) => {
    return a - b
  })
  let cleanedArray = sortedArray.filter((value, index, array) => {
    return array.indexOf(value) === index
  })
  return cleanedArray
}

function tree(array) {
  let root = buildTree(array)
  function buildTree(array) {
    if (array.length == 0) return null
    let middleIndex = Math.floor(array.length / 2)
    let root = node()
    const arrayLeft = array.slice(0, middleIndex)
    const arrayRight = array.slice(middleIndex + 1)
    root.data = array[middleIndex]
    root.left = buildTree(arrayLeft)
    root.right = buildTree(arrayRight)
    return root
  }
  function node(data) {
    return {
      data,
      left: null,
      right: null,
    }
  }
  return {
    root,
    insert(value) {
      function recursion(current) {
        if (current.data == (value || null)) return root
        if (current.data < value) {
          if (current.right == null) return (current.right = node(value))
          recursion(current.right)
        }
        if (current.data > value) {
          if (current.left == null) return (current.left = node(value))
          recursion(current.left)
        }
      }
      recursion(root)
      return root
    },
    delete(value) {
      function recursion(current, value) {
        if (current.data == null) return null
        if (current.data < value) {
          current.right = recursion(current.right, value)
        }
        if (current.data > value) {
          current.left = recursion(current.left, value)
        }
        if (current.data == value) {
          if (current.right == null) return current.left
          if (current.left == null) return current.right

          let successor = current.right
          while (successor.left !== null) successor = successor.left
          current.data = successor.data
          current.right = recursion(current.right, successor.data)
        }
        return current
      }
      root = recursion(root, value)
      return root
    },
    find(value) {
      function recursion(current) {
        if (current == null) return null
        if (current.data === value) return current
        if (current.data < value) return recursion(current.right)
        if (current.data > value) return recursion(current.left)
      }
      return recursion(root)
    },
    levelOrder(callbackFn) {
      let queue = [root]
      while (queue.length !== 0) {
        callbackFn(queue[0].data)
        if (queue[0].left !== null) queue.push(queue[0].left)
        if (queue[0].right !== null) queue.push(queue[0].right)
        queue.shift()
      }
    },
    inOrder(callbackFn) {
      function recursion(current) {
        if (current == null) return
        recursion(current.left)
        callbackFn(current.data)
        recursion(current.right)
      }
      recursion(root)
    },
    preOrder(callbackFn) {
      function recursion(current) {
        if (current == null) return
        callbackFn(current.data)
        recursion(current.left)
        recursion(current.right)
      }
      recursion(root)
    },
    postOrder(callbackFn) {
      function recursion(current) {
        if (current == null) return
        recursion(current.left)
        recursion(current.right)
        callbackFn(current.data)
      }
      recursion(root)
    },
    height(node) {
      function recursion(current) {
        if (current == null) return 0
        return Math.max(
          1 + recursion(current.left),
          1 + recursion(current.right)
        )
      }
      recursion(node)
      return height
    },
    depth(node) {
      let depth = 0
      function recursion(current) {
        if (current == null) return null
        depth++
        if (current.data < node.data) return recursion(current.right)
        if (current.data > node.data) return recursion(current.left)
        if (current.data === node.data) return depth
        return null
      }
      recursion(root)
      return depth
    },
    isBalanced() {
      function recursion(current) {
        if (current === null) return 0

        let left = recursion(current.left)
        if (left === -1) return -1

        let right = recursion(current.right)
        if (right === -1) return -1

        if (Math.abs(left - right) > 1) return -1

        return left + right + 1
      }

      return recursion(this.root) !== -1
    },
    rebalance() {
      let treeArray = []
      this.inOrder((value) => treeArray.push(value))
      return buildTree(treeArray)
    },
  }
}

const tree1 = tree(cleanedArray)
// console.log(JSON.stringify(tree1, null, 2))
prettyPrint(tree1.root)
// prettyPrint(tree1.insert(6))
// prettyPrint(tree1.delete(8))
// console.log(tree1.find(1))
// tree1.levelOrder((value) => console.log(value))
// tree1.inOrder((value) => console.log(value))
// tree1.preOrder((value) => console.log(value))
// tree1.postOrder((value) => console.log(value))
// console.log(tree1.height(tree1.find(2)))
// console.log(tree1.depth(tree1.find(1)))

// let deleteArray = [8, 9, 10, 11]
// let deleteArray = [2, 3]
// deleteArray.map((number) => {
//   tree1.delete(number)
// })
// prettyPrint(tree1.root)
// console.log(tree1.isBalanced())
// prettyPrint(tree1.rebalance())
