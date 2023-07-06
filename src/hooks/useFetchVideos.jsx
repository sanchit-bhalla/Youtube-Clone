import { useState, useEffect } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const useFetchVideos = (url, resetVideosDependency) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);

  useEffect(() => {
    setVideos([]);
  }, [resetVideosDependency]);

  useEffect(() => {
    let controller = new AbortController();
    setLoading(true);
    setError(false);

    fetchFromAPI(url, controller.signal)
      .then((data) => {
        // We abort the previous request manually and starts the new one
        if (data?.name === "CanceledError") return;

        // Either data is falsy or (No videos present earlier and no videos coming from ajax)
        // Also in case of wrong parameter passed; data may not have items property
        if (!data || (videos.length === 0 && !data.items?.length)) {
          throw new Error("Data Not Found!");
        }
        if (Array.isArray(data.items)) {
          setVideos((prevVideos) => [...prevVideos, ...data.items]);
        }
        setNextPageToken(data.nextPageToken);
        setHasMore(data.nextPageToken ? true : false);
        setLoading(false);
      })
      .catch((e) => {
        console.log("GOTCHA: ", e);
        setError(true);
        setLoading(false);
      });

    // Clean Up code - Cancel Previous running request if any
    return () => {
      try {
        controller.abort();
      } catch (e) {}
    };
  }, [url]);

  return { loading, error, videos, hasMore, nextPageToken };
};

export default useFetchVideos;
