const lanes = [
  {
    name: "TOP",
    el: document.getElementById("top"),
    timer: document.querySelector("#top .count"),
    green: 5,   
    orange: 2
  },
  {
    name: "RIGHT",
    el: document.getElementById("right"),
    timer: document.querySelector("#right .count"),
    green: 3,
    orange: 5
  },
  {
    name: "BOTTOM",
    el: document.getElementById("bottom"),
    timer: document.querySelector("#bottom .count"),
    green: 10,
    orange: 1
  },
  {
    name: "LEFT",
    el: document.getElementById("left"),
    timer: document.querySelector("#left .count"),
    green: 1,   
    orange: 1
  }
];


let time = 0;
let intervalId = null;


function resetAllLanes() {
  lanes.forEach(lane => {
    lane.el.style.backgroundColor = "red";
    lane.timer.textContent = "Wait";
  });
}


function handleTrafficSignal() {
  // console.log("Traffic signal start");
  if (intervalId) return; 

  intervalId = setInterval(() => {
    time++;

    resetAllLanes(); 

    let totalCycleTime = 0;
    lanes.forEach(lane => {
      totalCycleTime += lane.green + lane.orange;
    });

    let currentTime = time % totalCycleTime;
    let passedTime = 0; 

    for (let i = 0; i < lanes.length; i++) {
      const lane = lanes[i];
      const slotTime = lane.green + lane.orange;

      if (currentTime < slotTime) {

        if (currentTime < lane.green) {
          lane.el.style.backgroundColor = "green";
          lane.timer.textContent = `Green: ${lane.green - currentTime}s`;
        }
        else {
          lane.el.style.backgroundColor = "orange";
          lane.timer.textContent = `Orange: ${slotTime - currentTime}s`;
        }

        let waitTime = slotTime - currentTime;

        for (let j = i + 1; j < lanes.length; j++) {
          const nextLane = lanes[j];
          nextLane.timer.textContent = `Wait: ${waitTime}s`;
          waitTime += nextLane.green + nextLane.orange;
        }

        for (let j = 0; j < i; j++) {
          const prevLane = lanes[j];
          prevLane.timer.textContent = `Wait: ${waitTime}s`;
          waitTime += prevLane.green + prevLane.orange;
        }

        break; 
      }

      currentTime -= slotTime;
      passedTime += slotTime;
    }

  }, 1000);
}

