const axios = require('axios');
const sleep = require('sleepjs')

module.exports = async (url, retry = 3, retryDelay = 300000) =>   {

  for (let i = 0; i <= retry; i++) {
    try {
      let response = await axios(url);

      if (response.data.success == 16) await sleep(retryDelay);
      else return response.data;
    } catch (err) {
      if ((i + 1) > retry || err.request === undefined) throw(err);

      // Check if need to retry
      let statusCodeInRange = false;
      const statusCodes = [[100, 199], [429, 429], [500, 599]];
      for (let x = 0; x < statusCodes.length; x++) {

        // response statusCode is between statusCodes
        if (err.request.res.statusCode >= statusCodes[x][0] && err.request.res.statusCode <= statusCodes[x][1]) {
          await sleep(retryDelay);
          statusCodeInRange = true;
        }
      }

      if (!statusCodeInRange) throw(err);
    }
  }
}
