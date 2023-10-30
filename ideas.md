# My ideas

## Ideas
1. Startbutton with weapon-select
2. Different weapons, shotgun, smg with spread and high firerate, sniper with high accuracy, low firerate and high damage, rifle with medium firerate and damage, melee(???)
2. Different kinds of enemies. Ranged, tank, etc
3. Waves with increasing numbers of enemies? 
4. Explosives?
5. Reload instead of ammo regen

## Bugs / todo
1. Pierce weapons doing to much damage
4. Low ammo warning?
5. Bar or symbols for health, ammo and such
6. Screen goes red when hit?
8. Skins, icons, graphics
9. Change enemy spawnpoints
9. Fix firerate on single fire weapons

## Notable thoughts

### Problem with different Hz monitors
Most of the game was balanced around 60Hz because that was what I was using when coding the game, as timers, projectile-speed and such was based on ```deltaTime```, which is the time between frames. 
But then I ran into a problem when trying/coding the game on my 144 hz monitor at home and that was that neither the player or the enemies went with that logic, instead they got faster on higher refresh rates, effectively making those parts of the game more than two times faster, while still having reload and such on the same ~two second timer. That made the game a lot harder than it was supposed to be. 

Firsit I tried locking the frames to 60 using this code in setup.js: 
```js
let fps = 60
setTimeout(() => {
    requestAnimationFrame(animate);
}, 1000 / fps);
```
Which kinda worked but had issues. One part of why I didn't go with this was that it wasn't identical to setting your refresh rate to 60 hz, the movement speed just wasn't the same as what I had balanced it to. Also if your computer couldn't react that desired fps it would lag really weirdly. That code is located in the branch [LockFrames](https://github.com/Hjalmar-Lundmark/te4-shooter-game/tree/LockFrames). 

My second solution was to change player and enemy speed calculations to how it's written in projectile, with ``deltaTime`` in mind. By including that in the calculations I can make sure that everything moves the same length even if it moves at different intervals on different screens. 
This also means that I have more consistency and better readability when all movement variables use the same formula and sizing. 