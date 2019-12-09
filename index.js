const Search = require('./lib/search');
const urlBuilder = require('./lib/urlBuilder');
const request = require('./lib/request');

class SteamMarket {
  constructor(options = null) {
  }

  async getPopular(start = 0, currency = "USD", count = 10, appId = null) {
    const url = urlBuilder.generateSearch(start, currency, count, appId, "");
    let data = await request(url);

    if (data) return new Search(data);
    else return null;
  }
}
module.exports = SteamMarket;

let sm = new SteamMarket();
