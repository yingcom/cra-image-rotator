import { useState, useRef, useEffect } from 'react'
import './styles/app.css'
import Uploader from './components/Uploader'
import Panel from './components/Panel'

function App() {
  const [image, setImage] = useState(null)
  const [file, setFile] = useState({
    name: '',
    width: '',
    height: ''
  })
  const [clock, setClock] = useState(0)
  const canvasRef = useRef()

  useEffect(() => {
    if (image) {
      measure(() => rotate(image, 0))
    }
  }, [image])

  const uploadHandler = (file) => {
    if (file) {
      const reader = new FileReader()
      const img = new Image()
      reader.readAsDataURL(file)
      reader.onload = event => {
        img.src = event.target.result
      }
      img.onload = event => {
        setFile({
          name: file.name,
          width: img.width,
          height: img.height
        })
        setImage(img)
      }
    }
  }

  const angleHandler = (val) => {
    measure(() => rotate(image, val))
  }

  const rotate = (img, angle = 0) => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    const MAX_WIDTH = 960 // 640 * 1.5
    const MAX_HEIGHT = 720 // 480 * 1.5
    const iw = img.width
    const ih = img.height
    const r = Math.sqrt((ih/2)**2 + (iw/2)**2)
    const r2 = r * 2

    const scale = Math.min(1,
      MAX_WIDTH / r2,
      MAX_HEIGHT / r2
    )

    canvas.height = r2 * scale
    canvas.width = r2 * scale

    const ax = Math.cos(angle * Math.PI / 180) * scale
    const ay = Math.sin(angle * Math.PI / 180) * scale

    context.setTransform(1, 0, 0, 1, 0, 0) // reset unit matrix
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.setTransform(ax, ay, -ay, ax, r * scale , r * scale)
    context.drawImage(img, -iw / 2, -ih / 2)
    context.setTransform(1, 0, 0, 1, 0, 0)
  }

  const measure = (func) => {
    const startTime = performance.now()
    func()
    const endTime = performance.now()
    const diff = endTime - startTime
    return setClock(diff)
  }

  return (
    <div className="app">
      <div className="header">Image Rotator</div>
      <div className="container">
        <div className="sidebar">
          <Uploader callback={uploadHandler} />
          <Panel callback={angleHandler} file={file} />
        </div>
      <div className="main">
        <div className="timer">rendered in {clock} ms</div>
        <canvas className="canvas" ref={canvasRef} width={640} height={480}></canvas>
      </div>
      </div>
    </div>
  )
}

export default App
