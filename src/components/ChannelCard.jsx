import { Link } from "react-router-dom";
import { Box, CardContent, CardMedia, Typography } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import { demoProfilePicture } from "../utils/constants";

const ChannelCard = ({ channelDetail, extraStyles }) => (
  <Box
    sx={{
      boxShadow: "none",
      borderRadius: "20px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      ...extraStyles,
    }}
  >
    <Link to={`/channel/${channelDetail?.id?.channelId}`}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <CardMedia
          image={
            channelDetail?.snippet?.thumbnails?.high?.url || demoProfilePicture
          }
          alt={channelDetail?.sippet?.title}
          sx={{
            borderRadius: "50%",
            width: "180px",
            height: "180px",
            mb: 2,
            border: "1px solid #e3e3e3",
          }}
        />
        <Typography variant="h6">
          {channelDetail?.snippet?.title}
          <CheckCircle sx={{ color: "gray", ml: "5px", fontSize: 14 }} />
        </Typography>

        {channelDetail?.statistics?.subscriberCount && (
          <Typography>
            {parseInt(
              channelDetail?.statistics?.subscriberCount
            ).toLocaleString()}{" "}
            Subscribers
          </Typography>
        )}
      </CardContent>
    </Link>
  </Box>
);

export default ChannelCard;
