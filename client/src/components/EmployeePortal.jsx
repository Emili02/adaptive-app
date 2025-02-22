import React from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button
} from '@mui/material';

const EmployeePortal = () => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h5">Обязательные курсы</Typography>
                        {/* Список курсов */}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h5">ВР тренировки</Typography>
                        {/* Список доступных ВР сессий */}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default EmployeePortal; 