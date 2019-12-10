const App = require('./app.js')
const Histogram = require('./histogram');
const urlBuilder = require('./urlBuilder');
const request = require('./request');

class Item {
  constructor(data) {
    this.name = data.name;
    this.hashName = data.hash_name;
    this.sellListings = data.sell_listings;
    this.sellPrice = data.sell_price;
    this.sellPriceText = data.sell_price_text;
    this.salePriceText = data.sell_price_text;
    this.app = new App({icon: data.app_icon, name: data.app_name, id: data.asset_description.appid});

    this.icon = urlBuilder.generateIcon(data.asset_description.icon_url);
    this.iconLarge = urlBuilder.generateIcon(data.asset_description.icon_url_large);

    if (data.asset_description.hasOwnProperty("description")) this.description = data.asset_description.descriptions[0].value.replace(/\[color=#(.*?)\]|\[\/color\]/, "");
    else this.description = null;

    this.tradeable = data.asset_description.tradeable == 1;
    this.marketable = data.asset_description.marketable == 1;

    this.marketTradable_restriction = data.assetDescription.market_tradable_restriction;
    this.marketMarketable_restriction = data.assetDescription.market_marketable_restriction;

    this.commodity = data.asset_description.commodity;
  }

  async getNameId() {
    const url = urlBuilder.generateListing(this.app.id, this.hashName);
    let data = await request(url)

    return data.match(/Market_LoadOrderSpread\((.*?)\)/)[1].trim();
  }

  async getHistogram(currency = "USD") {
    const nameId = await this.getNameId();

    const url = urlBuilder.generateHistogram(nameId, currency);
    let data = await request(url);
    return new Histogram(data);
  }
}

module.exports = Item;
