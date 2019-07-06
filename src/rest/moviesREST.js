import axios from "axios";

const baseUrl = "/";

const MoviesREST = {
  getMovieRecords(id, options) {
    options = options || {};
    options.method = options.method || "GET";
    options.credentials = "same-origin";
    const url  = "http://www.omdbapi.com/?i=tt3896198&apikey=b10b2ea"
    return this.requestCall(url, options);
  },
 uploadMovieRecords(id, options) {
  options = options || {};
  options.method = options.method || "POST";
  options.credentials = "same-origin";
  options.data = options.data || {};
  const url = "movies_poster";
  return this.requestCall(baseUrl + url, options);
  },
  getRecords(id, options) {
    options = options || {};
    options.method = options.method || "GET";
    options.credentials = "same-origin";
    const url = "movies";
    return this.requestCall(baseUrl + url, options);
  },
  addRecord(id, options) {
    options = options || {};
    options.method = options.method || "POST";
    options.credentials = "same-origin";
    options.data = options.data || {};
    const url = "movies";
    return this.requestCall(baseUrl + url, options);
  },
  deleteRecord(id, options) {
    options = options || {};
    options.method = options.method || "DELETE";
    options.credentials = "same-origin";
    const url = "movies/" + id;
    return this.requestCall(baseUrl + url, options);
  },
  updateRecords(id, options) {
     options = options || {};
    options.method = options.method || 'PUT';
    options.credentials = 'same-origin';
    options.data = options.data || {};
    const url = 'movies/'+id;
    return this.requestCall(baseUrl + url, options);
  },
  requestCall(url, options) {
    options.credentials = "same-origin";
    return axios(url, options)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err;
      });
  }
};

export default MoviesREST;
