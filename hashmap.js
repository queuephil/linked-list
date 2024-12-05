const loadFactor = 0.75
let capacity = 16

const test = hashMap(loadFactor, capacity)

function hashMap(loadFactor, capacity) {
  let size = 0
  return {
    loadFactor,
    capacity,
    set(key, value) {
      hashMap[hash(key, capacity)] = [key, value]
      size++
      if (size > loadFactor * capacity) {
        let array = []
        for ([key, value] of Object.values(hashMap)) {
          array.push([key, value])
        }
        capacity *= 2
        for (key of Object.keys(hashMap)) {
          delete hashMap[hash(key, capacity)]
          size--
        }

        for ([key, value] of array) {
          hashMap[hash(key, capacity)] = [key, value]
          size++
        }
      }
    },
    get(key) {
      return hashMap[hash(key, capacity)] == null
        ? false
        : hashMap[hash(key, capacity)][1]
    },
    has(key) {
      return hashMap[hash(key, capacity)] == null ? false : true
    },
    remove(key) {
      return (
        hashMap[hash(key, capacity)] == null
          ? false
          : delete hashMap[hash(key, capacity)],
        size--
      )
    },
    length() {
      let length = 0
      for (key of Object.keys(hashMap)) {
        if (hashMap[key] !== null) length++
      }
      return length
    },
    clear() {
      for (key of Object.keys(hashMap)) {
        delete hashMap[hash(key, capacity)]
        size--
      }
    },
    keys() {
      let array = []
      for ([key, value] of Object.values(hashMap)) {
        array.push(key)
      }
      return array
    },
    values() {
      let array = []
      for ([key, value] of Object.values(hashMap)) {
        array.push(value)
      }
      return array
    },
    entries() {
      let array = []
      for ([key, value] of Object.values(hashMap)) {
        array.push([key, value])
      }
      return array
    },
  }
}

function hash(key, capacity) {
  let hashCode = 0
  const primeNumber = 31
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i)
  }
  return hashCode % capacity
}

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

// console.log(test.get('frog'))
// console.log(test.has('dog'))
// for (key of Object.keys(hashMap)) console.log(key, hashMap[key])
// test.remove('dog')
// for (key of Object.keys(hashMap)) console.log(key, hashMap[key])
// console.log(test.length())
// for (key of Object.keys(hashMap)) test.clear()
// for (key of Object.keys(hashMap)) console.log(key, hashMap[key])
// console.log(test.keys())
// console.log(test.values())
// console.log(test.entries())
// test.set('fish', 'blue')
// console.log(test.entries())
for (key of Object.keys(hashMap)) console.log(key, hashMap[key])
test.set('moon', 'silver')
for (key of Object.keys(hashMap)) console.log(key, hashMap[key])
