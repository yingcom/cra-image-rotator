// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">Image Rotator</div>
      <div className="container">
      <div className="sidebar">
        <div className="upload-area">
          <div className="upload-btn">Upload Image</div>
        </div>
        <div className="file-area">
          <div className="file-text">File: </div>
          <div className="file-text">Width: </div>
          <div className="file-text">Height: </div>
          <div className="file-text">Rotate:
            <input type="number" className="rotate-input"></input>
            <span className="rotate-btn">Apply</span>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="timer">rendered in 3.562ms</div>
        <canvas className="canvas-area"></canvas>
      </div>
      </div>
    </div>
  );
}

export default App;
