import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.js"
import "./index.css"

const rootElement = document.getElementById("root")
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
  )
} else {
  console.error("Element with ID 'root' not found")
}

// const root = ReactDOM.createRoot(document.getElementById("root"))
// root.render(<App />)
