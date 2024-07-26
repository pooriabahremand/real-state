/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
const URL = "http://localhost:5000/";
import { Database, FetchOptions, User } from "../interface/interface";

const customFetch = async (
  url: string,
  options: FetchOptions = {}
): Promise<User | Database | Error> => {
  try {
    const response = await fetch(url, options);

    return await response.json();
  } catch (err) {
    return err as Error;
  }
};

export async function get(
  route: string,
  options: FetchOptions = {}
): Promise<any> {
  options.method = "GET";
  return await customFetch(URL + route, options);
}

export function post(route: string, options: FetchOptions): Promise<any> {
  options.method = "POST";
  options.headers = { "Content-type": "application/json" };
  return customFetch(URL + route, options);
}

export function put(route: string, options: FetchOptions): Promise<any> {
  options.method = "PUT";
  options.headers = { "Content-type": "application/json" };
  return customFetch(URL + route, options);
}

export function del(route: string, options: FetchOptions): Promise<any> {
  return customFetch(URL + route, options);
}

export function patch(
  route: string,
  propertyName: string,
  propertyValue: string
): Promise<any> {
  return customFetch(URL + route, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ [propertyName]: propertyValue }),
  });
}
