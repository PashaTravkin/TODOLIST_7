import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

const BarApp = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6">
                    TodoList
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default BarApp;