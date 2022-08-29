// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native';
// import App from './App';

// I18nManager.forceRTL(true)
// I18nManager.allowRTL(false)

// if (I18nManager.isRTL === false) {
//   DevSettings.reload()
// }

// console.disableYellowBox = true

// const App2 = () => {
//   return (
//     <NavigationContainer>
//       <App />
//     </NavigationContainer>
//   )
// }

// export default App2;









//! Sound
// import React, { useEffect,useState } from 'react'
// import { Text, Button ,SafeAreaView} from 'react-native'
// import Sound from 'react-native-sound';


// const App = () => {

//   const [music, setMusic] = useState(null)
//   const [second, setSecond] = useState(0)
//   const [duration, setDuration] = useState(0)


//   const play = () => {
//     let summer = new Sound("https://irsv.upmusics.com/AliBZ/Naser%20Zeynali%20-%20Ba%20Toam%20%20Demo(320).mp3?_ga=2.94860309.845825288.1654392247-732183351.1654392247", null, (err) => {
//       if (err) {
//         console.log('hata', err)
//         return
//       }
//       summer.play((success) => {
//         console.log('end', success)
//       })
//       setDuration(summer.getDuration())

//     })
//     console.log('summer', summer)
//     setMusic(summer)
//   }


//   useEffect(() => {
//     if (music) {
//       let id = setInterval(() => {
//         music.getCurrentTime((second, play) => {
//           setSecond(second)
//         })
//       }, 100)
//     }
//   }, [music])


//   const setVolume = (type) => {
//     const volume = music.getVolume()
//     console.log(volume)
//     if (type == "+") {
//       const newVolume = volume + .1
//       music.setVolume(newVolume)
//     } else {
//       const newVolume = volume - .1
//       music.setVolume(newVolume)
//     }
//   }

//   return (
//     <SafeAreaView>
//       <Button title="play" onPress={() => { play() }} />
//       <Button title="pause" onPress={() => { music.pause() }} />

//       <Button title="music.play" onPress={() => { music.play() }} />

//       <Button title="music.stop" onPress={() => { music.stop() }} />

//       <Button title="setVolume('+')" onPress={() => { setVolume('+') }} />

//       <Button title="setVolume('-')" onPress={() => { setVolume("-") }} />

//       <Button title="music.setCurrentTime(100)" onPress={() => { music.setCurrentTime(100) }} />

//       <Button title="console.log(music.isPlaying())" onPress={() => { console.log(music.isPlaying()) }} />

//       <Text>{second}  / Total Second {duration}</Text>
//     </SafeAreaView>
//   )
// }
// export default App


















