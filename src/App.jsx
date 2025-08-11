import { useEffect, useState } from 'react'
import './App.css'
import Popup from './components/Popup'
import OnBoarding from './components/OnBoarding'
import Loading from './components/Loading'

function App() {
  const [onBoardingStatus, setOnBoardingStatus] = useState(null)

  useEffect(() => {
    chrome.storage.local.get(['onBoardingStatus'], (result) => {
      setOnBoardingStatus(result.onBoardingStatus || false); // default false
    });
  }, []);

  if (onBoardingStatus === null) {
    return (
        <Loading headingText="Just a moment" subHeadingText="Loading"/>
    )
  }

  return (
    <>
      {onBoardingStatus === false && <OnBoarding onBoardingStatus={onBoardingStatus} setOnBoardingStatus={setOnBoardingStatus}/> }
      {onBoardingStatus === true && <Popup setOnBoardingStatus={setOnBoardingStatus}/>} 
    </>
  )
}

export default App
