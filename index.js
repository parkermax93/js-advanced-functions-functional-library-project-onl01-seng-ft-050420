const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: function(collection, element) {
      const newCollection = (collection instanceof Array) ? collection.slice() : Object.values(collection);

      for (let i = 0; i < newCollection.length; i++)
        element(newCollection[i]);

      return collection;

    },

    map: function(collection, element) {
      if (!(collection instanceof Array))
        collection = Object.values(collection);

      const newArray = [];

      for (let i = 0; i < collection.length; i++)
        newArray.push(element(collection[i]));

      return newArray;
    },

    reduce: function(c = [], callback = () =>{}, acc) {
      let collection = c.slice(0)

      if (!acc) {
        acc = collection[0];
        collection = collection.slice(1)
      }

      let collectionLength = collection.length;
      for (let i = 0; i < collectionLength; i++) {
        acc = callback(acc, collection[i], collection)
      };
      return acc;
    },

    find: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection)

      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i])) return collection[i];

      return undefined;
    },

    filter: function(collection, predicate) {
      if (!(collection instanceof Array))
        collection = Object.values(collection);

      const newArray = [];

      for (let i = 0; i < collection.length; i++)
        if (predicate(collection[i])) newArray.push(collection[i]);

      return newArray;
    },

    size: function(collection) {
      return (collection instanceof Array) ? collection.length : Object.keys(collection).length;
    },

    first: function(collection, stop = false) {
      return (stop) ? collection.slice(0, stop) : collection[0];
    },

    last: function(collection, start = false) {
      return (start) ? collection.slice(collection.length-start, collection.length) : collection[collection.length-1]
    },

    compact: function(collection){
      const comp = new Set([false, null, 0, "", undefined, NaN])
      return collection.filter(element => !comp.has(element))
    },

    sortBy: function(collection, cb) {
      const newArray = [...collection];
      return newArray.sort(function(a, b) {
        return cb(a) - cb(b);
      });
    },

    unpack: function(receiver, arr) {
      for (let val of arr)
        receiver.push(val)
    },

    flatten: function(collection, shallow, newArray = []){
      if (!Array.isArray(collection)) return newArray.push(collection);
      if (shallow) {
        for (let value of collection)
        Array.isArray(value) ? this.unpack(newArray, value) : newArray.push(value)
      } else {
        for (let value of collection) {
          this.flatten(value, false, newArray)
        };
      }
      return newArray
    },

    uniqSorted: function(collection, iteratee) {
      const sorted = [collection[0]]
      for (let i = 1; i < collection.length; i++) {
        if (sorted[i-1] !== collection[i]) {
          sorted.push(collection[i])
        }
      }
      return sorted
    },

    uniq: function(collection, sorted = false, iteratee = false){
      if (sorted) {
        return fi.uniqSorted(collection, iteratee)
      } else if (!iteratee) {
        return Array.from(new Set(collection))
      } else {
        const modifiedValues = new Set()
        const uniqValues = new Set()
        for (let value of collection) {
          const moddedValue = iteratee(value)
          if (!modifiedValues.has(moddedValue)) {
            modifiedValues.add(moddedValue)
            uniqValues.add(value)
          }
        }
        return Array.from(uniqValues)
      }

    },

    keys: function(obj) {
      const keys = [];
      for (let key in obj) {
        keys.push(key);
      }
      return keys;
    },

    values: function(obj) {
      const values = [];
      for (let key in obj) {
        values.push(obj[key]);
      }
      return values;
    },

    functions: function(obj) {
      const functionNames = []
      for (let key in obj) {
        if (typeof obj[key] === "function") {
          functionNames.push(key)
        }
      }
      return functionNames.sort()
    },
  }
})()

fi.libraryMethod()