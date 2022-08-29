import React, { useEffect, useRef, useState } from 'react'
import { Text, Button, SafeAreaView } from 'react-native'
import Slider from '@react-native-community/slider';
import Sound from 'react-native-sound';


const App = () => {

  const [music, setMusic] = useState(null)
  const [progress, setprogress] = useState(0)
  const [second, setsecond] = useState(0)
  const [show, setshow] = useState(true)
  let summer = useRef()


  const play = () => {
    summer.current = new Sound("https://irsv.upmusics.com/AliBZ/Naser%20Zeynali%20-%20Ba%20Toam%20%20Demo(320).mp3?_ga=2.94860309.845825288.1654392247-732183351.1654392247", null, (err) => {
      if (err) {
        console.log('hata', err)
        return
      }
      summer.current.play((success) => {
        console.log('end', success)
      })

    })
    console.log('summer.current', summer.current)
    setMusic(summer.current)
  }


  useEffect(() => {
    if (music) {
      setInterval(() => {
        music.getCurrentTime((second, play) => {
          setsecond(second)
          setprogress(Math.max(0, second) / music.getDuration())
        })
      }, 100)
    }
  }, [music])


  useEffect(() => {
    return () => {
      music && music.stop()
    }
  }, [])



  return (
    <SafeAreaView>
      <Button title="pause" onPress={() => { music.pause() }} />
      <Button title="play" onPress={() => { if (show) { play(); setshow(false) } if (!show) music.play() }} />
      <Slider onValueChange={(e) => { summer.current && summer.current.setCurrentTime(e * summer.current.getDuration()) }} value={progress} />
      <Text>{second}</Text>
      <Text>{summer.current && summer.current.getDuration()}</Text>
    </SafeAreaView>
  )
}
export default App




