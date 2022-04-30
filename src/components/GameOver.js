import { Button, ThemeProvider, Container, Box, Grid, createTheme } from '@mui/material';

const prefersDarkMode = true;

const theme = createTheme({
    palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        secondary: {
            main: '#9acd32'
        }
    }
});

const GameOver = ({ retry, score }) => {

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container >
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid sx={{ mt: 5, mb: 5 }} container spacing={2} columns={12} className='words' justifyContent="center" alignItems="center">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className='letter' sx={{
                                paddingBottom: 11,
                                fontSize: {
                                    xs: 30, // theme.breakpoints.up('xs')
                                    sm: 35, // theme.breakpoints.up('sm')
                                    md: 45, // theme.breakpoints.up('md')
                                    lg: 55, // theme.breakpoints.up('lg')
                                    xl: 65, // theme.breakpoints.up('xl')
                                },
                                height: {
                                    xs: 60, // theme.breakpoints.up('xs')
                                    sm: 70, // theme.breakpoints.up('sm')
                                    md: 70, // theme.breakpoints.up('md')
                                    lg: 80, // theme.breakpoints.up('lg')
                                    xl: 90, // theme.breakpoints.up('xl')
                                },
                            }}>
                                <Box sx={{ pt: 0, pb: 0 }}>  Fim de Jogo!</Box>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{
                                fontSize: {
                                    xs: 16, // theme.breakpoints.up('xs')
                                    sm: 20, // theme.breakpoints.up('sm')
                                    md: 20, // theme.breakpoints.up('md')
                                    lg: 20, // theme.breakpoints.up('lg')
                                    xl: 20, // theme.breakpoints.up('xl')
                                },
                                height: {
                                    xs: 60, // theme.breakpoints.up('xs')
                                    sm: 70, // theme.breakpoints.up('sm')
                                    md: 70, // theme.breakpoints.up('md')
                                    lg: 80, // theme.breakpoints.up('lg')
                                    xl: 90, // theme.breakpoints.up('xl')
                                },
                            }}>
                                <h2>A sua pontuação foi: <span>{score}</span></h2>
                            </Grid>
                        </Grid>
                        <Button onClick={retry} sx={{
                            mode: 'dark', color: 'yellowgreen', borderColor: 'yellowgreen', ':hover': {
                                color: 'white',
                                borderColor: 'white',
                            }
                        }} size="large" variant="outlined">

                            Recomeçar

                        </Button>
                    </Box>
                </Container>
            </ThemeProvider>

        </>
    )
}

export default GameOver