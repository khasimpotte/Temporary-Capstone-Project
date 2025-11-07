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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateIncident() {
    const navigate = useNavigate();

    // ✅ Updated state: only include fields needed for ServiceNow
    const [newIncident, setNewIncident] = useState({
        short_description: "",
        urgency: "",
        impact: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewIncident((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/api/incidents", newIncident, {
                withCredentials: true,
            });
            alert("Incident created successfully!");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("Error creating incident.");
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
                Add Incident
            </Typography>

            {/* Description */}
            <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="short_description" required>
                    Description
                </InputLabel>
                <Input
                    id="short_description"
                    name="short_description"
                    value={newIncident.short_description}
                    onChange={handleChange}
                    placeholder="Server issue"
                    required
                />
            </FormControl>

            {/* Urgency */}
            <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="urgency" required>
                    Urgency
                </InputLabel>
                <Select
                    id="urgency"
                    name="urgency"
                    value={newIncident.urgency}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value={1}>1 - High</MenuItem>
                    <MenuItem value={2}>2 - Medium</MenuItem>
                    <MenuItem value={3}>3 - Low</MenuItem>
                </Select>
            </FormControl>

            {/* Impact */}
            <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel htmlFor="impact" required>
                    Impact
                </InputLabel>
                <Select
                    id="impact"
                    name="impact"
                    value={newIncident.impact}
                    onChange={handleChange}
                    required
                >
                    <MenuItem value={1}>1 - High</MenuItem>
                    <MenuItem value={2}>2 - Medium</MenuItem>
                    <MenuItem value={3}>3 - Low</MenuItem>
                </Select>
            </FormControl>

            {/* Buttons */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
                <Button variant="contained" color="primary" type="submit">
                    Submit
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

export default CreateIncident;
