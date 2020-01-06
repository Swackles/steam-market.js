function parseGraph(data) {
  let newGraph = [];

  for (let item of data) newGraph.push({price: item[0], count: item[1]});

  return newGraph;
}

class Histogram {
  constructor(data) {

    // if there are no buy orders
    if (data.buy_order_count == 0) {
      this.buyOrders = 0;
      this.buyOrderPrice = null;
      this.buyOrderGraph = null
    } else {
      this.buyOrders = parseInt(data.buy_order_count);
      this.buyOrderGraph = parseGraph(data.buy_order_graph);

      let buyOrderPriceMatch = data.buy_order_price.replace("--", "00").match(/([0-9]+\w|[0-9])[.|,]([0-9]+\w)/);
      this.buyOrderPrice = parseFloat(`${buyOrderPriceMatch[1]}.${buyOrderPriceMatch[2]}`);
    }

    // if there are no sell orders
    if (data.sell_order_count == 0) {
      this.sellOrders = 0;
      this.sellOrderPrice = null;
      this.sellOrderGraph = null;
    } else {
      this.sellOrders = parseInt(data.sell_order_count);
      this.sellOrderGraph = parseGraph(data.sell_order_graph);

      let sellOrderPriceMatch = data.sell_order_price.replace("--", "00").match(/([0-9]+\w|[0-9])[.|,]([0-9]+\w)/);
      this.sellOrderPrice = parseFloat(`${sellOrderPriceMatch[1]}.${sellOrderPriceMatch[2]}`);
    }

    this.pricePrefix = data.price_prefix;
    this.priceSuffix = data.price_suffix;
  }
}

module.exports = Histogram;
