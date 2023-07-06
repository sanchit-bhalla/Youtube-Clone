import { useState, useEffect, useRef, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import useFetchVideos from "../hooks/useFetchVideos";
import { Videos } from "./";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [url, setUrl] = useState(
    `search?part=snippet&type=video,channel&q=${searchTerm}`
  );

  const { loading, error, videos, hasMore, nextPageToken } = useFetchVideos(
    url,
    searchTerm
  );

  const observer = useRef();
  const lastVideoElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setUrl(
              `search?part=snippet&type=video,channel&q=${searchTerm}&pageToken=${nextPageToken}`
            );
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setUrl(`search?part=snippet&type=video,channel&q=${searchTerm}`);
  }, [searchTerm]);

  return (
    <Box
      p={2}
      sx={{
        overflowY: "auto",
        height: "90vh",
        flex: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
        Search results for{" "}
        <span style={{ color: "#F31503" }}>{searchTerm}</span> videos
      </Typography>

      <Videos
        videos={videos}
        loading={loading}
        error={error}
        lastVideoElementRef={lastVideoElementRef}
      />
    </Box>
  );
};

export default SearchFeed;
