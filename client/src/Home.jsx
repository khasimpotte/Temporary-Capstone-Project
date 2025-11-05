import {
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        const incidentList = await axios.get('http://localhost:3001/api/incidents',
          { withCredentials: true }
        );
        setIncidents(incidentList.data.result);
      }
    }
    fetchData();
  }, [isLogged])


  return (
    <>
      {isLogged && incidents ? (

        <Stack spacing={5}>
          <Typography variant="h5">Incident Records:</Typography>

          <Grid container spacing={5} justifyContent={"space-around"}>

            {incidents.map((inc, index) => {
              return (
                <Grid key={inc.sys_id}>
                  <Card sx={{ width: 300, height: 200 }}>
                    <CardContent>
                      <Typography variant="h6">Incident : {inc.number}</Typography>
                      <Typography variant="body2">Description:{inc.short_description} </Typography>
                      <Typography variant="body2">State:{inc.state} </Typography>
                      <Typography variant="body2">Priority:{inc.priority} </Typography>
                      <Button sx={{ mb: 1 }} variant="contained" color="success">
                        Edit
                      </Button>
                      <Button sx={{ mt: 1, mx: 1 }} variant="contained" color="error">
                        Delete
                      </Button>
                    </CardContent>
                  </Card>


                </Grid>
              );
            })}

          </Grid>

        </Stack >

      ) : (
        <Typography>Please log in</Typography>
      )
      }
    </>
  );
}
