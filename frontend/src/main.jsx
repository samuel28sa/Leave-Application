import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GlobalProvider } from "./context/userContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense } from "react";
import Spinner from "./components/Spinner.jsx";

const Fallback = () => (
  <div className="flex items-center justify-center w-screen h-screen bg-secondary">
    <Spinner className={`w-10 h-10`} />
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<Fallback />}>
      <GlobalProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose="3000"
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="light"
        />
      </GlobalProvider>
    </Suspense>
  </StrictMode>
);
