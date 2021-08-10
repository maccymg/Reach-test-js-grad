/**
 * Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
    "url": "https://api.npms.io/v2/search/suggestions?q=react",
    "method": "GET",
    "return_payload": true
}

 *******

The results should have this structure:
{
    "status": 200.0,
    "location": [
      ...
    ],
    "from": "CACHE",
    "content": [
      ...
    ]
}

 ******

 *  With the results from this request, inside "content", count
 *  the number of packages that have a MAJOR semver version 
 *  greater than 10.x.x
 */

const { default: axios } = require("axios");

const getData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      return_payload: true,
    })
    return response.data
  } catch (err) {
    console.log(err)
  }
}

module.exports = async function countMajorVersionsAbove10() {
  // TODO
  const data = await getData()
  const numVersions = data.map(pack => parseFloat(pack.package.version))
  const count = numVersions.filter(version => version > 10).length
  return count
};
