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

module.exports = {
  Link
};
