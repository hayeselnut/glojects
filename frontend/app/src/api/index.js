// Contains all the front-end API calls

const defaultFetchParams = {
  cache: 'no-cache',
  method: '',
};

const isSuccess = (response) => {
  return response.status >= 200 && response.status <= 299;
};

// Handler for fetch requests
export const request = async (
  url,
  reqType = 'GET',
  data = {},
  headers = null
) => {
  const fetchParams = { ...defaultFetchParams };
  fetchParams.method = reqType;

  if (data.body !== undefined) {
    fetchParams.headers = { 'Content-Type': 'application/json' };
    fetchParams.body = JSON.stringify(data.body);
  }
  if (headers !== null) {
    fetchParams.headers = { ...fetchParams.headers, ...headers };
  }

  try {
    const response = await fetch(url, fetchParams);
    if (isSuccess(response)) {
      if (response.headers.get('content-length') !== '0') {
        return await response.json();
      } else {
        return { status: response.status, statusText: response.statusText };
      }
    } else {
      throw Error(
        JSON.stringify({
          status: response.status,
          statusText: response.statusText,
        })
      );
    }
  } catch (err) {
    console.error(`API call failed: ${err}`);
    throw err;
  }
};

//     ================================================================
//                           Auth API calls
//     ================================================================

// Example api call
export const registerUser = async (data) => {
  const result = await request(
    '/auth/register/user',
    'POST',
    {
      body: data.body,
    },
    data.headers
  );
  return result;
};
