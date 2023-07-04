import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos, Loader, NoData } from "./";
import useFetchVideos from "../hooks/useFetchVideos";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  const { loading, error, videos, hasMore, nextPageToken } = useFetchVideos(
    `search?part=snippet&q=${selectedCategory}`
  );

  // useEffect(() => {
  //   fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
  //     setVideos(data.items)
  //   );
  // }, [selectedCategory]);

  if (loading) {
    return (
      <Box
        p={5}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        p={5}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <NoData />
      </Box>
    );
  }
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

        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
