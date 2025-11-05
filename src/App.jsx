import { useState } from "react";
import "./App.css";
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "6hf3o5mihctsvtgljt4nakalma";
    const logoutUri = "http://localhost:5173";
    const cognitoDomain =
      "https://us-east-2cgjh8qgpd.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(
      logoutUri
    )}`;
  };

  const loading = () => {
    if (auth.isLoading) {
      return <div>Loading...</div>;
    }
  };

  const error = () => {
    if (auth.error) {
      return <div>Encountering error... {auth.error.message}</div>;
    }
  };

  const badge = () => {
    if (auth.isAuthenticated) {
      return (
        <div>
          <pre> Hello: {auth.user?.profile.email} </pre>
          <pre> ID Token: {auth.user?.id_token} </pre>
          <pre> Access Token: {auth.user?.access_token} </pre>
          <pre> Refresh Token: {auth.user?.refresh_token} </pre>

          <button onClick={() => auth.removeUser()}>Sign out</button>
        </div>
      );
    }
  };

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
    </div>
  );
}

export default App;
