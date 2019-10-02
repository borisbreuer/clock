/*
1° × π / 180
360 / 12 = 30
360 / 60 = 6
Math.PI / 6
x - Koordinate = cos(i * winkel) * radius
y - Koordinate = sin(i * winkel) * radius
  */

(function () {
  const elements = 12;
  const root = document.querySelector('#clock')

  let x = root.offsetWidth / 2;
  let y = root.offsetHeight / 2;

  for (let i = 0; i < elements; i++) {
    let ranAngle = 30 * Math.PI / 180;
    let pointX = Math.cos((i - 3) * ranAngle) * 225;
    let pointY = Math.sin((i - 3) * ranAngle) * 225;

    let point = document.createElement('div');
    point.className = 'point';
    point.style.left = x + pointX + 'px';
    point.style.top = y + pointY + 'px';
    root.appendChild(point);

    let pointX2 = Math.cos((i - 3) * ranAngle) * 250;
    let pointY2 = Math.sin((i - 3) * ranAngle) * 250;

    let count = document.createElement('div');
    count.className = 'count';
    count.style.left = x + pointX2 + 'px';
    count.style.top = y + pointY2 + 'px';

    count.textContent = i == 0 ? 12 : i;
    root.appendChild(count);
  }

  let ms = document.createElement('div');
  ms.className = 'msPointer';
  ms.style.left = x + 'px';
  ms.style.top = y + 'px';

  let s = document.createElement('div');
  s.className = 'sPointer';
  s.style.left = x + 'px';
  s.style.top = y + 'px';

  let h = document.createElement('div');
  h.className = 'hPointer';
  h.style.left = x + 'px';
  h.style.top = y + 'px';

  let m = document.createElement('div');
  m.className = 'mPointer';
  m.style.left = x + 'px';
  m.style.top = y + 'px';

  let mid = document.createElement('div');
  mid.className = 'middle';
  mid.style.left = x + 'px';
  mid.style.top = y + 'px';

  root.appendChild(ms);
  root.appendChild(s);
  root.appendChild(h);
  root.appendChild(m);
  root.appendChild(mid);

  let time, msec, sec, min, hou, now, sDeg, mDeg, hDeg;
  let msecSec = 0;
  function timer() {
    time = new Date();
    msec = time.getMilliseconds();
    sec = time.getSeconds();
    min = time.getMinutes();
    hou = time.getHours();
    now = Date.now();
    // sec = 20;
    // min = 15;
    // hou = 9;



    msDeg = (msec / 1000) * 360;
    // sDeg = sec * 360 / 60;
    sDeg = ((msec / 1000) + sec) / 60 * 360;
    mDeg = ((sec / 60) + (min + (msec / 1000) / 60)) / 60 * 360;
    hDeg = ((min / 60) + (hou + (min / 60) / 12)) / 12 * 360;

    ms.style.transform = 'translate(-50%, -50%) rotate(' + (msDeg - 90) + 'deg)';
    s.style.transform = 'translate(-50%, -50%) rotate(' + (sDeg - 90) + 'deg)';
    h.style.transform = 'translate(-50%, -50%) rotate(' + (hDeg - 90) + 'deg)';
    m.style.transform = 'translate(-50%, -50%) rotate(' + (mDeg - 90) + 'deg)';

    // document.querySelector('#timer').value = hou + ':' + min + ':' + sec
    // document.querySelector('#timer').value = ((hou / 60) / 60) / 1000
    window.requestAnimationFrame(timer);
  }
  timer();
  // setInterval(timer, 1)
})();
