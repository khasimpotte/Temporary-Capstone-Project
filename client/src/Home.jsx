import {
  Stack, Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  CardActions,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

import { useNavigate } from "react-router-dom";


export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      if (isLogged) {
        const incidentList = await axios.get(
          "http://localhost:3001/api/incidents",
          { withCredentials: true }
        );
        setIncidents(incidentList.data.result);
      }
    }

    fetchData();
  }, [isLogged]);

  const navigate = useNavigate();

  return (
    <>
      {isLogged && incidents ? (


        <Box fullwidth sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5">Incident Records:</Typography>
            <Button variant="contained" size="small" onClick={() => navigate("/create-incident")}>
              Create New
            </Button>
          </Box>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr  1fr 1fr 1fr' },
            gap: 2
          }}>

            {incidents.map((inc, index) => {
              return (
                <>
                  <Card key={inc.sys_id}
                    variant="outlined"
                    sx={{
                      maxWidth: 320,
                      width: '100%',
                      height: '100%',
                      mx: 'auto',
                      my: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      borderRadius: 2, backgroundColor: 'rgba(234, 224, 219, 0.49)'
                    }}
                  >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Typography variant="h6" align="center"><strong>Incident : </strong> {inc.number}</Typography>
                      <Typography variant="body2"><strong>Description : </strong>{inc.short_description} </Typography>
                      <Typography variant="body2"><strong>State : </strong>{inc.state} </Typography>
                      <Typography variant="body2"><strong>Priority : </strong>{inc.priority} </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'center', pb: 2, pt: 0 }}>
                      <Button variant="contained" color="success" size="small">
                        Edit
                      </Button>


                      <Button variant="contained" color="error" size="small">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>







                </>
              );
            })}

          </Box>
        </Box>










      ) : (
        <Typography>Please log in</Typography>
      )
      }
    </>
  );
}
