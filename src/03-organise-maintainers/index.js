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

 * With the results from this request, inside "content", 
 * list every maintainer and each package name that they maintain,
 * return an array with the following shape:
[
    ...
    {
        username: "a-username",
        packageNames: ["a-package-name", "another-package"]
    }
    ...
]
 * NOTE: the parent array and each "packageNames" array should 
 * be in alphabetical order.
 */
const { default: axios } = require("axios");

const getData = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://api.npms.io/v2/search/suggestions?q=react',
      return_payload: true,
    })
    const data = response.data
    // console.log(data)
    let answerArray = []
    data.forEach(entryObject => {
      // console.log(entryObject)
      const packageName = entryObject.package.name
      // console.log(packageName)
      entryObject.package.maintainers.forEach(maintainer => {
        // console.log(maintainer)
        if (!answerArray[maintainer.username]) {
          answerArray[maintainer.username] = []
        }
        answerArray[maintainer.username].push(packageName)
      })
    });
    // console.log(answerArray)
    return answerArray

  } catch (err) {
    console.log(err)
  }
}
getData()

module.exports = async function organiseMaintainers() {
  // TODO

  return maintainers
};
