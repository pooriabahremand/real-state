export interface User {
  id?: string;
  size?: string;
  name?: string;
  height?: string;
}

// Interface for the entire database structure
export interface Database {
  users: User[];
}

export interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // Allowed HTTP methods
  headers?: { [key: string]: string }; // Flexible headers object
  body?: string; // Can be any JSON-serializable data
  signal?: AbortSignal; // Optional abort signal for timeouts
}
