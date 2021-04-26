import Head from 'next/head'
import Image from 'next/image'
import useSwr from 'swr'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card } from 'react-bootstrap';
import ColorPicker from '../components/ColorPicker/ColorPicker'
import { useState, useEffect } from 'react'
import Cards from '../components/Cards/cards'

const fetcher = (url) => fetch(url).then((res) => res.json())

const bandsArr = [];
const codeFromApi = 'No response as yet'

export default function Home() {

  const { data, error } = useSwr('/api/colors', fetcher)
  const [ bandColors, setBandColors] =  useState([])
  const [ bandValues, setBandValues] =  useState({})
  const [ toggleState, setToggleState ] = useState(true)

  useEffect(() => {
    console.log('New Band Colors', bandColors) 
  }, [bandColors])

  useEffect(() => {
    console.log('New Band Colors', bandValues) 
  }, [bandValues])
  
  const handleBandsChanged = (number, newColor) => {
    let colorBands = [...bandColors]
    colorBands[number] = newColor
    setBandColors(colorBands)
  }

  const getResult = () => {
    if (bandColors.length === 4 ){
      console.log('Bands Colors', `/api/color/${bandColors.join('/')}`)
      fetch(`/api/color/${bandColors.join('/')}`)
        .then(response => { 
          return response.json()         
        })
        .then(bandValues =>{
          setBandValues(bandValues)
        }) 
    }
    else{
      alert('plase enter more bands')
    }  
  }

  const clearValues = () =>{
    setBandValues({})
    setToggleState(!toggleState)
  }

  if (error) { 
    console.log('error', error)
    return <div>Failed to load users</div>
  }
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />      
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Color Code
        </h1>
         <Image
             src="/resistor.png"
             width={200}
             height={200}
        />

        <h3> Made with <a href="https://nextjs.org">Next.js!</a></h3>

        <p>This application allows you to decipher color codes</p>
        <div className={styles.grid}>

            <ColorPicker
              number={1} 
              itemData={data}
              bandType = 'significant' 
              handleBandChange = {handleBandsChanged}
              toggleState = {toggleState}
            >
            </ColorPicker>

            <ColorPicker
              number={2} 
              itemData={data}
              bandType = 'significant' 
              handleBandChange = {handleBandsChanged}
              toggleState = {toggleState}
            >
            </ColorPicker>

            <ColorPicker 
              number={3} 
              itemData={data} 
              bandType = 'multiplier' 
              handleBandChange = {handleBandsChanged}
              toggleState = {toggleState}
            >
            </ColorPicker>

            <ColorPicker 
              number={0} 
              itemData={data} 
              bandType = 'tolerance'
              handleBandChange = {handleBandsChanged}
              toggleState = {toggleState}
            >
            </ColorPicker>
        </div>

        <Cards 
          resistance = {bandValues.resistance}
          tolerance = {bandValues.tolerance}
          maximum = {bandValues.maximum}
          minimum = {bandValues.minimum}
        />
          

        <div>
          <Button 
            className={styles.buttons}
            onClick = {()=>clearValues()}
          >
            Clear
          </Button>
          <Button className={styles.buttons}
            onClick = {() => getResult()}
          >
            Get Value
          </Button>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created by Kayode Anthony, Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
