import { useRef } from 'react'
import { uploadWrapper, uploadBtn, uploadInput } from '../styles/uploader.module.css'

function Uploader (props) {
  const { callback } = props
  const fileInputRef = useRef()

  const click = (event) => {
    event.preventDefault()
    fileInputRef.current.click()
  }

  const changeFile = (event) => {
    const file = event.target.files[0]
    if (file && file.type.substr(0, 5) === "image") {
      return callback(file)
    }
  }

  return (
    <div className={uploadWrapper}>
      <label htmlFor="sourceFile" className={uploadBtn} onClick={click}>Upload Image</label>
      <input type="file" name="sourceFile" id={uploadInput}
        ref={fileInputRef}
        onChange={changeFile} />
    </div>
  )
}

export default Uploader