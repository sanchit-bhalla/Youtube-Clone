import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const useFetchVideos = (url) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);

  console.log("Inside useFetchVideos: ", url);
  useEffect(() => {
    console.log("URL CHANGED", url);
    setLoading(true);
    setError(false);

    fetchFromAPI(url)
      .then((data) => {
        setVideos((prevVideos) => [...prevVideos, ...data.items]);
        setNextPageToken(data.nextPageToken);
        setHasMore(data.nextPageToken ? true : false);
        setLoading(false);
        console.log(data);
      })
      .catch((e) => {
        console.log("ERROR: ", e);
        setError(true);
      });
  }, [url]);

  return { loading, error, videos, hasMore, nextPageToken };
};

export default useFetchVideos;
