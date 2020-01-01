const App = require('./app.js')
const urlBuilder = require('./urlBuilder');
const request = require('./request');
const index = require('./../index');

class Item {
  constructor(data) {
    this.name = data.name;
    this.hashName = data.hash_name;
    this.sellListings = data.sell_listings;
    this.sellPrice = data.sell_price;
    this.sellPriceText = data.sell_price_text;
    this.salePriceText = data.sell_price_text;
    this.app = new App({icon: data.app_icon, name: data.app_name, id: data.asset_description.appid});

    this.iconUrl = urlBuilder.generateIcon(data.asset_description.icon_url);
    this.iconLargeUrl = urlBuilder.generateIcon(data.asset_description.icon_url_large);

    this.tradeable = data.asset_description.tradable == 1;
    this.marketable = data.asset_description.marketable == 1;

    this.marketTradable_restriction = data.asset_description.market_tradable_restriction;
    this.marketMarketable_restriction = data.asset_description.market_marketable_restriction;

    this.nameColor = data.asset_description.name_color;

    this.commodity = data.asset_description.commodity;
  }

  async getNameId() {
    const url = urlBuilder.generateListing(this.app.id, this.hashName);
    let data = await request(url);

    return data.match(/Market_LoadOrderSpread\((.*?)\)/)[1].trim();
  }

  async getHistogram(currency = "USD") {
    const nameId = await this.getNameId();
    return await index.getHistogram(nameId, currency);
  }
}

module.exports = Item;
