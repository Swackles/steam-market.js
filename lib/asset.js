class Asset {
  constructor(data) {
    this.appId = data.appid;
    this.contextId = parseInt(data.contextid);
    this.assetId = data.assetid;
    this.classId = data.classid;
    this.instanceId = data.instanceid;
    this.amount = parseInt(data.amount);
  }
}

module.exports = Asset;
