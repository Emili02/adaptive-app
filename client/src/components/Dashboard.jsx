import React from 'react';
import {
    Container,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    LinearProgress,
    Box
} from '@mui/material';

const Dashboard = () => {
    const courses = [
        { id: 1, name: 'О компании', progress: 75 },
        { id: 2, name: 'Техника безопасности', progress: 30 },
        { id: 3, name: 'ВР тренировка', progress: 0 }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Мои курсы
                        </Typography>
                        <List>
                            {courses.map((course) => (
                                <ListItem key={course.id}>
                                    <Box sx={{ width: '100%' }}>
                                        <ListItemText 
                                            primary={course.name}
                                            secondary={
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <LinearProgress 
                                                        variant="determinate" 
                                                        value={course.progress}
                                                        sx={{ flexGrow: 1, mr: 2 }}
                                                    />
                                                    <Typography variant="body2">
                                                        {course.progress}%
                                                    </Typography>
                                                </Box>
                                            }
                                        />
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Общий прогресс
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress 
                                    variant="determinate" 
                                    value={45}
                                    sx={{ height: 10 }}
                                />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2">45%</Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard; 