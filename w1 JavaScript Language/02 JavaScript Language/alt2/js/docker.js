class Stuff {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
  }

  getWeight() {
    return this.weight;
  }
}

class Container {
  constructor(maxWeight) {
    this.maxWeight = maxWeight;
    this.weight = 0;
    this.items = [];
    this.itemType = null;
  }

  add(item) {
    if (item.constructor.name !== this.itemType)
      throw new Error("Wrong kind of object, not allowed!");

    if (this.items.includes(item))
      throw new Error(`${this.itemType} already added, not allowed!`);

    if (this.getWeight() + item.getWeight() > this.maxWeight)
      throw new Error("Too heavy, not allowed!");
    
    this.items.push(item);
    return this;
  }

  getWeight() {
    this.weight = 0;
    this.items.forEach(item => this.weight += item.getWeight());
    return this.weight;
  }
}

class Bag extends Container {
  constructor(maxWeight) {
    super(maxWeight);
    this.itemType = "Stuff";
  }
}

class Cargo extends Container {
  constructor(maxWeight) {
    super(maxWeight);
    this.itemType = "Bag";
  }
}

// koodi:
var stone = new Stuff("stone", 3);
var book = new Stuff("book", 7);
var cotton = new Stuff("cotton", 0.001);

var bag = new Bag(10);
var vuitton = new Bag(3);

var schenker = new Cargo(15);

describe("Stuffs are able to be added to bag", function () {
  it("Add a stone, bag's weight should be 3", function () {    
    expect(bag.add(stone).getWeight()).toBe(3);
  });

  it("Stone is not able to be added again", function () {
    expect(function () {
      bag.add(stone)
    }).toThrowError("Stuff already added, not allowed!");
  });

  it("Add a book, bag's weight should be 10", function () {
    expect(bag.add(book).getWeight()).toBe(10);
  });

  it("Cannot add too much stuffs in a bag (no more than max weight)", function () {
    expect(function () {
      bag.add(cotton)
    }).toThrowError("Too heavy, not allowed!");
  });

  it("After all, bag's weight should be 10", function () {
    expect(bag.getWeight()).toBe(10);
  });
});

describe("Bags are able to be added to cargo", function () {
  it("Add bag to cargo, cargo's weight should be 10", function () {
    expect(schenker.add(bag).getWeight()).toBe(10);
  });

  it("Cannot add cotton to cargo: 'Wrong kind of object, not allowed!'", function () {
    expect(function () {
      schenker.add(cotton)
    }).toThrowError("Wrong kind of object, not allowed!");
  });

  it("Add cotton to vuitton, add vuitton to cargo, cargo's weight should be about 10.001", function () {
    expect(schenker.add(vuitton.add(cotton)).getWeight()).toBe(10.001);
  });

  it("Set cotton weight to 300, cargo's weight should be 310", function () {
    cotton.weight = 300;    
    expect(schenker.getWeight()).toBe(310);
  });
});