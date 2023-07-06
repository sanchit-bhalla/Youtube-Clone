import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import useFetchVideos from "../hooks/useFetchVideos";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const { id } = useParams();
  const [url, setUrl] = useState(
    `search?channelId=${id}&part=snippet,id&order=date&type=video,channel`
  );

  const { loading, error, videos, hasMore, nextPageToken } = useFetchVideos(
    url,
    id
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
              `search?channelId=${id}&part=snippet,id&order=date&type=video,channel&pageToken=${nextPageToken}`
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
    // get channel details
    fetchFromAPI(`channels?part=snippet,id&id=${id}`).then((data) =>
      setChannelDetail(data?.items[0])
    );

    // set URL
    setUrl(
      `search?channelId=${id}&part=snippet,id&order=date&type=video,channel`
    );
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
        <Videos
          videos={videos}
          loading={loading}
          error={error}
          lastVideoElementRef={lastVideoElementRef}
        />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
