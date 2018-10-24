import React, { Component } from "react"
import "./App.scss"
import TimeSetPanel from "./TimeSetPanel"

import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretUp,
  faCaretDown,
  faPlay,
  faPause,
  faUndoAlt
} from "@fortawesome/free-solid-svg-icons"

library.add(faCaretUp, faCaretDown, faPlay, faPause, faUndoAlt)

const defaultSeate = {
  breakLength: 5,
  sessionLength: 25,
  timerCount: 25 * 60 /* 1 = 1秒 */,
  timerState: "Session",
  timer: null
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = defaultSeate
    this.beep = React.createRef()
  }

  ticking = () => {
    this.countingDown()

    if (this.state.timerCount === 0) {
      this.changeTimerState()
    }
  }

  /* 1500 => { minute: "25", second: "00"} */
  getMinuteSecond = timerCount => {
    const min = Math.floor(timerCount / 60)
    const sec = timerCount % 60

    /* 0~9 => '00'~'09' */
    function pad(n) {
      return n < 10 ? "0" + n : String(n)
    }
    return { minute: pad(min), second: pad(sec) }
  }

  handleStartStop = () => {
    this.state.timer === null ? this.startTimer() : this.clearTimer()
  }

  startTimer = () => {
    this.setState({ timer: setInterval(this.ticking, 1000) })
  }
  clearTimer = () => {
    if (this.state.timer) {
      clearInterval(this.state.timer)
      this.setState({ timer: null })
    }
  }

  handleLength = (stateName, value) => {
    if (this.state.timer !== null) return

    this.setState(pervState => {
      let result = pervState[stateName] + value
      if (result < 1) result = 1
      else if (result > 60) result = 60

      return { [stateName]: result }
    })

    this.setState(pervState => {
      return { timerCount: pervState.sessionLength * 60 }
    })
  }

  handleReset = () => {
    this.clearTimer()
    this.setState(defaultSeate)
    this.stopBeepSound()
  }

  playBeepSound = () => {
    this.beep.current.play()
    setTimeout(this.stopBeepSound, 3000)
  }
  stopBeepSound = () => {
    this.beep.current.pause()
    this.beep.current.currentTime = 0 /* For FCC test #Audio 3. */
  }

  countingDown = () => {
    this.setState(pervState => {
      return {
        timerCount: pervState.timerCount !== 0 ? pervState.timerCount - 1 : 0
      }
    })
  }

  changeTimerState = () => {
    this.playBeepSound()
    this.setState(pervState => {
      return {
        timerState: pervState.timerState === "Session" ? "Break" : "Session",
        timerCount:
          pervState.timerState === "Session"
            ? pervState.sessionLength * 60
            : pervState.breakLength * 60
      }
    })
  }

  render() {
    const {
      timerCount,
      breakLength,
      sessionLength,
      timerState,
      timer
    } = this.state
    const { minute, second } = this.getMinuteSecond(timerCount)
    const isRunning = timer ? true : false
    console.log(timer)
    return (
      <div className="app">
        <div className="right-panel">
          <TimeSetPanel
            id="break"
            lableText="Break Length"
            length={breakLength}
            onClick={this.handleLength}
            stateName="breakLength"
          />
        </div>

        <div className="left-panel">
          <TimeSetPanel
            id="session"
            lableText="Session Length"
            length={sessionLength}
            onClick={this.handleLength}
            stateName="sessionLength"
          />
        </div>

        <div className="timer">
          <p id="timer-label">{timerState}</p>
          <p id="time-left">{minute + ":" + second}</p>
          <button id="start_stop" onClick={this.handleStartStop}>
            {isRunning ? (
              <FontAwesomeIcon icon="pause" />
            ) : (
              <FontAwesomeIcon icon="play" />
            )}
          </button>
          <button id="reset" onClick={this.handleReset}>
            <FontAwesomeIcon icon="undo-alt" />
          </button>

          <div className="triangle"></div>
        </div>
        
        <audio id="beep" src="./BeepSound.wav" preload="true" ref={this.beep} />
      </div>
    )
  }
}

export default App
