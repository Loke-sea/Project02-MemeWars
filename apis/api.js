const axios = require("axios");
class Api {
  constructor(baseURL) { //baseUrl could be overwritten in the route that uses the API
    this.baseURL = baseURL
    this.api = axios.create(
      {
        baseURL: process.env.API_URL || this.baseURL
      }
    )
  }
  // CHANGE THE PATHS ACCORIDNG TO API DOCUEMNTATION
  getSearch = (keyWords)=> this.api.get(`search?${process.env.API_KEY}&keywords=${keyWords}&number=10`)

  // etc...
}

module.exports = new Api;


