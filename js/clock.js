


/*
1° × π / 180
360 / 12 = 30
360 / 60 = 6
Math.PI / 6
x - Koordinate = cos(i * winkel) * radius
y - Koordinate = sin(i * winkel) * radius
  */


(function () {
  "use strict"

  const root = document.querySelector('#clock')
  const clockX = root.offsetWidth / 2;
  const clockY = root.offsetHeight / 2;

  const CircleCoords = function (degAngle, radius, index) {
    this.radAngle = degAngle * Math.PI / 180;
    this.X = Math.cos(index * this.radAngle) * radius;
    this.Y = Math.sin(index * this.radAngle) * radius;
    return { X: this.X, Y: this.Y }
  }

  const ClockPointer = function (element, className, x, y) {
    this.obj = document.createElement(element);
    this.obj.className = className;
    this.obj.style.left = x + 'px';
    this.obj.style.top = y + 'px';
    return this.obj;
  }

  let
    hours,
    hoursText,
    minutes,
    hoursCoords,
    hoursTextCoords,
    minutesCoords,
    time, msec, sec, min, hou,
    msDeg, sDeg, mDeg, hDeg,
    continousOrNot = false,
    count = 0;

  root.addEventListener('mouseenter', function () {
    continousOrNot = true;
  })
  root.addEventListener('mouseleave', function () {
    continousOrNot = false;
  })


  for (let i = 0; i < 60; i++) {
    if (!(i % 5)) {
      hoursCoords = new CircleCoords(360 / 12, 250, count - 3);
      hoursTextCoords = new CircleCoords(360 / 12, 225, count - 3);

      hours = document.createElement('div');
      hours.className = count % 3 ? 'hoursPoint' : 'hoursPointBig';
      hours.style.left = clockX + hoursCoords.X + 'px';
      hours.style.top = clockY + hoursCoords.Y + 'px';
      root.appendChild(hours);

      hoursText = document.createElement('div');
      hoursText.className = 'hoursText';
      hoursText.style.left = clockX + hoursTextCoords.X + 'px';
      hoursText.style.top = clockY + hoursTextCoords.Y + 'px';
      hoursText.textContent = count == 0 ? 12 : count;
      root.appendChild(hoursText);

      count++;
    }

    if (i % 5) {
      minutesCoords = new CircleCoords(360 / 60, 250, i);
      minutes = document.createElement('div');
      minutes.className = 'minutes';
      minutes.style.left = clockX + minutesCoords.X + 'px';
      minutes.style.top = clockY + minutesCoords.Y + 'px';
      root.appendChild(minutes);
    }
  }

  let ms = new ClockPointer('div', 'msPointer', clockX, clockY)
  let s = new ClockPointer('div', 'sPointer', clockX, clockY)
  let m = new ClockPointer('div', 'mPointer', clockX, clockY)
  let h = new ClockPointer('div', 'hPointer', clockX, clockY)
  let mid = new ClockPointer('div', 'middle', clockX, clockY)
  let msdot = new ClockPointer('div', 'msDot', clockX, clockY)

  root.appendChild(ms)
  root.appendChild(s);
  root.appendChild(h);
  root.appendChild(m);
  root.appendChild(mid);
  root.appendChild(msdot);



  function timer() {
    time = new Date();
    msec = time.getMilliseconds();
    sec = time.getSeconds();
    min = time.getMinutes();
    hou = time.getHours();

    // msec = 0;
    // sec = 30;
    // min = 59;
    // hou = 5;

    if (continousOrNot) {
      msDeg = (msec / 1000) * 360;
      sDeg = ((msec / 1000) + sec) / 60 * 360;
      mDeg = ((sec / 60) + (min + (msec / 1000) / 60)) / 60 * 360;
      hDeg = ((min / 60) + (hou + (min / 60) / 60)) / 12 * 360;
    } else {
      msDeg = msec / 1000 * 360;
      sDeg = sec / 60 * 360;
      mDeg = min / 60 * 360;
      hDeg = hou / 12 * 360;
    }

    ms.style.transform = 'translate(-50%, -50%) rotate(' + (msDeg - 90) + 'deg)';
    s.style.transform = 'translate(-50%, -50%) rotate(' + (sDeg - 90) + 'deg)';
    h.style.transform = 'translate(-50%, -50%) rotate(' + (hDeg - 90) + 'deg)';
    m.style.transform = 'translate(-50%, -50%) rotate(' + (mDeg - 90) + 'deg)';

    let sdotCoords = new CircleCoords(-sDeg + 180, 143.75, 1);

    ms.style.top = clockX + sdotCoords.X + 'px';
    ms.style.left = clockY + sdotCoords.Y + 'px';

    window.requestAnimationFrame(timer);
  }
  timer();
})();
