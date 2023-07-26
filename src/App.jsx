import './App.css'
import * as React from 'react';
import { Box, Button, Stack, Grid, TextField, createTheme } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  components:{
    MuiFormLabel:{
          styleOverrides: {
              root: {
                color: '#ffff'
                  },
          }
      },
    MuiSelect:{
        styleOverrides: {
            root: {
              color: '#ffff'
                },
        }
    },
    MuiInput:{
        styleOverrides: {
            root: {
              color: '#ffff',
                },
        }
    }
  }
});
function App() {
  const [data, setData]=useState([])
  const [state, setState]=useState('')
  const [state2, setState2]=useState('')
  const [status, setStatus]=useState([])
  const handleStatus = (e) => {
    setState(e.target.value);
  };
  const handleStatus2 = (e) => {
    setState2(e.target.value);
  };
  const [gender, setGender]=useState('')
  const [genders, setGenders]=useState([])
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const [gender2, setGender2]=useState('')
  const handleGender2 = (e) => {
    setGender2(e.target.value);
  };
  const [loading, setLoading]=useState(false)
  async function fetchdata(){
    await Axios.all([
        Axios.get(`http://localhost:3000/characters`),
        Axios.get(`http://localhost:3000/gender`),
        Axios.get(`http://localhost:3000/status`),
      ]).then(response => {
        setData(response[0].data);
        setGenders(response[1].data);
        setStatus(response[2].data);
      }).catch(err => console.log(err));
    
    // const items_genders = await axios
    // .get('http://localhost:3000/gender');
    // setGenders(items_genders.data);
    // const items_status = await axios
    // .get('http://localhost:3000/status');
    // setStatus(items_status.data);
    setLoading(true);
    } 
    data.sort((x,y) => x.id-y.id);
  useEffect(()=>{
    fetchdata();
  },[]);
  let names = [];
  data.forEach(e => {
      let object = new Object({
          id: e.id,
          name: e.name
      });
      names.push(object);
  })
  const [name, setName]=useState('')
  const handleName = (e) => {
    setName(e.target.value);
  };
  let character={};
  const getForm = ()=>{
    character.name=document.getElementById("name").value;
    character.species=document.getElementById("specie").value;
    character.image=document.getElementById("img_url").value;
    character.gender=gender;
    character.status=state;
  }
  let patch_ch={};
  const getForm2 = ()=>{
    patch_ch.name=document.getElementById("name2").value;
    patch_ch.species=document.getElementById("specie2").value;
    patch_ch.image=document.getElementById("img_url2").value;
    patch_ch.gender=gender2;
    patch_ch.status=state2;
  }
  async function post(){
    getForm();
    await Axios.post('http://localhost:3000/characters',character)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }
  async function patch(){
    getForm2();
    await Axios.patch('http://localhost:3000/characters/'+name,patch_ch)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }
  const [characterId, setCharacterId]=useState('')
  const [active, setActive]=useState(false)
  async function deleteCh(){
    await Axios.delete('http://localhost:3000/characters/'+name)
    .then(response => console.log(response))
    .catch(err => console.log(err))
  }
  async function getId(){
    const response=await Axios.get('http://localhost:3000/characters/'+name);
    setCharacterId(response.data); 
    document.getElementById("name2").value= response.data.name;
    patch_ch.species=document.getElementById("specie2").value=response.data.species;
    patch_ch.image=document.getElementById("img_url2").value=response.data.image;
    setState2(response.data.status.id);
    setGender2(response.data.gender.id);
    setActive(true);
  } 
  console.log('render')
  return (
    <ThemeProvider theme={theme}>
      <Box width='50%' display='inline-block' justifyContent='center' margin='2rem'>
        <Stack justifyContent='center' spacing={4} margin='2rem'>
          <Typography variant='h3' component='h3'>Formulario</Typography>
          <TextField id='name' type='text' label="Nombre" variant="standard" />
          <TextField id='specie' label="Especie" variant="standard"/>
          <TextField id='img_url' label="Url de la imagen" variant="standard"/>
          <Combobox
          label='Estado'
          value={state}
          handle={handleStatus}
          items={status}
          options={'status'}
          />
          <Combobox
          label='Genero'
          value={gender}
          handle={handleGender}
          items={genders}
          options={'gender'}
          />
          <Box display='flex' justifyContent='space-around' >
            <Button onClick={fetchdata} variant="contained" >Get All</Button>
            <Button onClick={post} variant="contained">Post</Button>
          </Box>
        </Stack>
      </Box>
      <Box position='relative' >
        {loading?
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {data.map(item=>(
              <Grid key={item.id} item xs={4} sm={4} md={4}>
                <CardCharacter
                name={item.name}
                specie={item.species}
                image={item.image}
                gender={item.gender.gender}
                status={item.status.status}
                />
              </Grid>
            ))}
          </Grid>:
          <p>Cargando</p>
        }

      </Box>
      <Box width='50%' display='inline-block' justifyContent='center' margin='2rem'>
        <Stack justifyContent='center' spacing={4} margin='2rem'>
          <Typography variant='h3' component='h3'>Formulario 2</Typography>
          <Combobox
          id='Nombre'
          label='Nombre'
          value={name}
          handle={handleName}
          items={names}
          options={'name'}
          />
          <TextField 
          id='name2' 
          label="Nombre" 
          variant="standard" 
          InputLabelProps={{
            shrink: active,
          }}/>
          <TextField 
          id='specie2' 
          label="Especie" 
          variant="standard"
          InputLabelProps={{
            shrink: active,
          }}
          />
          <TextField 
          id='img_url2' 
          label="Url de la imagen" 
          variant="standard"
          InputLabelProps={{
            shrink: active,
          }}
          />
          <Combobox
          label='Estado'
          value={state2}
          handle={handleStatus2}
          items={status}
          options={'status'}
          />
          <Combobox
          label='Genero'
          value={gender2}
          handle={handleGender2}
          items={genders}
          options={'gender'}
          />
          <Box display='flex' justifyContent='space-around' >
            <Button onClick={getId} variant="contained" >Get:id</Button>
            <Button onClick={patch} variant="contained">Patch</Button>
            <Button onClick={deleteCh} variant="contained">Delete</Button>
          </Box>
        </Stack>
        {(characterId!='')&&<CardCharacter
          name={characterId.name}
          specie={characterId.species}
          image={characterId.image}
          gender={characterId.gender.gender}
          status={characterId.status.status}
        />}
      </Box>
    </ThemeProvider>
  )
}

export default App;
