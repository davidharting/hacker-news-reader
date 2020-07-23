// test-utils.js
import React from "react";
import { render } from "@testing-library/react";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./app/store";

const AllTheProviders = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// override render method
export { customRender as render };
