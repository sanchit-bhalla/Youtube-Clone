import { useState, useRef, useCallback, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { Sidebar, Videos } from "./";
import useFetchVideos from "../hooks/useFetchVideos";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [url, setUrl] = useState(
    `search?part=snippet&q=New&type=video,channel`
  );

  const { loading, error, videos, hasMore, nextPageToken } = useFetchVideos(
    url,
    selectedCategory
  );

  const observer = useRef();
  const lastVideoElementRef = useCallback(
    (node) => {
      // If loading, return; Otherwise it will continuously calling Ajax
      if (loading) return;

      // Disconnect previous element observer before connecting it to new last element
      if (observer.current) observer.current.disconnect();

      // set up observer
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setUrl(
              `search?part=snippet&q=${selectedCategory}&type=video,channel&pageToken=${nextPageToken}`
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
    setUrl(`search?part=snippet&q=${selectedCategory}&type=video,channel`);
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Box
        sx={{
          // position: "relative",
          height: { xs: "auto", md: "calc(100vh - 78px)" },
          borderRight: "1px solid #3d3d3d",
          px: { xs: 0, md: 2 },
        }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{
            // mt: 1.5,
            color: "#fff",
            position: "sticky",
            bottom: "16px",
            left: 0,
            right: 0,
            padding: "16px 8px 0px 8px",
            background: "black",
          }}
        >
          &#169; Copyright 2023 Conqueror
        </Typography>
      </Box>

      <Box
        p={2}
        // pb={0}
        sx={{
          overflowY: "auto",
          // height: { xs: "auto", md: "calc(100vh - 110px)" },
          height: "calc(100vh - 110px)",
          flex: 2,
          paddingBottom: "16px",
          // border: "2px solid red",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          sx={{ color: "white" }}
        >
          {selectedCategory} <span style={{ color: "#F31503" }}>videos</span>
        </Typography>

        <Videos
          videos={videos}
          loading={loading}
          error={error}
          lastVideoElementRef={lastVideoElementRef}
        />
      </Box>
    </Stack>
  );
};

export default Feed;
