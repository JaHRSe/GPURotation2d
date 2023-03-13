import { ControlWheel } from "radial-control";

function controls() {
  const controlDiv = document.createElement("div");
  const radialControl = ControlWheel({
    radius: 50,
    padding: 10,
    circleThick: 5,
    backGroundColor: "white",
    continuous: true,
  });
  controlDiv.appendChild(radialControl);
  return controlDiv;
}

const comp = controls();
export { comp as Controls };
