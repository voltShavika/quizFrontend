// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import ReactDOM from "react-dom/client";
import App from "./App"
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider
    store={store}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)