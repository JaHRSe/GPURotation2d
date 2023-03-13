`**********************************************************************
Uses GPU for cosine and sine calculation to 2D create rotation matrix
***********************************************************************
  `;
import { EVENTS } from "../enums";
import { getRandomColor } from "../utils";
import { createProgram, translationMatrix, translation } from "../gpuUtils";
import { gpuMatrixVertexSource } from "./GPUMatrixVertexSource";
import { basicFragmentShaderSource } from "../../basicFragmentShaderSource";
import { F2d } from "../F2d";
import { flatten } from "mathjs";

export function animate(gl: WebGL2RenderingContext) {
  let angleInRadians = 0;
  const color = getRandomColor();
  const program = createProgram(
    gl,
    gpuMatrixVertexSource,
    basicFragmentShaderSource
  );

  // Buffer Locations
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const colorLocation = gl.getUniformLocation(program, "u_color");
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");
  const angleInRadiansLocation = gl.getUniformLocation(
    program,
    "u_angleInRadians"
  );

  // Load the F's geometry data into a GPU buffer
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, F2d, gl.STATIC_DRAW);

  // Tell the GPU how to read the data
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttributeLocation);
  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  document.addEventListener(EVENTS.CONTROL_WHEEL_ROTATE, (ev) => {
    angleInRadians = (<CustomEvent>ev).detail;
    drawSceneCall();
  });

  const drawSceneCall = () =>
    drawScene(gl, angleInRadians, angleInRadiansLocation, matrixLocation);

  gl.useProgram(program);
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  // Set the color.
  gl.uniform4fv(colorLocation, color);
  drawSceneCall();
}

function drawScene(
  gl: WebGL2RenderingContext,
  angleInRadians: number,
  angleInRadiansLocation: WebGLUniformLocation,
  matrixLocation: WebGLUniformLocation
) {
  gl.uniform1f(angleInRadiansLocation, angleInRadians);
  const matrix = flatten(
    translationMatrix(translation[0], translation[1])
  ) as unknown as Float32List;
  gl.uniformMatrix3fv(matrixLocation, false, matrix);

  // Draw the geometry.
  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 18;
  gl.drawArrays(primitiveType, offset, count);
}
