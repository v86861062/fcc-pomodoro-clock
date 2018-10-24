import React from "react"
import PropTypes from "prop-types"
import "./TimeSetPanel.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function TimeSetPanel(props) {
  const { id, length, lableText, onClick, stateName } = props
  return (
    <div className="time-set-panel">
      <p id={id + "-label"}>{lableText}</p>

      <button
        id={id + "-decrement"}
        onClick={() => onClick(stateName, -1)}
        className="decrement-button"
      >
        <FontAwesomeIcon icon="caret-down" />
      </button>

      <button
        id={id + "-increment"}
        onClick={() => onClick(stateName, 1)}
        className="increment-button"
      >
        <FontAwesomeIcon icon="caret-up" />
      </button>

      <p id={id + "-length"} className="time-length">{length}</p>
    </div>
  )
}

TimeSetPanel.propTypes = {
  id: PropTypes.string,
  lableText: PropTypes.string,
  length: PropTypes.number,
  onClick: PropTypes.func,
  stateName: PropTypes.string
}

export default TimeSetPanel
