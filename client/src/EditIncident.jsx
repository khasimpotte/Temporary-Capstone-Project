import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Input,
    Select,
    MenuItem,
    Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditIncident() {
    const navigate = useNavigate();
    const { sys_id } = useParams();

    const [incident, setIncident] = useState({
        number: "",
        short_description: "",
        urgency: "",
        impact: "",
    });

    useEffect(() => {
        async function fetchIncident() {
            try {
                const res = await axios.get(`http://localhost:3001/api/incidents/${sys_id}`, {
                    withCredentials: true,
                });

                const data = res.data.result;
                setIncident({
                    number: data.number || "",
                    short_description: data.short_description || "",
                    urgency: data.urgency.value || "",
                    impact: data.impact.value || "",
                });
            } catch (error) {
                console.error("Error fetching incident:", error);
                alert("Failed to load incident details.");
            }
        }
        fetchIncident();
    }, [sys_id]);






    const handleChange = (e) => {
        const { name, value } = e.target;
        setIncident((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/incidents/${sys_id}`, incident, {
                withCredentials: true,
            });
            alert("Incident updated successfully!");
            navigate("/");
        } catch (err) {
            console.error("Error updating incident:", err);
            alert("Failed to update incident.");
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: { xs: "100%", sm: 540, md: 640 },
                mx: "auto",
                my: "30px",
            }}
        >
            <Typography
                variant="h5"
                component="h2"
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#1976d2",
                    mb: 2,
                    position: "relative",
                    "&::after": {
                        content: '""',
                        display: "block",
                        width: 60,
                        height: 3,
                        backgroundColor: "#1976d2",
                        margin: "8px auto 0",
                        borderRadius: 2,
                    },
                }}
            >
                Edit Incident
            </Typography>


            <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="number">Incident Number</InputLabel>
                <Input
                    id="number"
                    name="number"
                    value={incident.number}
                    readOnly
                    disabled
                />
            </FormControl>


            <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="short_description" required>
                    Description
                </InputLabel>
                <Input
                    id="short_description"
                    name="short_description"
                    value={incident.short_description}
                    onChange={handleChange}
                    required
                />
            </FormControl>


            <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="urgency" required>
                    Urgency
                </InputLabel>
                <Select
                    id="urgency"
                    name="urgency"
                    value={incident.urgency}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value="1">1 - High</MenuItem>
                    <MenuItem value="2">2 - Medium</MenuItem>
                    <MenuItem value="3">3 - Low</MenuItem>
                </Select>
            </FormControl>


            <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="impact" required>
                    Impact
                </InputLabel>
                <Select
                    id="impact"
                    name="impact"
                    value={incident.impact}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value="1">1 - High</MenuItem>
                    <MenuItem value="2">2 - Medium</MenuItem>
                    <MenuItem value="3">3 - Low</MenuItem>
                </Select>
            </FormControl>


            <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button variant="contained" color="primary" type="submit">
                    Update
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ ml: 2 }}
                    onClick={() => navigate("/")}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
}

export default EditIncident;
