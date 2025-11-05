import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "react-oidc-context";
import { WebStorageStateStore } from "oidc-client-ts";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_CgJH8qgPD",
  client_id: "6hf3o5mihctsvtgljt4nakalma",
  redirect_uri: "http://localhost:5173",
  response_type: "code",
  scope: "email openid phone",
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  // Crucial in an SPA without routes: remove ?code&state after processing
  onSigninCallback() {
    // strip query/hash so a refresh won't try to handle the callback again
    window.history.replaceState({}, document.title, "/");
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>
);
