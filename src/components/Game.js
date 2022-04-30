import React, { useState, useRef } from 'react';

import './Game.css';
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonBase, Alert, Grid, Box, TextField, FormHelperText, FormControl, IconButton, useMediaQuery, createTheme, ThemeProvider, Tooltip, CssBaseline, Container } from '@mui/material';
import { color } from '@mui/system';

const useStyles = makeStyles({
    input: {
        secondary: {
            color: '#9acd32',
        },
        maxLength: 1,
        style: {
            fontSize: 40,
            textAlign: 'center',
            alignContent: 'center',
            alignItems: 'center',
            color: 'warning'
        }
    }
});

const prefersDarkMode = true;

const theme = createTheme({
    palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        secondary: {
            main: '#9acd32'
        }
    }
});

const Game = ({ verifyLetters, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score, acertou }) => {
    const prefersDarkMode = true; //useMediaQuery('(prefers-color-scheme: dark)');
    const classes = useStyles();
    const [letter, setLetter] = useState("");

    let textInput = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetters(letter);
        setLetter('');
    }


    let lembra;
    if (guesses <= 3) {
        lembra = <p>Lembrando que letras ACENTUADAS são diferentes!</p>;
    } else {

    }


    const isLoggedIn = true;
    return (
        <>
            <ThemeProvider theme={theme}>
                <Container >
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid className='game'>
                            <p className='points'>
                                <span>Pontuação: {score}</span>
                            </p>
                            <h1>Advinhe a palavra!</h1>
                            <h3 className='tip'>Dica da palavra:<span style={{ textTransform: 'uppercase' }}> {pickedCategory}</span></h3>
                            {lembra}
                            <p>Você ainda tem {guesses} tentativa(s)!</p>
                        </Grid>
                        <Grid sx={{ mt: 5, mb: 5 }} container spacing={2} columns={10} className='words' justifyContent="center" alignItems="center">

                            {letters.map((letter, i) => (
                                guessedLetters.includes(letter) ? (

                                    <Grid item sx={{
                                        fontSize: {
                                            xs: 22, // theme.breakpoints.up('xs')
                                            sm: 30, // theme.breakpoints.up('sm')
                                            md: 30, // theme.breakpoints.up('md')
                                            lg: 40, // theme.breakpoints.up('lg')
                                            xl: 50, // theme.breakpoints.up('xl')
                                        },
                                        height: {
                                            xs: 60, // theme.breakpoints.up('xs')
                                            sm: 70, // theme.breakpoints.up('sm')
                                            md: 70, // theme.breakpoints.up('md')
                                            lg: 80, // theme.breakpoints.up('lg')
                                            xl: 90, // theme.breakpoints.up('xl')
                                        },
                                    }} xs={1} lg={1} sm={1} key={i} className='letter'>{letter} </Grid>
                                ) : (
                                    <Grid item xs={1} sm={1} lg={1} sx={{
                                        fontSize: {
                                            xs: 22, // theme.breakpoints.up('xs')
                                            sm: 20, // theme.breakpoints.up('sm')
                                            md: 30, // theme.breakpoints.up('md')
                                            lg: 40, // theme.breakpoints.up('lg')
                                            xl: 90, // theme.breakpoints.up('xl')
                                        },
                                        height: {
                                            xs: 60, // theme.breakpoints.up('xs')
                                            sm: 70, // theme.breakpoints.up('sm')
                                            md: 70, // theme.breakpoints.up('md')
                                            lg: 80, // theme.breakpoints.up('lg')
                                            xl: 90, // theme.breakpoints.up('xl')
                                        },
                                    }} key={i} className='blankSquare'></Grid>
                                )
                            ))}

                        </Grid>
                        <Grid className="letterContainer">
                            <p>Tente advinhar uma letra da palavra</p>
                        </Grid>
                        <form onSubmit={handleSubmit} style={{ textAlign: 'center', alignContent: 'center', alignItems: 'center', display: 'flex', flexFlow: 'column' }}>
                            <Tooltip title="Coloque aqui sua letra" placement="right" arrow>
                                <TextField required
                                    color="secondary"
                                    margin="dense"
                                    autoComplete='off'
                                    id="outlined-basic"
                                    label="Letra"
                                    InputLabelProps={{ style: { fontSize: 18 } }}
                                    inputProps={{ maxLength: 1, style: { fontSize: 40, textAlign: 'center', alignContent: 'center', alignItems: 'center', color: 'yellowgreen' } }}
                                    sx={{
                                        color: 'yellowgreen', fontSize: '40', mode: 'dark', mb: 2,
                                        width: {
                                            xs: '50%', // theme.breakpoints.up('xs')
                                            sm: '20%', // theme.breakpoints.up('sm')
                                            md: '15%', // theme.breakpoints.up('md')
                                            lg: '10%', // theme.breakpoints.up('lg')
                                            xl: '10%', // theme.breakpoints.up('xl')
                                        },
                                        ':hover': {
                                            color: 'white', borderColor: 'white',
                                        }
                                    }}
                                    variant="outlined"
                                    onChange={(e) => setLetter(e.target.value)}
                                    value={letter}
                                    inputRef={textInput}

                                />
                            </Tooltip>
                            <Button onClick={() => {
                            }} type="submit" sx={{
                                mode: 'dark', color: 'yellowgreen', borderColor: 'yellowgreen', ':hover': {
                                    color: 'white',
                                    borderColor: 'white',
                                }
                            }} size="large" variant="outlined">

                                Enviar sugestão

                            </Button>
                            <p style={{ fontSize: 10 }}>Ou apenas clique no ENTER em seu teclado</p>
                        </form>
                        <div className="wrongLettersContainer">
                            <p>Letras já utilizadas:
                                {wrongLetters.map((letter, i) => (
                                    <span key={i} style={{ textTransform: 'uppercase' }}> {letter} | </span>
                                ))}
                            </p>
                        </div>


                    </Box>
                </Container>
            </ThemeProvider>
        </>

    )
}

export default Game