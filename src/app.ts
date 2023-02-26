import { MatrixRotationComponent } from "./matrixRotation/matrixRotationComponent";
import { GPUMatrixComponent } from "./GPUMatrixRotation/GPUMatrixRotationComponent";
import { complexRotationComponent } from "./complexNumRotation/complexRotationComponent";
import { Controls } from "./Controls";

import "./styles.css";

function component() {
  const container = document.createElement("div");
  container.className = "container";
  container.appendChild(MatrixRotationComponent);
  container.appendChild(GPUMatrixComponent);
  container.appendChild(complexRotationComponent);
  container.appendChild(Controls);
  return container;
}

const c = component();
document.body.appendChild(c);
