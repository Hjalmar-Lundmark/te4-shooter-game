import Game from './Game'

export function setup(canvas) {
  const ctx = canvas.getContext('2d')
  canvas.width = 1200 // was 854
  canvas.height = 600 // was 480

  const game = new Game(
    canvas.width,
    canvas.height,
    canvas.getBoundingClientRect()
  )
  let lastTime = 0

  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)
    // requestAnimationFrame(animate);

    // locks the fps to the set one, if it can reach it
    // without this the game/timers go about twice as fast on 144 fps/Hz because the game is balanced to 60
    // https://stackoverflow.com/questions/19764018/controlling-fps-with-requestanimationframe
    // this adds consistency but feels bad
    let fps = 60
    setTimeout(() => {
    requestAnimationFrame(animate);
  }, 1000 / fps);
  }

  animate(0)
}
