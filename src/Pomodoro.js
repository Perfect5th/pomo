/* Pomodoro Timer Component */
import React, { Component } from 'react';

class Pomodoro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clock: new Date(),
      pomos: 0,
      overtime: false,
      onPomo: false,
      paused: false,
      pauseElapse: 0,
      stopped: true,
      totalWork: 0,
      longBreak: false,
      gap: 0
    };

    this.startPomo = this.startPomo.bind(this);
    this.stopPomo = this.stopPomo.bind(this);
    this.startBreak = this.startBreak.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);

    this.POMOTIME = 25 * 60 * 1000;
    this.BREAKTIME = 5 * 60 * 1000;
    this.LONGBREAK = 15 * 60 * 1000;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {

    this.setState((prevState, props) => ({
      clock: new Date(),
      gap: (new Date()) - prevState.clock
    }));

    if (!this.state.paused) {
      if (this.state.startTime) {
        this.setState((prevState, props) => ({
          elapsed: prevState.elapsed + prevState.gap
        }));
      } else {
        this.setState({
          elapsed: 0
        });
      }
    } else {
      this.setState((prevState, props) => ({
        pauseElapse: prevState.pauseElapse + 1000
      }));
    }

    if (this.state.onPomo && this.state.elapsed &&
        this.state.elapsed >= this.POMOTIME) {
      if (!this.state.overtime) {
        this.setState((prevState, props) => ({
          pomos: prevState.pomos + 1,
          overtime: true
        }));
        this.props.notificationHandler('Pomo done!');
      }
    }

    if (!this.state.onPomo && !this.state.overtime) {
      const breakLength = this.longBreak ? this.LONGBREAK : this.BREAKTIME;
      if (this.state.elapsed && this.state.elapsed >= breakLength) {
        this.setState({
          overtime: true
        });
        this.props.notificationHandler('Break done!');
      }
    }
  }

  startPomo() {
    this.setState({
      startTime: new Date(),
      elapsed: 0,
      onPomo: true,
      overtime: false
    });
  }

  startBreak() {
    this.setState((prevState, props) => ({
      totalWork: prevState.totalWork + this.state.elapsed,
      startTime: new Date(),
      onPomo: false,
      paused: false,
      stopped: false,
      overtime: false,
      elapsed: 0,
      pauseElapse: 0,
      longBreak: prevState.pomos % 4 === 0
    }));
  }

  stopPomo() {
    this.setState({
      onPomo: false,
      startTime: null,
      stopped: true,
      paused: false,
      pauseElapse: 0
    });
  }

  pause() {
    this.setState({
      paused: true
    });
  }

  resume() {
    this.setState({
      paused: false
    });
  }

  render() {
    // TODO: refactor most of this into class methods
    let elapsed = this.state.elapsed ? (this.state.elapsed/1000).toFixed(0) : 0;
    let currEvent = 'Pomo';

    let buttonHandler = this.startPomo;
    let buttonClass = 'pomo-starter';
    let buttonText = 'Start a Pomo';
    let buttonDisabled = false;
    let stopDisabled = true;

    let pauseText = this.state.paused ? 'Resume' : 'Pause';
    let pauseHandler = this.state.paused ? this.resume : this.pause;
    let pauseDisabled = true;

    let breakTime = this.state.longBreak ? this.LONGBREAK : this.BREAKTIME;

    if (this.state.onPomo) {
      stopDisabled = false;
      pauseDisabled = false;
      if (this.state.elapsed >= this.POMOTIME) {
        pauseDisabled = true;
        buttonText = 'Start break';
        buttonHandler = this.startBreak;
      } else {
        buttonDisabled = true;
      }
    } else if (!this.state.stopped) {
      stopDisabled = false;
      currEvent = 'break';
      if (this.state.elapsed < breakTime)
        buttonDisabled = true;
    } else {
      pauseDisabled = false;
      stopDisabled = true;
    }

    let timeLeft = (this.POMOTIME / 1000) - elapsed;
    if (currEvent === 'break') {
      if (this.state.longBreak)
        timeLeft = (this.LONGBREAK / 1000) - elapsed;
      else
        timeLeft = (this.BREAKTIME / 1000) - elapsed;
    }

    let minLeft = timeLeft / 60;
    minLeft = this.state.overtime ? Math.ceil(minLeft) : Math.floor(minLeft);
    minLeft = Math.abs(minLeft);
    let secLeft = Math.abs((timeLeft % 60).toFixed(0));
    secLeft = secLeft < 10 ? `0${secLeft}` : `${secLeft}`;

    const currMessage = this.state.overtime ? `Overtime for ${currEvent}` :
      `Time left in ${currEvent}`;

    const timerClass = this.state.overtime ? 'red-text' : '';


    return (
      <div className="Pomodoro">
        <p>{this.state.clock.toLocaleTimeString()}</p>
        <p>{currMessage}: <span className={timerClass}>{minLeft}:{secLeft}</span></p>
        <p>Completed Pomos: {this.state.pomos}</p>

        <button onClick={buttonHandler} className={buttonClass} disabled={buttonDisabled}>
          {buttonText}
        </button>
        <button onClick={pauseHandler} disabled={pauseDisabled}>{pauseText}</button>
        <button onClick={this.stopPomo} disabled={stopDisabled}>Stop</button>
      </div>
    );
  }
}

export default Pomodoro;
