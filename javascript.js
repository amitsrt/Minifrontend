var timeout;
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
function mouseSqueezer() {
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
        
 document.querySelector("#smallcircle").style.opacity = 1; 
        // Speed calculate karna
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
        xscale = gsap.utils.clamp(0.8, 1.2, xdiff / 10); 
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff / 10);

        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollower(dets.clientX, dets.clientY, xscale, yscale);
        timeout = setTimeout(function () {
            document.querySelector("#smallcircle").style.transform = 
            `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100);
    });
}

function circleMouseFollower(x, y, xscale, yscale) {
    document.querySelector("#smallcircle").style.transform = 
    `translate(${x}px, ${y}px) scale(${xscale}, ${yscale})`;
}
function anime() {
  var tl = gsap.timeline();

   tl.from("#nav", {
    y: '-100%', 
    opacity:0,        
    ease: "expo.inOut",  
    duration: 2,  
  })
  tl.to(".boundingelem", {
    y: 0,          
    ease: "expo.inOut",  
    duration: 2,         
    stagger: 0.5        
  },"<");
}
window.addEventListener("load", function() {
anime();
});
mouseSqueezer();
document.addEventListener("mouseleave", function () {
    document.querySelector("#smallcircle").style.opacity = 0;
});
setInterval(() => {
  document.querySelector("#realtime").innerHTML = new Date().toLocaleTimeString();
}, 1000);

document.querySelectorAll(".elem").forEach(function (elem) {

  const img = elem.querySelector("img");

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let prevX = 0;
  let rotate = 0;
  let isHover = false;

  const setX = gsap.quickSetter(img, "left", "px");
  const setY = gsap.quickSetter(img, "top", "px");
  const setR = gsap.quickSetter(img, "rotate", "deg");

  function animate() {
    if (!isHover) return;

    currentX += (mouseX - currentX) * 0.7;
    currentY += (mouseY - currentY) * 0.7;

    setX(currentX);
    setY(currentY);
    setR(rotate);

    requestAnimationFrame(animate);
  }

  elem.addEventListener("mouseenter", () => {
    isHover = true;
    img.style.display = "block";

    gsap.to(img, {
      opacity: 1,
      duration: 0.3,
      ease: "power3.out"
    });

    requestAnimationFrame(animate);
  });

  elem.addEventListener("mouseleave", () => {
    isHover = false;

    gsap.to(img, {
      opacity: 0,
      rotate: 0,
      duration: 0.3,
      onComplete: () => img.style.display = "none"
    });
  });

  elem.addEventListener("mousemove", (e) => {
    const rect = elem.getBoundingClientRect();

    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    const diff = e.clientX - prevX;
    prevX = e.clientX;

    rotate = gsap.utils.clamp(-12, 12, diff * 0.3);
  });
  if (window.innerWidth < 768) {
  document.querySelector("#smallcircle").style.display = "none";
}
});
