import React, { createContext, useContext } from "react";

export const shorturlsContext = createContext(undefined);

export function useShorturlsContext() {
  const context = useContext(shorturlsContext);
  if (context === undefined) {
    throw new Error(
      "useShorturlsContext must be used within a ShorturlsProvider"
    );
  }

  return context;
}
