"use client";
import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "../lib/store";
import AuthPersistence from "../components/AuthPersistence/AuthPersistence";

export default function StoreProvider({ children }) {
  const [store] = useState(() => makeStore());

  return (
    <Provider store={store}>
      <AuthPersistence />
      {children}
    </Provider>
  );
}
