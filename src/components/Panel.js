import { useRef, useEffect } from 'react'
import { panelWrapper, panelText, rotateInput, rotateBtn} from '../styles/panel.module.css'

function Panel (props) {
  const { file, callback } = props
  const angleRef = useRef()

  useEffect(() => {
    angleRef.current.value = 0
  }, [file])

  const changeAngle = (event) => {
    event.preventDefault()
    const val = parseInt(angleRef.current.value) || 0 // should check for valid number first
    return callback(val)
  }

  return (
  <div className={panelWrapper}>
    <div className={panelText}>File: {file.name}</div>
    <div className={panelText}>Width: {file.width && `${file.width} px`} </div>
    <div className={panelText}>Height: {file.height && `${file.height} px`} </div>
    <div className={panelText}>Rotate:
      <input type="number"
        name="angle"
        className={rotateInput}
        ref={angleRef} />
      <label htmlFor="angle"
        className={rotateBtn}
        onClick={changeAngle}>Apply
      </label>
    </div>
  </div>
  )
}
export default Panel