import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // get channel details
    fetchFromAPI(`channels?part=snippet,id&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    // Get videos of current channnel
    fetchFromAPI(
      `search?channelId=${id}&part=snippet,id&order=date&maxResults=50`
    ).then((data) => setVideos(data?.items));
  }, [id]);

  return (
    <Box
      sx={{
        height: { xs: "auto", md: "calc(100vh - 78px)" },
        overflow: "auto",
      }}
    >
      <Box>
        <div
          style={{
            background: "linear-gradient(to right, #fc466b, #3f5efb)",
            height: "225px",
            zIndex: 10,
          }}
        />

        <ChannelCard
          channelDetail={channelDetail}
          extraStyles={{ marginTop: "-110px", height: "326px" }}
        />
      </Box>

      <Box py={2} px={{ xs: 2, sm: "100px" }}>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
