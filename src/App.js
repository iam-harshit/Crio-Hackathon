import BifurcationPlayer from "./components/BifurcationPlayer";
import video from "./asset/video-1.mp4";

const App = () => {
  const videoUrl = video;
  const videoChapters = [
    { title: "What is computer?", start: 5.0, end: 6.0 },
    { title: "Why we need to use computer?", start: 0.4, end: 0.7 },
  ];

  return (
    <div className="App">
      <BifurcationPlayer url={videoUrl} chapters={videoChapters} />
    </div>
  );
}

export default App;