//! audio-recorder-player
//  new Player('https://irsv.upmusics.com/AliBZ/Naser%20Zeynali%20-%20Ba%20Toam%20%20Demo(320).mp3?_ga=2.94860309.845825288.1654392247-732183351.1654392247').play();
// new Recorder('https://irsv.upmusics.com/AliBZ/Naser%20Zeynali%20-%20Ba%20Toam%20%20Demo(320).mp3?_ga=2.94860309.845825288.1654392247-732183351.1654392247').record();
import React, { Component } from 'react';
import { Button, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
// import Slider from '@react-native-community/slider';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';

const filename = 'a32.mp3';
const filename2 = 'a321.mp3';
// const filename2 = 'https://irsv.upmusics.com/AliBZ/Naser%20Zeynali%20-%20Ba%20Toam%20%20Demo(320).mp3?_ga=2.94860309.845825288.1654392247-732183351.1654392247'

export default class App extends Component {

  player: Player | null;
  recorder: Recorder | null;
  lastSeek: number;
  _progressInterval: IntervalID;




  constructor(props) {
    super(props);

    this.state = {
      playPauseButton: 'Preparing...',
      recordButton: 'Preparing...',

      stopButtonDisabled: true,
      playButtonDisabled: true,
      recordButtonDisabled: true,

      loopButtonStatus: false,
      progress: 0,

      error: null
    };
  }

  componentWillMount() {
    this.player2 = null;
    this.recorder2 = null;

    this.player = null;
    this.recorder = null;
    this.lastSeek = 0;

    this._reloadPlayer();
    this._reloadRecorder();

    this._progressInterval = setInterval(() => {
      if (this.player && this._shouldUpdateProgressBar()) {
        let currentProgress = Math.max(0, this.player.currentTime) / this.player.duration;
        if (isNaN(currentProgress)) {
          currentProgress = 0;
        }
        this.setState({ progress: currentProgress });
      }
    }, 100);
  }

  componentWillUnmount() {
    clearInterval(this._progressInterval);
  }

  _shouldUpdateProgressBar() {
    // Debounce progress bar update by 200 ms
    return Date.now() - this.lastSeek > 200;
  }

  _updateState(err) {
    this.setState({
      playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
      recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',

      stopButtonDisabled: !this.player || !this.player.canStop,
      playButtonDisabled: !this.player || !this.player.canPlay || this.recorder.isRecording,
      recordButtonDisabled: !this.recorder || (this.player && !this.player.isStopped),
    });
  }

  _playPause() {
    this.player.playPause((err, paused) => {
      if (err) {
        this.setState({
          error: err.message
        });
      }
      this._updateState();
    });
  }

  _stop() {
    this.player.stop(() => {
      this._updateState();
    });
  }



  _seek(percentage) {
    if (!this.player) {
      return;
    }

    this.lastSeek = Date.now();

    let position = percentage * this.player.duration;

    this.player.seek(position, () => {
      this._updateState();
    });
  }

  _reloadPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player(filename, {
      autoDestroy: false
    }).prepare((err) => {
      if (!err) this.player.looping = this.state.loopButtonStatus;
      this._updateState();
    });

    this._updateState();

    this.player.on('ended', () => {
      this._updateState();
    });
    this.player.on('pause', () => {
      this._updateState();
    });
  }

  _reloadRecorder() {
    if (this.recorder) {
      this.recorder.destroy();
    }

    this.recorder = new Recorder(filename, {
      channels: 2,
    });

    this._updateState();
  }

  _toggleRecord() {
    if (this.player) {
      this.player.destroy();
    }

    let recordAudioRequest;
    if (Platform.OS == 'android') {
      recordAudioRequest = this._requestRecordAudioPermission();
    } else {
      recordAudioRequest = new Promise(function (resolve, reject) { resolve(true); });
    }

    recordAudioRequest.then((hasPermission) => {
      if (!hasPermission) {
        this.setState({
          error: 'Record Audio Permission was denied'
        });
        return;
      }

      this.recorder.toggleRecord((err, stopped) => {
        if (err) {
          this.setState({
            error: err.message
          });
        }
        if (stopped) {
          this._reloadPlayer();
          this._reloadRecorder();
        }

        this._updateState();
      });
    });
  }

  async _requestRecordAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'ExampleApp needs access to your microphone to test react-native-audio-toolkit.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  _toggleLooping(value) {
    this.setState({
      loopButtonStatus: value
    });
    if (this.player) {
      this.player.looping = value;
    }
  }







  //!
  //!
  //!

  p() {
    this.player2 = new Player(filename2, {
      autoDestroy: false
    }).play((err) => {
      if (err) this.setState({error: err.message});
    });
  }


  pau() {
    this.player2 && this.player2.playPause((err, paused) => {
      if (err) {
        this.setState({error: err.message});
      }
    });
  }


  st() {
    this.player2.stop();
  }






  render() {
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.title}>
            Playback
          </Text>
        </View>
        <View >
          <Button title={'play'} onPress={() => { this.p()}} />
          <Button title={'pause'} onPress={() => { this.pau()}} />
          <Button title={'stop'} onPress={() => { this.st()}} />
          <View style={{marginVertical:5}}/> 
          <Button title={this.state.playPauseButton} disabled={this.state.playButtonDisabled} onPress={() => this._playPause()} />
          <Button title={'Stop'} disabled={this.state.stopButtonDisabled} onPress={() => this._stop()} />
        </View>
        <View style={styles.settingsContainer}>
          <Switch
            onValueChange={(value) => this._toggleLooping(value)}
            value={this.state.loopButtonStatus} />
          <Text>Toggle Looping</Text>
        </View>
        <View style={styles.slider}>
          {/* <Slider step={0.0001} disabled={this.state.playButtonDisabled} onValueChange={(percentage) => this._seek(percentage)} value={this.state.progress} /> */}
        </View>
        <View>
          <Text style={styles.title}>
            Recording
          </Text>
        </View>
        <View>
          <Button title={this.state.recordButton} disabled={this.state.recordButtonDisabled} onPress={() => this._toggleRecord()} />
        </View>
        <View>
          <Text style={styles.errorMessage}>{this.state.error}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    height: 10,
    margin: 10,
    marginBottom: 50,
  },
  settingsContainer: {
    alignItems: 'center',
  },
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  errorMessage: {
    fontSize: 15,
    textAlign: 'center',
    padding: 10,
    color: 'red'
  }
});







//! matn be vois
