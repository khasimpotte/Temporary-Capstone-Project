import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isLogged } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");

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

  const filteredIncidents = incidents.filter((inc) =>
    inc.number.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {isLogged && incidents ? (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5">Incident Records:</Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => navigate("/create-incident")}
            >
              Create New
            </Button>
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              label="Search by Incident Number"
              variant="outlined"
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
              gap: 2,
            }}
          >
            {filteredIncidents.map((inc) => (
              <Card
                key={inc.sys_id}
                variant="outlined"
                sx={{
                  maxWidth: 320,
                  width: "100%",
                  height: "100%",
                  mx: "auto",
                  my: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: 2,
                  backgroundColor: "rgba(234, 224, 219, 0.49)",
                }}
              >
                <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Typography variant="h6" align="center">
                    <strong>Incident : </strong> {inc.number}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Description : </strong> {inc.short_description}
                  </Typography>
                  <Typography variant="body2">
                    <strong>State : </strong> {inc.state}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Priority : </strong> {inc.priority}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center", pb: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    onClick={() => navigate(`/edit-incident/${inc.sys_id}`)}
                  >
                    Edit
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this incident?"
                        )
                      ) {
                        try {
                          await axios.delete(
                            `http://localhost:3001/api/incidents/${inc.sys_id}`,
                            { withCredentials: true }
                          );
                          alert("Incident deleted successfully!");
                          setIncidents((prev) =>
                            prev.filter((i) => i.sys_id !== inc.sys_id)
                          );
                        } catch (err) {
                          console.error(err);
                          alert("Failed to delete incident.");
                        }
                      }
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Box>
      ) : (
        <Typography>Please log in</Typography>
      )}
    </>
  );
}
