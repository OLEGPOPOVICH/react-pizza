/* eslint-disable no-dupe-keys */
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AppStateProvider } from "./useAppStateContext";
import "./index.css";

Sentry.init({
  dsn: "https://147cea3bf5874c9aac8a40b89791177c@o636970.ingest.sentry.io/5756078",
  integrations: [new Integrations.BrowserTracing()],
  release: process.env.REACT_APP_SENTRY_RELEASE,
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <AppStateProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
