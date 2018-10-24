import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function TimeSetPanel(props) {
  const { id, length, lableText, onClick, stateName } = props
  return (
    <div>
      <p id={id + "-label"}>{lableText}</p>

      <button id={id + "-decrement"} onClick={() => onClick(stateName, -1)}>
        <FontAwesomeIcon icon="caret-down" />
      </button>

      <button id={id + "-increment"} onClick={() => onClick(stateName, 1)}>
        <FontAwesomeIcon icon="caret-up" />
      </button>

      <p id={id + "-length"}>{length}</p>
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
