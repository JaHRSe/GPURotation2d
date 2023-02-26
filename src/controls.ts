import { EVENTS } from "./enums";
import { pubSub } from "../pubSub";

const rotateClick = (inputRef: HTMLInputElement) => {
  pubSub.publish(EVENTS.ROTATECLICK2D, inputRef.value);
  inputRef.value = "";
};

function angleInput() {
  const angleInput = document.createElement("input");
  angleInput.name = "angleIput";
  angleInput.id = "angleInput";
  angleInput.className = "angleInput";
  return angleInput;
}

function angleButton(inputRef: HTMLInputElement) {
  const ab = document.createElement("button");
  ab.innerText = "Enter";
  ab.onclick = (_event) => {
    rotateClick(inputRef);
  };
  return ab;
}

function controls() {
  const controlDiv = document.createElement("div");
  const label = document.createElement("label");
  label.innerText = "Rotation Angle:";
  label.htmlFor = "angleInput";
  controlDiv.className = "controls";
  const ai = angleInput();
  const ab = angleButton(ai);
  controlDiv.appendChild(label);
  controlDiv.appendChild(ai);
  controlDiv.appendChild(ab);
  return controlDiv;
}

const comp = controls();
export { comp as Controls };
