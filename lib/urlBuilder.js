const fs = require('fs');
const steamMarket = `https://steamcommunity.com/market/`;

function getCurrency(name) {
  let rawdata = fs.readFileSync(`${__dirname}/../config/currencies.json`);
  let currencies = JSON.parse(rawdata);

  return currencies[name]
}

//Generates popular URL
module.exports.generatePopular = (start, currency, count, appId, query = "") => {
  let url = `${steamMarket}search/render/?query&norender=1&currency=${getCurrency(currency)}&q=${encodeURIComponent(query)}&start=${start}&count=${count}&sort_column=popular`;
  if (appId) url += `&appid=${appId}`;

  return url;
};

//Generates search URL
module.exports.generateSearch = (query, currency, appId) => {
  let url = `${steamMarket}search/render/?norender=1&currency=${getCurrency(currency)}&q=${encodeURIComponent(query)}`;
  if (appId) url += `&appid=${appId}`;

  return url;
};

// Generates item histogram URl
module.exports.generateHistogram = (nameId, currency) => {
  return `${steamMarket}itemordershistogram?norender=1&language=english&currency=${getCurrency(currency)}&item_nameid=${nameId}`;
}

// Generates item listing URl
module.exports.generateListing = (appId, hashName) => {
  return `${steamMarket}listings/${appId}/${encodeURIComponent(hashName)}`;
};

// Generates item icons URL
module.exports.generateIcon = (url) => {
  return `https://steamcommunity-a.akamaihd.net/economy/image/${url}`;
};
