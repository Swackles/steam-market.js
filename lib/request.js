const axios = require('axios');
const axiosRetry = require('axios-retry');
const retryAxios = require('retry-axios');
const colors = require('colors');

module.exports = async (url) =>   {

  const interceptorId = retryAxios.attach();

  // axiosRetry(request, { retries: 5, retryDelay: (retryCount) => {
  //   console.log(`Axios request failed, retry ${retryCount}/5, waiting ${retryCount * 30000}ms`.yellow)
  //   return retryCount * 300000;
  // }});

  let response = await axios.get({
    retry: 5,
    retryDelay: 30000,
    onRetryAttempt: (err) => {
      const cfg = retryAxios.getConfig(err);
      console.log(`Axios request failed, retry ${cfg.currentRetryAttempt}/5, waiting 30000 ms`.yellow);
    }
  });

  if (response.status == 200) return response.data;
  else {
    console.log(`ERROR_STATUS: ${response.status}`);
    return null;
  }
}
