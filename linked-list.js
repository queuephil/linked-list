function linkedList() {
  let head = null
  return {
    append(value) {
      function appendAsLast(current) {
        if (current.nextNode == null) return (current.nextNode = node(value))
        appendAsLast(current.nextNode)
      }
      head == null ? (head = node(value)) : appendAsLast(head)
    },
    prepend(value) {
      head == null ? (head = node(value)) : (head = node(value, head))
    },
    size: () => {
      let size = 0
      function getSize(current) {
        if (current == null) return size
        size++
        getSize(current.nextNode)
      }
      getSize(head)
      return size
    },
    head: () => {
      return head
    },
    tail: () => {
      let tail = null
      function getTail(current) {
        if (current.nextNode == null) return (tail = current)
        getTail(current.nextNode)
      }
      getTail(head)
      return tail
    },
    at(index) {
      let at = null
      let position = 0
      function getAt(current) {
        if (position == index) return (at = current)
        position++
        getAt(current.nextNode)
      }
      getAt(head)
      return at
    },
    pop: () => {
      let tail = null
      function getTailParent(current) {
        if (current.nextNode.nextNode == null) return (tail = current)
        getTailParent(current.nextNode)
      }
      getTailParent(head)
      return (tail.nextNode = null)
    },
    contains(value) {
      let result = false
      function checkValue(current) {
        if (current == null) return result
        if (current.value == value) return (result = true)
        checkValue(current.nextNode)
      }
      checkValue(head)
      return result
    },
    find(value) {
      let position = 0
      function checkValue(current) {
        if (current == null) return (position = 'Not contained')
        if (current.value == value) return position
        position++
        checkValue(current.nextNode)
      }
      checkValue(head)
      return position
    },
    toString: (current = head) => {
      let string = ''
      function appendString(current) {
        if (current == null) return (string += 'null')
        string += `( ${current.value} ) -> `
        appendString(current.nextNode)
      }
      appendString(current)
      return string
    },
    insertAt(value, index) {
      let position = 0
      function insert(current) {
        if (current == null) return false
        if (position == index - 1)
          return (current.nextNode = node(value, current.nextNode))
        position++
        insert(current.nextNode)
      }
      insert(head)
    },
    removeAt(index) {
      let position = 0
      function remove(current) {
        if (current == null) return false
        if (position == index - 1)
          return (current.nextNode = current.nextNode.nextNode)
        position++
        remove(current.nextNode)
      }
      remove(head)
    },
  }
}

function node(value = null, nextNode = null) {
  return {
    value,
    nextNode,
  }
}

const list = linkedList()
const testArray = ['dog', 'cat', 'parrot', 'hamster', 'snake', 'turtle']

testArray.map((string) => list.append(string)), console.log(list.toString())
// testArray.map((string) => list.prepend(string)), console.log(list.toString())
// console.log(list.size())
// console.log(list.head())
// console.log(list.tail())
// console.log(list.at(3))
// list.pop(), console.log(list.toString())
// console.log(list.contains('turtle'))
// console.log(list.find('turtle'))
// list.insertAt('ibex', 3), console.log(list.toString())
// list.removeAt(3), console.log(list.toString())
