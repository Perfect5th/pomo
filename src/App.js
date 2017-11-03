import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Pomodoro from './Pomodoro';

class App extends Component {

  componentDidMount() {
    Notification.requestPermission();
  }

  fireNotification(title) {
    let notification = new Notification(title, {
      requireInteraction: true
    });
    notification.onclick = () => notification.close();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pomo</h1>
        </header>
        <Pomodoro notificationHandler={this.fireNotification} />
      </div>
    );
  }
}

export default App;
