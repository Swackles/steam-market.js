const Search = require('./lib/search');
const Histogram = require('./lib/histogram');
const Inventory = require('./lib/inventory');
const urlBuilder = require('./lib/urlBuilder');
const request = require('./lib/request');

module.exports = {
  async findItem(query, currency = "USD", appId = null) {
    const url = urlBuilder.generateSearch(query, currency, appId);
    let data = await request(url);

    if (data) return new Search(data);
    else return null;
  },

  async getPopular(start = 0, currency = "USD", count = 10, appId = null) {
    const url = urlBuilder.generatePopular(start, currency, count, appId, "");
    let data = await request(url);

    if (data) return new Search(data);
    else return null;
  },

  async getHistogram(nameId, currency = "USD") {
    const url = urlBuilder.generateHistogram(nameId, currency);
    let data = await request(url);
    return new Histogram(data);
  },

  async getInventory(steamID64, appId, count = 5000, language = 'english') {
    const url = urlBuilder.generateInventory(steamID64, appId, count, language);
    try {
      let data = await request(url);
      return new Inventory(data);
    } catch(err) {
      if (err.response && err.response.status == 403) return 'Profile is private';
      if (err.response && err.response.status == 404) return 'User dosent\'t exist'
      else throw(err);
    }
  }
}
