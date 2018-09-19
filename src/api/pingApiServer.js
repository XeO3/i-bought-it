import axios from 'axios'

/**
 * Ping
 * return 'Pong'
 */
export const pingApiServer = async function () {
  const url = 'https://api-i-bought-it.azurewebsites.net/api/ping'
  const res = await axios.get(url)
  return res.data
}
