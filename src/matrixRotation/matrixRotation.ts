import { F2d } from "../F2d";
import { getRandomColor } from "../utils";
import { createProgram } from "../gpuUtils";
import { basicFragmentShaderSource } from "../../basicFragmentShaderSource";
import { basicVertexShaderSource } from "../../basicVertexShaderSource";
import { EVENTS } from "../enums";
import { multiply, flatten } from "mathjs";
import { rotationMatrix, translationMatrix, translation } from "../gpuUtils";

export function animate(gl: WebGL2RenderingContext) {
  document.addEventListener(EVENTS.CONTROL_WHEEL_ROTATE, (ev) => {
    angleInRadians = (<CustomEvent>ev).detail;
    drawSceneCall();
  });

  let angleInRadians = 0;
  const color = getRandomColor();
  const program = createProgram(
    gl,
    basicVertexShaderSource,
    basicFragmentShaderSource
  );
  // GPU Buffer locations
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const colorLocation = gl.getUniformLocation(program, "u_color");
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // load geometry into ARRAY_BUFFER
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, F2d, gl.STATIC_DRAW);

  // vertex array to inform GPU how to read data
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

  const drawSceneCall = () => drawScene(gl, angleInRadians, matrixLocation);

  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.useProgram(program);
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

  gl.uniform4fv(colorLocation, color);
  drawSceneCall();
}

function drawScene(
  gl: WebGL2RenderingContext,
  angleInRadians: number,
  matrixLocation: WebGLUniformLocation
) {
  const matrix = multiply(
    rotationMatrix(angleInRadians),
    translationMatrix(translation[0], translation[1])
  );

  gl.uniformMatrix3fv(
    matrixLocation,
    false,
    flatten(matrix) as unknown as Float32List
  );

  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 18;
  gl.drawArrays(primitiveType, offset, count);
}
