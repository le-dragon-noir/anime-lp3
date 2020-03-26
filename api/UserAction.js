const userActionForGet = async (url) => {
  const response = await fetch(url)
  return await response.json()
}

const userActionForPost = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  return await response.json()
}

export {userActionForGet, userActionForPost}