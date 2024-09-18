// Imp variables
const initialPoints = {x: 0, y: 0}
const movedPoints = {x: 0, y: 0}
const smoothMouse = {x: 0, y: 0}
const cursorVelocity = {x: 0, y: 0}
const lerp = (x, y, a) => x * (1 - a) + y * a;
const randomUrl = gsap.utils.random([
   './images/1.svg',
   './images/2.svg',
   './images/3.svg',
   './images/4.svg',
   './images/5.svg'
], true)



// Calling f(x)
window.addEventListener('mousemove', (event) => handleMouseMove(event))
gsap.ticker.add(() => tick())





// Imp f(x)
function handleMouseMove({x, y}) {
   initialPoints.x = x
   initialPoints.y = y


   const distance = Math.sqrt(
      Math.pow((movedPoints.x - initialPoints.x), 2) +
      Math.pow((movedPoints.y - initialPoints.y), 2)
   )

   if(distance > 70) {
      const img = new Image()
      img.src = randomUrl()
   
      gsap.set(img, {
         height: 50,
         width: 50,
         position: 'absolute',
         top: initialPoints.y,
         left: initialPoints.x,
         xPercent: -50, // x: '-50%'
         yPercent: -50,
         pointerEvents: 'none',
         willChange: 'transform',
      })

      gsap.timeline()
         .from(img, {
            scale: 0,
            duration: 0.1
         })
         .from(img, {
            rotation: -cursorVelocity.x * 0.1,
            x: -cursorVelocity.x,
            y: -cursorVelocity.y,
         }, '<')
         .to(img, {
            scale: 0,
            opacity: 0,
            ease: 'back.in',
            onComplete: () => img.remove()
         }, '-=0.2')
   
      document.body.appendChild(img)
   
   
   
      movedPoints.x = initialPoints.x
      movedPoints.y = initialPoints.y
   }
}

function tick() {
   smoothMouse.x = lerp(smoothMouse.x, initialPoints.x, 0.2)
   smoothMouse.y = lerp(smoothMouse.y, initialPoints.y, 0.2)
   
   cursorVelocity.x = initialPoints.x - smoothMouse.x
   cursorVelocity.y = initialPoints.y - smoothMouse.y
}






/* Under dev */
