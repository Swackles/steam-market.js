const axios = require('axios');

module.exports = async (url) =>   {
  let request = await axios.get(url);

  if (request.status == 200) return request.data;
  else {
    console.log(`ERROR_STATUS: ${request.status}`);
    return null;
  }
}
