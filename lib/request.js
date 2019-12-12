const axios = require('axios');
const axiosRetry = require('axios-retry');

module.exports = async (url) =>   {
  let request = axios.create();

  axiosRetry(request, { retries: 5, retryDelay: (retryCount) => {
    return retryCount * 300000;
  }});

  let response = await request.get(url);

  if (response.status == 200) return response.data;
  else {
    console.log(`ERROR_STATUS: ${response.status}`);
    return null;
  }
}
