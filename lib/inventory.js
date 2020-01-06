const Item = require('./item');
const Asset = require('./asset');

class Search {
  constructor(data) {
    this.success = data.success;
    this.total = data.total_inventory_count;

    this.assets = [];
    this.items = [];

    for (let item of data.descriptions) this.items.push(new Item(item));
    for (let asset of data.assets) this.assets.push(new Asset(asset));
  }
}

module.exports = Search;
