import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import _, { values } from "lodash";
import Box from './behaviour/components/Box';
import Test from "./user/Components/Test1"
import Container from './behaviour/components/Container';
var containerState = {}

function App() {

  //Behavefx gives a map of focused event( like "sell" ,"buy" etc) to a behaviour like "SORT","SHADE" etc
  var behaviours = {
    "sell": "SORT",
    "buy": "SHADE"
  }
  return (
    <>
      <Container id="test" brainFx={undefined} behaveFx={behaviours}>
        <Box id={1} key={1}>
          <Test></Test>
        </Box>
        <Box id={2} key={2}>
          <Test></Test>
        </Box>
        <Box id={3} key={3}>
          <Test></Test>
        </Box>
        <Box id={4} key={4}>
          <Test></Test>
        </Box>
        <Box id={5} key={5}>
          <Test></Test>
        </Box>
      </Container>
    </>
  )
}

export default App;
