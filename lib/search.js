const Item = require('./item');

class Search {
  constructor(data) {
    this.success = data.success;
    this.start = data.start;
    this.pagesize = data.pagesize;
    this.total = data.total_count;

    this.results = [];

    for (let item of data.results) this.results.push(new Item(item));
  }
}

module.exports = Search;
