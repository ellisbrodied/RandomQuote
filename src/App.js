import * as React from 'react';
import {useState, useEffect} from 'react';
import { CssBaseline, Button, Container, Box, ButtonGroup,Grid, TextareaAutosize }  from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import axios from 'axios';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
    const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
    const [quoteList, setQuoteList ] = useState([]);
    const [index, setIndex ] = useState();

    const getQuotes = () => {
        axios.get(url)
        .then((data)=>{
            setQuoteList(data.data.quotes);
        })
    }
    useEffect(()=>{
      getQuotes()
    },[]);
    const quotes = quoteList.map(e=>e.quote);
    const authors = quoteList.map(e=>e.author);

    const getRandom = () => {
      return Math.floor(Math.random() * quotes.length); 
    }
    useEffect(()=>{
      setIndex(getRandom());
    },[]);

    const handleClick = () => {
      setIndex(getRandom());
    }

  return (
      <>
      <React.Fragment>
       <CssBaseline/>
       <Container maxWidth='100vw'>
       <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <Box id='quote-box' sx={{bgcolor: 'white',height: '50vh', width: '50vw',position: 'absolute', left: '25%',top: '25%',borderRadius: 4 }}>
          <Box sx={{height: '10vh',width:'10vw',position:'absolute',left:'15%',top:'13%',color:'#cfe8fc'}}><FormatQuoteIcon sx={{transform:'rotateY(180deg) scale(2.5)'}}/></Box>
          <Box id='text' sx={{textAlign:'center',fontSize: '20px',bgcolor:'white',color:'#cfe8fc',position:'absolute',width:'30vw',height:'20vh',left:'20%',top:'15%'}}>{quotes[index]}</Box>
          <Box id="author" sx={{fontSize: '20px',bgcolor:'white',color:'#cfe8fc',position:'absolute',width:'15vw',height:'5vh',left:'50%',top:'60%'}}>{`-${authors[index]}`}</Box>
          <ButtonGroup variant='outlined' sx={{position:'absolute', left: '450px', top: '325px'}}>
            <Button id='new-quote' onClick={handleClick}>New Quote</Button>
            <Button><a href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quotes[index]}" ${authors[index]}`} id='tweet-quote' target='_blank' style={{color:'primary'}}><TwitterIcon /></a></Button>
          </ButtonGroup>
        </Box>
       </Box>
       </Container>
      </React.Fragment>
      </>
  )
}

export default App;
