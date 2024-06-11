async function client(endpoint, customConfig = {}) {
  const config = {
    method: 'GET',
    ...customConfig,
  }

  const response = await window
    .fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config)
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      console.log('not ok')
      return Promise.reject(data)
    }
}

export {client}
