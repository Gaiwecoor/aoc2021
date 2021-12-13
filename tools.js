class Link {
  constructor(value, closed = false) {
    this.after = closed ? this : undefined;
    this.before = closed ? this : undefined;
    this.value = value;
    this.closed = closed;
  }

  addAfter(value, returnNew = true) {
    const newLink = new this.constructor(value);
    newLink.closed = this.closed;
    newLink.before = this;
    newLink.after = this.after;
    if (this.after) this.after.before = newLink;
    this.after = newLink;
    return (returnNew ? newLink : this);
  }

  addBefore(value, returnNew = true) {
    const newLink = new this.constructor(value);
    newLink.closed = this.closed;
    newLink.before = this.before;
    newLink.after = this;
    if (this.before) this.before.after = newLink;
    this.before = newLink;
    return (returnNew ? newLink : this);
  }

  get first() {
    if (this.closed) return null;
    let link = this;
    while (link.before) link = link.before;
    return link;
  }

  get last() {
    if (this.closed) return null;
    let link = this;
    while (link.after) link = link.after;
    return link;
  }

  next(n = 1) {
    let subsequent = this;
    for (let i = 0; i < n; i++) subsequent = subsequent?.after;
    return subsequent;
  }

  previous(n = 1) {
    let prev = this;
    for (let i = 0; i < n; i++) prev = prev?.before;
    return prev;
  }

  valueOf() {
    return this.value.valueOf();
  }
}

class Point {
  constructor(x, y, value) {
    if (typeof x == "string") {
      const [x0, y0] = x.split(",").map(n => parseInt(n, 10));
      this.x = x0;
      this.y = y0;
      this.value = y;
    } else if (typeof data == "object") {
      this.x = data.x;
      this.y = data.y;
      this.value = data.value;
    } else {
      this.x = x;
      this.y = y;
      this.value = value;
    }
  }

  clone() {
    return new Point(this);
  }

  distanceTo(point) {
    return Math.abs(this.x - point.x) + Math.abs(this.y - point.y);
  }

  get label() {
    return `${this.x},${this.y}`;
  }

  valueOf() {
    return this.value;
  }
}

class UMap extends Map {
  constructor(data) {
    super(data);
  }

  clone() {
    return new this.constructor(this);
  }

  equals(other) {
    if (this.size !== other.size) return false;
    for (const [key, value] of this) {
      if (!other.has(key) || other.get(key) !== value) return false;
    }
    return true;
  }

  filter(fn) {
    const filtered = new this.constructor();
    for (const [key, value] of this) {
      if (fn(value, key, this)) filtered.set(key, value);
    }
    return filtered;
  }

  find(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return value;
    }
    return undefined;
  }

  first() {
    for (const [key, value] of this) {
      return value;
    }
  }

  last() {
    let val;
    for (const [key, value] of this) {
      val = value;
    }
    return val;
  }

  map(fn) {
    const mapped = Array(this.size);
    let i = 0;

    for (const [key, value] of this) {
      mapped[i++] = fn(value, key, this);
    }

    return mapped;
  }

  reduce(fn, accumulator = 0) {
    for (const [key, value] of this) {
      accumulator = fn(accumulator, value, key, this);
    }
    return accumulator;
  }

  some(fn) {
    for (const [key, value] of this) {
      if (fn(value, key, this)) return true;
    }
    return false;
  }
}

class USet extends Set {
  constructor(data) {
    super(data);
  }

  clone() {
    return new this.constructor(this);
  }

  equals(other) {
    if (this.size !== other.size) return false;
    for (const item of this) {
      if (!other.has(item)) return false;
    }
    return true;
  }

  filter(fn) {
    const filtered = new this.constructor();
    for (const value of this) {
      if (fn(value, this)) filtered.add(value);
    }
    return filtered;
  }

  find(fn) {
    for (const value of this) {
      if (fn(value, this)) return value;
    }
    return undefined;
  }

  first() {
    for (const value of this) {
      return value;
    }
  }

  last() {
    let val;
    for (const value of this) {
      val = value;
    }
    return val;
  }

  map(fn) {
    const mapped = Array(this.size);
    let i = 0;
    for (const value of this) {
      mapped[i++] = fn(value, this);
    }
    return mapped;
  }

  reduce(fn, accumulator = 0) {
    for (const value of this) {
      accumulator = fn(accumulator, value, this);
    }
    return accumulator;
  }

  some(fn) {
    for (const value of this) {
      if (fn(value, this)) return true;
    }
    return false;
  }
}

class Grid extends UMap {
  constructor(data) {
    super(data);
  }

  delete(x, y) {
    if (x instanceof Point) return super.delete(x.label);
    if (typeof x == "string") return super.delete(x);
    return super.delete(`${x},${y}`);
  }

  get(x, y) {
    if (x instanceof Point) return super.get(x.label);
    if (typeof x == "string") return super.get(x);
    return super.get(`${x},${y}`);
  }

  has(x, y) {
    if (x instanceof Point) return super.has(x.label);
    if (typeof x == "string") return super.has(x);
    return super.has(`${x},${y}`);
  }

  set(x, y, value) {
    if (x instanceof Point) return super.set(x.label, y);
    if (typeof x == "string") return super.set(x, y);
    return super.set(`${x},${y}`, value);
  }
}

class Tree {
  constructor(value) {
    this.after = new USet();
    this.before = new USet();
    this.value = value;
  }

  addChild(node) {
    node.parents.add(this);
    this.children.add(node);
    return this;
  }

  addParent(node) {
    node.children.add(this);
    this.parents.add(node);
    return this;
  }

  valueOf() {
    return this.value;
  }
}

module.exports = {
  Grid,
  Link,
  Point,
  UMap,
  USet,
  Tree,
};
