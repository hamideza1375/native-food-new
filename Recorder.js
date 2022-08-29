import React, { Component } from 'react';
import { Button, SafeAreaView, Text } from 'react-native';
import { Player, Recorder } from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';
const filename = 'file2.mp3';


export default class App extends Component {
  state = { playPauseButton: 'Preparing...', recordButton: 'Preparing...', progress: 0, playButtonDisabled: true, second: 0 };

  componentWillMount() {

    this.player = null;
    this.recorder = null;
    this.lastSeek = 0;

    this._play();
    this._record();

    this._progressInterval = setInterval(() => {
      if (this.player && this._shouldUpdateProgressBar()) {
        this.setState({ second: this.player.currentTime })

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
    return Date.now() - this.lastSeek > 200;
  }


  _updateState() {
    this.setState({
      playPauseButton: this.player && this.player.isPlaying ? 'Pause' : 'Play',
      recordButton: this.recorder && this.recorder.isRecording ? 'Stop' : 'Record',
      playButtonDisabled: !this.player || !this.player.canPlay || this.recorder.isRecording,
      recordButtonDisabled: !this.recorder || (this.player && !this.player.isStopped),
    });
  }

  _playPause() {
    this.player.playPause((err, paused) => {
      this._updateState();
    });
  }


  _play() {
    if (this.player) {
      this.player.destroy();
    }
    this.player = new Player(filename, { autoDestroy: false }).prepare();
    this._updateState();
    this.player.on('ended', () => this._updateState());
    this.player.on('pause', () => this._updateState());
  }

  _record() {
    if (this.recorder) { this.recorder.destroy() }
    this.recorder = new Recorder(filename);
    this._updateState();
  }


  _toggleRecord() {
    if (this.player) { this.player.destroy(); }

    this.recorder.toggleRecord((err, stopped) => {
      if (stopped) {
        this._play();
        this._record();
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
    if (!this.player) return
    this.lastSeek = Date.now();
    let position = percentage * this.player.duration;
    this.player.seek(position, () => this._updateState());
  }


  render() {
    return (
      <SafeAreaView>
        <Button title={this.state.playPauseButton} disabled={this.player.duration === -1 ? true : false} onPress={() => this._playPause()} />
        <Button title={this.state.recordButton} disabled={this.state.recordButtonDisabled} onPress={() => this._toggleRecord()} />
        <Button title={'stop'} disabled={!this.state.recordButtonDisabled} onPress={() => this._stop()} />
        <Slider onValueChange={(percentage) => this._seek(percentage)} value={this.state.progress} />

        <Text>{this.player.duration}</Text>
        <Text>{this.state.second}</Text>
      </SafeAreaView>
    );
  }
}

