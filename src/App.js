import BifurcationPlayer from "./components/BifurcationPlayer";
import video from "./asset/video-1.mp4";

const App = () => {
  const videoUrl = video;
  const videoChapters = [
    { title: "Introduction to Computing", start: 0.0, end: 0.5 },
    { title: "What is a computer?", start: 0.7, end: 2.0 },
  ];

  return (
    <div className="App">
      <BifurcationPlayer url={videoUrl} chapters={videoChapters} />
    </div>
  );
};

export default App;
