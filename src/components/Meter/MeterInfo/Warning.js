import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { MinuteDaysThanNow } from 'helper/helper'
import { Alert } from 'antd';
import styled from 'styled-components'

function Warning({ lastItem }) {
  const timeCurrent = useRef(null)
  timeCurrent.current = lastItem ? lastItem.time : new Date()
  const [isWarning, setIsWarning] = useState(false)
  const [isDanger, setIsDanger] = useState(false)
  const [danger, setDanger] = useState("")
  useEffect(() => {
    const intervalId = setInterval(() => {
      check()
    }, 1000);
    return () => clearInterval(intervalId);
  }, [])

  useEffect(() => {
    if (lastItem && (lastItem.a > 75 || lastItem.v > 242 || lastItem.v < 176)) {
      setIsDanger(true)
      let textDanger = ""
      if (lastItem.a > 75) {
        if (textDanger == "") { textDanger += "Over current hazard" }
        else {
          textDanger += ", Over current hazard"
        }
      }
      if (lastItem.v > 242) {
        if (textDanger == "") { textDanger += "Voltage high" } else {
          textDanger += ", Voltage high"
        }
      }
      if (lastItem.v < 176) {
        if (textDanger == "") {textDanger += "Voltage low"}  else {
          textDanger += ", Voltage low"
        }
      }
      setDanger(textDanger)
    } else {
      setIsDanger(false)
    }
  }, [lastItem])

  const check = () => {
    if (MinuteDaysThanNow(timeCurrent.current, 5)) {
      setIsWarning(true)
    } else {
      setIsWarning(false)
    }
  }
  return (
    <WarningText>

      {
        isWarning && <Alert message="Error" description="Data collection meter or disconnect" type="error" />
      }

      {
        isDanger && <Alert style={{ margin: "10px 0" }} message="Warning" description={danger} type="warning" />
      }
    </WarningText>
  )
}

Warning.propTypes = {

}
const WarningText = styled.div`
  width:50%;
  margin:auto;
  text-align: center;
`

export default Warning

