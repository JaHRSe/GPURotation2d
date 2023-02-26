import { animate } from "./matrixRotation";

function MatrixRotationComponent() {
  const heading = document.createElement("h3");
  heading.innerHTML = "Matrix rotation";

  const p = document.createElement("p");
  p.innerText = "JS Handles Matrix Creation";

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

const comp = MatrixRotationComponent();
export { comp as MatrixRotationComponent };
