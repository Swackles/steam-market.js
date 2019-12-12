const axios = require('axios');
const retryAxios = require('retry-axios');
const colors = require('colors');

module.exports = async (url) =>   {

  const interceptorId = retryAxios.attach();

  let response = await axios({
    url: url,
    raxConfig: {
    retry: 5,
    retryDelay: 30000,
    onRetryAttempt: (err) => {
      const cfg = retryAxios.getConfig(err);
      console.log(`Axios request failed, retry ${cfg.currentRetryAttempt}/5, waiting 30000 ms`.yellow);
      }
    }
  });

  if (response.status == 200) return response.data;
  else {
    console.log(`ERROR_STATUS: ${response.status}`);
    return null;
  }
}
