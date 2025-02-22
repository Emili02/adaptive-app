import React, { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Container,
    Paper 
} from '@mui/material';

const Login = () => {
    const [credentials, setCredentials] = useState({
        login: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Здесь будет логика авторизации
        console.log('Login attempt:', credentials);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography component="h1" variant="h5" align="center">
                    Вход в систему
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Логин"
                        name="login"
                        autoFocus
                        value={credentials.login}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            login: e.target.value
                        })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({
                            ...credentials,
                            password: e.target.value
                        })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Войти
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login; 