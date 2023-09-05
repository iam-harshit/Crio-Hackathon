import Header from "./components/Header";
import VideoDetails from "./components/VideoDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContext } from "./context/contextApi";

const App = () => {

  return (
    <AppContext>
      <BrowserRouter>
        <div className="flex flex-col h-full">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<VideoDetails/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
      </AppContext>
  );
}

export default App;
