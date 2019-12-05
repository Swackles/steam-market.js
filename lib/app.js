class App {
  constructor(data) {
    this.name = data.name;
    this.icon = data.icon;
    this.id = data.id || null;
  }
}

module.exports = App;
