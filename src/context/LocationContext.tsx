import { createContext, useMemo, useState } from "react";
import { LocationContextInterface } from "../interface/interface";

export const LocationContext = createContext<LocationContextInterface>({
  location: null,
  setLocation: () => {},
});

export default function LocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const memoizedLocation = useMemo(() => {
    return location;
  }, [location]);

  return (
    <LocationContext.Provider
      value={{
        setLocation,
        location: memoizedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
