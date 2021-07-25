import { useRef, useEffect } from 'react'
import { panelWrapper, panelText, rotateInput, rotateBtn} from '../styles/panel.module.css'

function Panel (props) {
  const { file, callback } = props
  const angleRef = useRef()

  useEffect(() => {
    angleRef.current.value = 0
  }, [file])

  const checkInput = (event) => {
    // negative sign (45), decimal separator(46) and [0-9] (48-57) are valid inputs
    if (!(event.charCode === 45 || event.charCode === 46 || (event.charCode >= 48 && event.charCode <= 57))) {
      event.preventDefault()
      event.target.value = ''
    }
  }

  const changeAngle = (event) => {
    event.preventDefault()
    const val = angleRef.current.valueAsNumber
    if (!isNaN(val)) {
      return callback(val)
    } else {
      // should we reset rotation for invalid input?
      angleRef.current.value = 0
      return callback(0)
    }
  }

  return (
  <div className={panelWrapper}>
    <div className={panelText}>File: {file.name}</div>
    <div className={panelText}>Width: {file.width && `${file.width} px`} </div>
    <div className={panelText}>Height: {file.height && `${file.height} px`} </div>
    <div className={panelText}>Rotate:
      <input name="angle"
        type="number"
        className={rotateInput}
        ref={angleRef}
        onKeyPress={checkInput}
      />
      <label htmlFor="angle"
        className={rotateBtn}
        onClick={changeAngle}>Apply
      </label>
    </div>
  </div>
  )
}
export default Panel