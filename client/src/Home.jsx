import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function Home() {
  const { isLogged } = useContext(AuthContext);

  return (
    <>
      {isLogged ? (
        <Card sx={{ width: 300 }}>
          <CardContent>
            <Typography>Incident #: 1</Typography>
            <Typography>Description: </Typography>
            <Typography>State: </Typography>
            <Typography>Priority: </Typography>
            <Button variant="contained" color="success">
              Edit
            </Button>
            <Button variant="contained" color="error">
              Delete
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}
