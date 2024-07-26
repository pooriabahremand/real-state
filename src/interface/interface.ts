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

export interface MUIContextValue {
  toggleColorMode: () => void;
}

export interface AuthContextInterface {
  user: { accessToken: string; userId: number } | null;
  setUser: (value: { accessToken: string; userId: number } | null) => void;
}

export interface LocationContextInterface {
  location: { lat: number; lng: number } | null;
  setLocation: (value: { lat: number; lng: number }) => void;
}
