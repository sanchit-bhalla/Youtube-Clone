import { Fragment } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { VideoCard, ChannelCard, Loader, NoData } from "./";

const Videos = ({ videos }) => {
  if (!videos?.length) return <NoData w="350px" />;

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      justifyContent="start"
      // gap={{ xs: 2, md: 4 }}
      gap={2}
    >
      {videos.map((item, idx) => (
        <Fragment key={idx}>
          {item.id.playlistId ? null : (
            <Box
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
          )}
        </Fragment>
      ))}
    </Stack>
  );
};

export default Videos;
