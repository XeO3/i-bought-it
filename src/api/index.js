import axios from 'axios'

const getWhooingAppToken = async function (getWhooingAppTokenData) {
  const url = 'https://whooing.com/app_auth/request_token'
  let formData = new FormData()
  for (var key in getWhooingAppTokenData) {
    formData.append(key, getWhooingAppTokenData[key])
  }
  const res = await axios.post(url, formData)
  return res.data
}

const postWhooingLoginHtml = async function (postWhooingLoginHtmlData) {
  const url = 'https://whooing.com/app_auth/authorize'
  let formData = new FormData()
  for (var key in postWhooingLoginHtmlData) {
    formData.append(key, postWhooingLoginHtmlData[key])
  }
  const res = await axios.post(url, postWhooingLoginHtmlData)
  return res.data
}
export {
  getWhooingAppToken,
  postWhooingLoginHtml
}
