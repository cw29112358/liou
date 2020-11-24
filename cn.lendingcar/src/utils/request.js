import 'whatwg-fetch';
import auth from './auth';
import { APP_NAME } from './constants';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response, needParse = true) {
  return (needParse && response.json) ? response.json() : response;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return parseJSON(response).then((responseFormatted) => {
    const error = new Error(responseFormatted.message || response.statusText);
    error.response = response;
    error.response.payload = responseFormatted;
    throw error;
  });
}

/**
 * Format query params
 *
 * @param params
 * @returns {string}
 */
function formatQueryParams(params) {
  return Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default async function request(url, options = {}) {
  let fetchURL = url;
  const fetchOptions = options;

  // 1.1 Set headers Content-Type
  let defaultHeaders = {};
  if (options && !options.isFormData) {
    defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }
  fetchOptions.headers = Object.assign(defaultHeaders, options.headers);

  // 1.2 Set headers token+refId
  const token = await auth.getToken();
  const refId = await auth.get('refId');
  if (token) {
    fetchOptions.headers.Authorization = `Bearer ${token}`;
  }
  if (refId) {
    fetchOptions.headers['X-Referral'] = refId;
  }
  // tell the backend which app made the request
  // fetchOptions.headers['X-App-Name'] = 'iccars';
  fetchOptions.headers['X-App-Name'] = APP_NAME;

  // 2.Stringify body object
  if (options && !options.isFormData && options.body) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  // 3.Add query string
  if (options && options.params) {
    const params = formatQueryParams(options.params);
    fetchURL = `${url}?${params}`;
  }

  return fetch(fetchURL, fetchOptions)
    .then(checkStatus)
    .then((response) => parseJSON(response, options.parseJSON));
}
