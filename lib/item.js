const App = require('./app.js')
const urlBuilder = require('./urlBuilder');
const request = require('./request');
const index = require('./../index');

function matchNameId(data)  {
  return data.match(/Market_LoadOrderSpread\((.*?)\)/)[1].trim();
}

function matchDescription(data) {
  data =  data.match(/\"descriptions\"\:\[(.*?)\]/)[1].trim();

  data = JSON.parse(data).value.replace(/<span style=\"color: #[A-Fa-f0-9]+\w\">|<\/span>/g, '');

  return data;
}

function matchParentItem(data) {
  data = data.match(/skin for the (.*?) item/);
  if (data) return data[1].trim();
  else return null
}

class Item {
  constructor(data) {
    this.name = data.name;
    // Asset description dosen't exist when getting item from inventory
    if (data.asset_description) {
      this.hashName = data.hash_name;

      this.sellListings = data.sell_listings;
      this.sellPrice = data.sell_price;
      this.sellPriceText = data.sell_price_text;
      this.salePriceText = data.sell_price_text;

      this.app = new App({icon: data.app_icon, name: data.app_name, id: data.asset_description.appid});

      this.marketTradable_restriction = data.asset_description.market_tradable_restriction;
      this.marketMarketable_restriction = data.asset_description.market_marketable_restriction;

      this.iconUrl = urlBuilder.generateIcon(data.asset_description.icon_url);
      this.iconLargeUrl = urlBuilder.generateIcon(data.asset_description.icon_url_large);

      this.tradeable = data.asset_description.tradable == 1;
      this.marketable = data.asset_description.marketable == 1;

      this.nameColor = data.asset_description.name_color;

      this.commodity = data.asset_description.commodity;
    } else {
      this.iconUrl = urlBuilder.generateIcon(data.icon_url);
      this.iconLargeUrl = urlBuilder.generateIcon(data.icon_url_large);

      this.tradeable = data.tradable == 1;
      this.marketable = data.marketable == 1;

      this.nameColor = data.name_color;

      this.commodity = data.commodity;
    }
  }

  async getNameId() {
    const url = urlBuilder.generateListing(this.app.id, this.hashName);
    let data = await request(url);

    return matchNameId(data);
  }

  async getDescription() {
    const url = urlBuilder.generateListing(this.app.id, this.hashName);
    let data = await request(url);

    return matchDescription(data);
  }

  async getParentItem() {
    const url = urlBuilder.generateListing(this.app.id, this.hashName);
    let data = await request(url);

    return matchParentItem(data);
  }

  async getAllProperties() {
    const url = urlBuilder.generateListing(this.app.id, this.hashName);
    let data = await request(url);

    let desc = matchDescription(data);

    return {
      nameId: matchNameId(data),
      description: matchDescription(data),
      parentItem: matchParentItem(desc)
    };
  }

  async getHistogram(currency = "USD") {
    const nameId = await this.getNameId();
    return await index.getHistogram(nameId, currency);
  }
}

module.exports = Item;
