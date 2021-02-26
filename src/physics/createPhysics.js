import CANNON from 'cannon'
import { Clock } from 'three'

export default ({ gravity, onUpdate, frameRate } = {}) => {
  const world = new CANNON.World()
  
  // convert gravity to 3-item array
  switch (true){
    case typeof gravity === 'string':
    case typeof gravity === 'number':
      gravity = [0, parseFloat(gravity), 0];
      break;
    case Array.isArray(gravity):
      gravity = gravity.map(val => parseFloat(val));
      break;
    case typeof gravity === 'object':
      gravity = [
        parseFloat(gravity.x), 
        parseFloat(gravity.y), 
        parseFloat(gravity.z)
      ];
      break;
    default:
      gravity = [0, -9.82, 0];
      break;
  }
  // set gravity
  world.gravity.set(...gravity)
  // TODO: watch gravity
  
  // update function
  const clock = new Clock()
  let oldElapsedTime = 0
  const update = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime
    
    world.step(frameRate || (1/60), deltaTime, 3)
  }
  
  return { world, update }
}
