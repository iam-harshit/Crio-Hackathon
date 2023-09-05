import { createContext, useState, useEffect } from "react";
import { fetchData } from "../utils/api";

export const Context = createContext();

export const AppContext = (props) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchVideoData();
  }, []);

  const fetchVideoData = async () => {
    setLoading(true);
    try {
      const response = await fetchData();
      setVideos(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <Context.Provider
      value={{
        loading,
        setLoading,
        videos,
        setVideos,
        searchResults,
        setSearchResults,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
