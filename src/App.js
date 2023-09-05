import Header from "./components/Header";
import VideoDetails from "./components/VideoDetails";
import { AppContext } from "./context/contextApi";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import video from "./assets/video-1.mp4";

const App = () => {

  const videoUrl = video;
  const videoChapters = [
    { title: "Introduction to Computing", start: 0.0, end: 0.5 },
    { title: "What is a computer?", start: 0.7, end: 2.0 },
  ];

    return(
        <AppContext>
        <BrowserRouter>
            <div className="flex flex-col h-full">
                <Header/>
                <Routes>
                    <Route path="/" element={<VideoDetails url={videoUrl} chapters={videoChapters}/>} />
                </Routes>
            </div>
        </BrowserRouter>
        </AppContext>
    );
}

export default App;