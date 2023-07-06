import { Fragment } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { VideoCard, ChannelCard, Loader, NoData } from "./";

const Videos = ({
  videos,
  loading = false,
  error = false,
  lastVideoElementRef,
}) => {
  if (!videos || !Array.isArray(videos)) return <NoData w="350px" />;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      // gap={{ xs: 2, md: 4 }}
      gap={2}
    >
      {videos.map((item, idx) => {
        if (idx + 1 === videos.length) {
          return (
            <Box
              ref={lastVideoElementRef}
              key={idx}
              className="video-channel-box-wrapper"
              sx={{
                minWidth: "300px",
                flexBasis: "0",
                flexGrow: "1",
              }}
            >
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
          );
        } else {
          return (
            <Box
              key={idx}
              className="video-channel-box-wrapper"
              sx={{
                minWidth: "300px",
                flexBasis: "0",
                flexGrow: "1",
              }}
            >
              {item.id.videoId && <VideoCard video={item} />}
              {item.id.channelId && <ChannelCard channelDetail={item} />}
            </Box>
          );
        }
      })}

      {loading && (
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
      )}

      {error && (
        <Box
          p={{ xs: 2, md: 5 }}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NoData />
        </Box>
      )}
    </Stack>
  );
};

export default Videos;
