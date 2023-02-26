import { MatrixRotationComponent } from "./matrixRotation/matrixRotationComponent";
import { GPUMatrixComponent } from "./GPUMatrixRotation/GPUMatrixRotationComponent";
import { ImaginaryRotationComponent } from "./ImaginaryNumRotation/ImaginaryRotationComponent";
import { Controls } from "./Controls";

import "./styles.css";

function component() {
  const container = document.createElement("div");
  container.className = "container";
  container.appendChild(MatrixRotationComponent);
  container.appendChild(GPUMatrixComponent);
  container.appendChild(ImaginaryRotationComponent);
  container.appendChild(Controls);
  return container;
}

const c = component();
document.body.appendChild(c);
