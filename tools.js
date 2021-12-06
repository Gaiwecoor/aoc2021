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
  constructor(data) {
    if (typeof data == "string") {
      const [x, y] = data.split(",").map(n => parseInt(n, 10));
      this.x = x;
      this.y = y;
    } else {
      this.x = data.x;
      this.y = data.y;
    }
  }

  distanceTo(point) {
    return Math.abs(this.x - point.x) + Math.abs(this.y - point.y);
  }

  get label() {
    return `${this.x},${this.y}`;
  }
}

class UMap extends Map {
  constructor(data) {
    super(data);
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

  some(fn) {
    for (const value of this) {
      if (fn(value, this)) return true;
    }
    return false;
  }
}

module.exports = {
  Link,
  Point,
  UMap,
  USet,
};
