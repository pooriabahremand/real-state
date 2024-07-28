import React from "react";
import { withAuthMiddleware } from "../middleware/middleware";

const WithAuth = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P> => {
  return withAuthMiddleware(Component);
};

export default WithAuth;
