import React from "react"
import ReactDOM from "react-dom"
import { Provider as StoreProvider } from "react-redux"
import App from "./app"
import { store } from "./redux"
import "./index.css"
import "three-dots/dist/three-dots.min.css"

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
