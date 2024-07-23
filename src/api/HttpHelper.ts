/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// const URL = "http://localhost:5000/";

import { Propane } from "@mui/icons-material";
import { Database, FetchOptions, User } from "../interface/interface";

// function POSTRequest(route, id, size, name, height) {
//   fetch(URL + route, {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify({ id, size, name, height }),
//   })
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));
// }

// function GETRequest(route) {
//   fetch(URL + route)
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));
// }

// function DELETERequest(route) {
//   fetch(URL + `${route}`, {
//     method: "DELETE",
//     headers: {
//       "Content-type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));
// }

// function PUTRequest(route, id, size, name, height) {
//   fetch(URL + route, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ id, size, name, height }),
//   })
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));
// }

function PATCHRequest(
  route: string,
  propertyName: string,
  propertyValue: string
) {
  const headers = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ [propertyName]: propertyValue }),
  };
  console.log(headers);
  fetch(route, headers)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

// PATCHRequest("http://localhost:5000/users/1", "Height", "158");

const customFetch = async (
  url: string,
  options: FetchOptions = {}
): Promise<User | Database | Error> => {
  const defaultMethod = "GET";
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  options.method = options.method || defaultMethod;
  options.headers = options.headers
    ? { ...defaultHeaders, ...options.headers }
    : defaultHeaders;

  try {
    console.log(options);
    const response = await fetch(url, options);
    // Type for response inferred based on the server response (potentially JSON)
    return await response.json();
  } catch (err) {
    return err as Error; // Re-throw the error for handling
  }
};

// Helper functions with improved type safety:
export function get(url: string, options: FetchOptions): Promise<any> {
  options.method = "GET";
  return customFetch(url, options);
}

export function post(url: string, options: FetchOptions): Promise<any> {
  options.method = "POST";
  options.headers = { "Content-type": "application/json" };
  return customFetch(url, options);
}

export function put(url: string, options: FetchOptions): Promise<any> {
  options.method = "PUT";
  options.headers = { "Content-type": "application/json" };
  return customFetch(url, options);
}

export function del(url: string, options: FetchOptions): Promise<any> {
  
  return customFetch(url, options);
}

export function patch(
  url: string,
  propertyName: string,
  propertyValue: string
): Promise<any> {
  return customFetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [propertyName]: propertyValue }),
  });
}

// const headers = {
//   method: "PATCH",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ [propertyName]: propertyValue }),
// };
// console.log(headers);
// fetch(url, headers)
//   .then((response) => response.json())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));
