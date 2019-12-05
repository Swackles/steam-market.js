const App = require('./app.js')
const urlBuilder = require('./urlBuilder');
const request = require('./request');

class Item {
  constructor(data) {
    this.name = data.name;
    this.hash_name = data.hash_name;
    this.sell_listings = data.sell_listings;
    this.sell_price = data.sell_price;
    this.sell_price_text = data.sell_price_text;
    this.sale_price_text = data.sell_price_text;
    this.app = new App({icon: data.app_icon, name: data.app_name, id: data.asset_description.appid});

    this.icon = urlBuilder.generateIcon(data.asset_description.icon_url);
    this.iconLarge = urlBuilder.generateIcon(data.asset_description.icon_url_large);

    if (data.asset_description.hasOwnProperty("description")) this.description = data.asset_description.descriptions[0].value.replace(/\[color=#(.*?)\]|\[\/color\]/, "");
    else this.description = null;

    this.tradeable = data.asset_description.tradeable == 1;
    this.marketable = data.asset_description.marketable == 1;

    this.market_tradable_restriction = data.asset_description.market_tradable_restriction;
    this.market_marketable_restriction = data.asset_description.market_marketable_restriction;

    this.commodity = data.asset_description.commodity;
  }

  async getId() {
    const url = urlBuilder.generateListing(this.app.id, this.hash_name);
    let data = await request(url)

    return data.match(/Market_LoadOrderSpread\((.*?)\)/)[1].trim();
  }

  async getHistogram(currency = "USD") {
    const id = await this.getId();

    const url = urlBuilder.generateHistogram(id, currency);
    let data = await request(url);
  }
}

module.exports = Item;
