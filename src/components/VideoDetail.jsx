import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    // Fetch Related Videos to show in sidebar when a particular video is selected
    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail || !videoDetail.snippet || !videoDetail.statistics) {
    return <Box minHeight="95vh">"Loading ..."</Box>;
  }

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  return (
    <Box
      sx={{
        height: {
          xs: "auto",
          md: "calc(100vh - 78px)",
        },
        // overflow: "auto",
      }}
    >
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box
          flex={1}
          sx={{
            height: {
              xs: "auto",
              md: "calc(100vh - 78px)",
            },
            overflow: "auto",
          }}
        >
          <Box sx={{ position: "sticky", top: "8px" }} pl={{ md: 2 }}>
            <ReactPlayer
              url={`https:www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography variant="h5" color="#fff" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              flexWrap="wrap"
              sx={{ color: "#fff" }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography variant="subtitle1" color="#fff">
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                  />
                </Typography>
              </Link>
              <Stack direction="row" gap="20px" alignItems="center">
                {viewCount && (
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(viewCount).toLocaleString()} views
                  </Typography>
                )}
                {likeCount && (
                  <Typography variant="body1" sx={{ opacity: 0.7 }}>
                    {parseInt(likeCount).toLocaleString()} likes
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Box
          px={2}
          py={{ xs: 5, md: 1 }}
          justifyContent="center"
          alignItems="center"
          maxWidth={{ md: "300px" }}
          sx={{
            height: { xs: "auto", md: "calc(100vh - 94px)" },
            overflow: "auto",
          }}
        >
          <Videos videos={videos} />
        </Box>
      </Stack>
    </Box>
  );
};

export default VideoDetail;
