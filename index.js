const Search = require('./lib/search');
const Histogram = require('./lib/histogram');
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
    try {
      return new Histogram(data);
    } catch {
      throw new Error(data);
    }
  }
}
