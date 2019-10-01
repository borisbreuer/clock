/* 
1° × π / 180
360 / 12 = 30
360 / 60 = 6

x-Koordinate = cos(i*winkel)*radius
y-Koordinate = sin(i*winkel)*radius
*/
(function () {
  const elements = 12;
  let x = document.body.offsetWidth / 2;
  let y = document.body.offsetHeight / 2;
  /* Math.PI / 6 */
  for (let i = 0; i < elements; i++) {
    let ranAngle = 30 * Math.PI / 180;
    let pointX = Math.cos ((i - 3) * ranAngle) * 200;
    let pointY = Math.sin ((i - 3) * ranAngle) * 200;

    let point = document.createElement ('div');
    point.className = 'point';
    point.style.left = x + pointX + 'px';
    point.style.top = y + pointY + 'px';
    document.body.appendChild (point);

    let pointX2 = Math.cos ((i - 3) * ranAngle) * 250;
    let pointY2 = Math.sin ((i - 3) * ranAngle) * 250;

    let count = document.createElement ('div');
    count.className = 'count';
    count.style.left = x + pointX2 + 'px';
    count.style.top = y + pointY2 + 'px';

    count.textContent = i == 0 ? 12 : i;
    document.body.appendChild (count);
  }

  let ms = document.createElement ('div');
  ms.className = 'msPointer';
  ms.style.left = x + 'px';
  ms.style.top = y + 'px';

  let s = document.createElement ('div');
  s.className = 'sPointer';
  s.style.left = x + 'px';
  s.style.top = y + 'px';

  let h = document.createElement ('div');
  h.className = 'hPointer';
  h.style.left = x + 'px';
  h.style.top = y + 'px';

  let m = document.createElement ('div');
  m.className = 'mPointer';
  m.style.left = x + 'px';
  m.style.top = y + 'px';
  let time, msec, sec, min, hou, sDeg, mDeg, hDeg;

  function timer () {
    time = new Date ();
    msec = time.getMilliseconds ();
    sec = time.getSeconds ();
    min = time.getMinutes ();
    hou = time.getHours ();

    msDeg = msec * 360 / 1000 - 90;
    sDeg = sec * 360 / 60 - 90;
    mDeg = min * 360 / 60 - 90;
    hDeg = hou * 360 / 12 - 90;

    ms.style.transform = 'translate(-50%, -50%) rotate(' + msDeg + 'deg)  ';
    s.style.transform = 'translate(-50%, -50%) rotate(' + sDeg + 'deg)  ';
    h.style.transform = 'translate(-50%, -50%) rotate(' + hDeg + 'deg)  ';
    m.style.transform = 'translate(-50%, -50%) rotate(' + mDeg + 'deg)  ';

    window.requestAnimationFrame (timer);
  }
  document.body.appendChild (ms);
  document.body.appendChild (s);
  document.body.appendChild (h);
  document.body.appendChild (m);

  timer ();
}) ();
