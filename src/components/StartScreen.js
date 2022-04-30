import './StartScreen.css'
import Button from '@mui/material/Button';

const StartScreen = ({ startGame }) => {
    return (
        <>
            <div className="start">
                <span className='jogo'>Jogo</span>
                <h1>Secret Words</h1>

                <p>Clique no botão abaixo para começar a jogar</p>
                <Button sx={{
                    mode: 'dark', color: 'yellowgreen', borderColor: 'yellowgreen', ':hover': {
                        color: 'white',
                        borderColor: 'white',
                    }
                }} size="large" variant="outlined" onClick={startGame}> Começar o Jogo</Button>
            </div >
        </>
    )
}

export default StartScreen