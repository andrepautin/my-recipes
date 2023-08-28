import { LinearProgress } from "@mui/material";

export default function CustomLoading({ message }) {
  return (
    <div>
      <h1>Loading {message && message}...</h1>
      <LinearProgress />
    </div>
  );
}
