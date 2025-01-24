import './style.css'
import { Tribunal } from './tribunal';

function scaleApp() {
  let appWidth = 1920;
  let appHeight = 1080;
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let scale = Math.min(windowWidth / appWidth, windowHeight / appHeight);
  
  const container = document.querySelector('.scaling-container') as HTMLElement;
  container!.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener('resize', scaleApp);
window.addEventListener('load', scaleApp);

new Tribunal();