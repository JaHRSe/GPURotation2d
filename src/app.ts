import { MatrixRotationComponent } from "./matrixRotation/matrixRotationComponent";
import { GPUMatrixComponent } from "./GPUMatrixRotation/GPUMatrixRotationComponent";
import { ImaginaryRotationComponent } from "./ImaginaryNumRotation/imaginaryRotationComponent";
import { controls } from "./controls";

import "./styles.css";

function tsTester(word: string) {
  return `Word: ` + word;
}

function component() {
  const container = document.createElement("div");
  container.className = "container";
  container.appendChild(MatrixRotationComponent());
  container.appendChild(GPUMatrixComponent());
  container.appendChild(ImaginaryRotationComponent());
  container.appendChild(controls());
  return container;
}

const c = component();
document.body.appendChild(c);
