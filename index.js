const Search = require('./lib/search');
const Histogram = require('./histogram');
const urlBuilder = require('./lib/urlBuilder');
const request = require('./lib/request');

module.exports = {
  async getPopular(start = 0, currency = "USD", count = 10, appId = null) {
    const url = urlBuilder.generateSearch(start, currency, count, appId, "");
    let data = await request(url);

    if (data) return new Search(data);
    else return null;
  },

  async getHistogram(nameId, currency = "USD") {
    const url = urlBuilder.generateHistogram(nameId, currency);
    let data = await request(url);
    return new Histogram(data);
  }
}
