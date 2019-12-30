const axios = require('axios');
const sleep = require('sleepjs')

module.exports = async (url, retry = 3, retryDelay = 300000) =>   {

  for (let i = 0; i <= retry; i++) {
    try {
      let response = await axios(url);

      return response.data;
    } catch (err) {
      if ((i + 1) > retry) return err
      else {
        await sleep(retryDelay);
      }
    }
  }
}
