import BifurcationPlayer from "./components/BifurcationPlayer";
import video from "./asset/video-1.mp4";

const App = () => {
  const videoUrl = video;
  const videoChapters = [
    { title: "Introduction to Computing", start: 0.0, end: 2.0 },
    { title: "What is a computer?", start: 2.0, end: 5.0 },
  ];

  return (
    <div className="App">
      <BifurcationPlayer url={videoUrl} chapters={videoChapters} />
    </div>
  );
};

export default App;
