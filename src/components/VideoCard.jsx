import { useNavigate } from "react-router-dom";
import { Typography, Card, CardContent, CardMedia } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

import {
  demoThumbnailUrl,
  demoVideoTitle,
  demoChannelTitle,
  demoVideoUrl,
  demoChannelUrl,
} from "../utils/constants";

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
}) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "100%",
        boxShadow: "none",
        borderRadius: 0,
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(`${videoId ? "/video/" + videoId : demoVideoUrl}`)
      }
    >
      <CardMedia
        component="img"
        height="170"
        width="320"
        image={snippet?.thumbnails?.high?.url}
        alt={snippet?.title}
        // sx={{ width: "300", height: 200 }}
      />
      <CardContent sx={{ backgroundColor: "#1e1e1e", height: "90px" }}>
        <Typography variant="subtitle1" fontWeight="bold" color="#FFF">
          {snippet?.title?.slice(0, 60) || demoVideoTitle?.slice(0, 60)}
        </Typography>

        <Typography
          variant="subtitle2"
          fontWeight="bold"
          color="gray"
          onClick={(e) => {
            navigate(
              snippet?.channelId
                ? `/channel/${snippet.channelId}`
                : demoChannelUrl
            );
            e.stopPropagation();
          }}
        >
          {snippet?.channelTitle || demoChannelTitle}
          <CheckCircle sx={{ color: "gray", ml: "5px", fontSize: 12 }} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
