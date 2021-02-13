const fetch = require("node-fetch");

export const callUrlInJson = async (url, method, data) => {
  const fetchMethod = method.toUpperCase()

  const fetchBody = {
    method: fetchMethod,
    headers: {'Content-Type': 'application/json'}
  }
  if(fetchMethod !== 'GET') {
    fetchBody['body'] = data
  }

  const response = await fetch(url, fetchBody);
  await response.json();
}
