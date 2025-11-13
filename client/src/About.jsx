import { Box, Typography, Paper } from "@mui/material";

function About() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "80vh",
                backgroundColor: "background.default",
                color: "text.primary",
                p: 3,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    maxWidth: 700,
                    textAlign: "center",
                    backgroundColor: "background.paper",
                }}
            >
                <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
                    About Our Incident Management App
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    This project is built using <strong>React</strong>, <strong>Material UI</strong>,
                    and <strong>ServiceNow REST APIs</strong>. It helps users manage, create,
                    update, and delete incidents seamlessly through a modern web interface.
                </Typography>

                <Typography variant="body1" sx={{ mb: 2 }}>
                    The application integrates with <strong>ServiceNow</strong> using OAuth 2.0
                    authentication for secure access, providing real-time synchronization of
                    incidents between the ServiceNow platform and the front-end application.
                </Typography>

                <Typography variant="body1">
                    Key features include:
                    <ul style={{ textAlign: "left", marginLeft: "20px" }}>
                        <li>Login using ServiceNow credentials</li>
                        <li>Create, Edit, and Delete Incidents</li>
                        <li>Dark mode support</li>
                        <li>Responsive UI for all devices</li>
                    </ul>
                </Typography>
            </Paper>
        </Box>
    );
}

export default About;
