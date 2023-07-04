import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        "& .MuiCircularProgress-root": { color: "red" },
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loader;
