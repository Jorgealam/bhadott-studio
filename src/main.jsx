import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import AppErrorBoundary from "./components/AppErrorBoundary"

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`))
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault()
  window.__bhadottInstallPrompt = event
  window.dispatchEvent(new Event("bhadott-install-ready"))
})

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>
  </StrictMode>
)
