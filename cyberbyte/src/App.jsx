import "./App.css";
import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "./routes/Routes";
import { createBrowserRouter } from "react-router-dom";

function App() {
  const route = createBrowserRouter(AppRoutes);
  return (
    <div className="app">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
