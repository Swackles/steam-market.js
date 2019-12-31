class Histogram {
  constructor(data) {
    this.buyOrders = parseInt(data.buy_order_count.replace(",", ""));
    let buyOrderPriceMatch = data.buy_order_price.replace("--", "00").match(/([0-9]+\w|[0-9])[.|,]([0-9]+\w)/);
    this.buyOrderPrice = parseFloat(`${buyOrderPriceMatch[1]}.${buyOrderPriceMatch[2]}`);
    this.buyOrderGraph = [];

    for (let i = 0; i < data.buy_order_graph.length; i++) {
      this.buyOrderGraph.push({price: data.buy_order_graph[i][0], count: data.buy_order_graph[i][1]});
    }

    this.pricePrefix = data.price_prefix;
    this.priceSuffix = data.price_suffix;

    this.sellOrders = parseInt(data.sell_order_count.replace(",", ""));
    let sellOrderPriceMatch = data.sell_order_price.replace("--", "00").match(/([0-9]+\w|[0-9])[.|,]([0-9]+\w)/);
    this.sellOrderPrice = parseFloat(`${sellOrderPriceMatch[1]}.${sellOrderPriceMatch[2]}`);
    this.sellOrderGraph = [];

    for (let i = 0; i < data.sell_order_graph.length; i++) {
      this.sellOrderGraph.push({price: data.sell_order_graph[i][0], count: data.sell_order_graph[i][1]});
    }
  }
}

module.exports = Histogram;
