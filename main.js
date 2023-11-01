import './node_modules/modern-css-reset/dist/reset.min.css'
import './src/assets/css/style.css'
import { setup } from './src/setup.js'

document.querySelector('#app').innerHTML = `
  <canvas id="canvas1"></canvas>
  <footer>
    <p>WASD or arrowkeys to move, mouse to aim, left mouse button or space to shoot, R to reload your weapon <br>
    Game created by <a href="https://github.com/Hjalmar-Lundmark">Hjalmar Lundmark</a> | <a href="https://github.com/Hjalmar-Lundmark/te4-shooter-game">Source code</a>
    </p>
  </footer>
`

setup(document.querySelector('#canvas1'))
