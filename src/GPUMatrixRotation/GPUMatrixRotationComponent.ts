import { animate } from "./GPUMatrixRotation";

export function GPUMatrixComponent() {
  const heading = document.createElement("h3");
  heading.innerHTML = "GPU Matrix Rotation";

  const p = document.createElement("p");
  p.innerText = "GPU Handles Matrix Calculation";

  const canvas = document.createElement("canvas");
  canvas.width = 300;
  canvas.height = 300;
  const gl = canvas.getContext("webgl2");

  const div = document.createElement("div");
  div.className = "rotationBlock";

  div.appendChild(heading);
  div.appendChild(p);
  div.appendChild(canvas);

  animate(gl);
  return div;
}
