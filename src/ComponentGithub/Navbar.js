import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
function ButtonAppBar({ logoutUser }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: "linear-gradient(124deg, #0f172a, #1e293b)" }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <GitHubIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        GitHub User Dashboard
                    </Typography>
                    {/* <Button color="inherit" onClick={logoutUser} >
                        Log Out
                    </Button> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default ButtonAppBar;