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

 *  With the results from this request, inside "content", return
 *  the "name" of the package that has the oldest "date" value
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



module.exports = async function oldestPackageName() {
  // TODO
  const data = await getData()


  const date = data.map((pack) => {
    return {
      name: pack.package.name,
      year: parseInt(pack.package.date.slice(0, 4)),
      month: parseInt(pack.package.date.slice(5, 7)),
      day: parseInt(pack.package.date.slice(8, 10)),
      hour: parseInt(pack.package.date.slice(11, 13)),
      minute: parseInt(pack.package.date.slice(14, 16)),
      second: parseInt(pack.package.date.slice(17, 19)),
    }
  })



  const oldest = date.sort(function(a, b) {
    return a.year - b.year  ||  a.month - b.month || a.day - b.day || a.hour - b.hour || a.minute - b.minute || a.second - b.second
  })

  const name = oldest[0].name

  return name
};
