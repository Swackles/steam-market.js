class Histogram {
  constructor(data) {
    this.buyOrders = parseInt(data.buy_order_count.replace(',', '.'))
  }
}

module.exports = Histogram;
