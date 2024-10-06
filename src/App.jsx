// import { useState } from 'react'
import Navbar from './components/navbar'
import Manager from './components/manager'
import Footer from './components/footer'
import './App.css'

function App() {

  return (
    <>
    <Navbar/>
    <div className='bg-white h-screen bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]'>
    <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
