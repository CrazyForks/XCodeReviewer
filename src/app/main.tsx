import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/styles/globals.css";
import App from "./App.tsx";
import { AppWrapper } from "@/components/layout/PageMeta";
import { isLocalMode } from "@/shared/config/database";
import { initLocalDatabase } from "@/shared/utils/initLocalDB";

// 初始化本地数据库
if (isLocalMode) {
  initLocalDatabase().catch(console.error);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </StrictMode>
);
