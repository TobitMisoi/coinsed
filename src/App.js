import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { CssBaseline } from "@mui/material";
import React from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const content = useRoutes(routes);

  // thirweb inititiators
  const supportedChainIds = [1, 4, 137, 80001];
  const connectors = {
    injected: {},
    magic: {
      // apiKey: "pk_...", // Your magic api key
      // chainId: 1, // The chain ID you want to allow on magic
    },
    walletconnect: {},
    walletlink: {
      appName: "coinsed",
      url: "https://coinsed.vercel.app",
      darkMode: false,
    },
  };

  return (
    <>
      <ThirdwebWeb3Provider
        connectors={connectors}
        supportedChainIds={supportedChainIds}
      >
        <CssBaseline />
        {content}
      </ThirdwebWeb3Provider>
    </>
  );
}

export default App;
