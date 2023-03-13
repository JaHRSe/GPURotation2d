import { complex, multiply } from "mathjs";
import { getRandomColor } from "../utils";
import { basicVertexShaderSource } from "../../basicVertexShaderSource";
import { basicFragmentShaderSource } from "../../basicFragmentShaderSource";
import { createProgram, translationMatrix, translation } from "../gpuUtils";
import { EVENTS } from "../enums";
import { flatten } from "mathjs";
import { F2d } from "../F2d";

function complexRotate2d(angleInRadians: number, geometry: Float32Array) {
  let i = 0;
  const rotatedArray: Float32List = [];
  while (i < geometry.length) {
    const x = geometry[i];
    const y = geometry[i + 1];
    //https://betterexplained.com/articles/a-visual-intuitive-guide-to-complex-numbers/
    const result = multiply(
      complex(x, y),
      complex(Math.cos(angleInRadians), -Math.sin(angleInRadians))
    );
    //@ts-ignore typing issue
    rotatedArray.push(result.re);
    //@ts-ignore typing issue
    rotatedArray.push(result.im);
    i = i + 2;
  }
  return new Float32Array(rotatedArray);
}

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

  // GPU Buffer Locations
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const resolutionUniformLocation = gl.getUniformLocation(
    program,
    "u_resolution"
  );
  const colorUniformLocation = gl.getUniformLocation(program, "u_color");
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Geometry Buffer
  const positionBuffer = gl.createBuffer();
  //vertex array - tell GPU how to read data in position buffer
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

  gl.useProgram(program);
  gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
  gl.uniform4fv(colorUniformLocation, color);

  const matrix = flatten(
    translationMatrix(translation[0], translation[1])
  ) as unknown as Float32List;
  gl.uniformMatrix3fv(matrixLocation, false, matrix);
  const drawSceneCall = () =>
    drawScene(gl, angleInRadians, positionBuffer, positionAttributeLocation);
  drawSceneCall();
}

function drawScene(
  gl: WebGL2RenderingContext,
  angleInRadians: number,
  positionBuffer: WebGLBuffer,
  positionAttributeLocation: number
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    complexRotate2d(angleInRadians, F2d),
    gl.STATIC_DRAW
  );
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttributeLocation);
  const size = 2;
  const type = gl.FLOAT;
  const normalize = false;
  const stride = 0;
  const offset1 = 0;
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset1
  );

  // Draw the geometry.
  const primitiveType = gl.TRIANGLES;
  const offset = 0;
  const count = 18;
  gl.drawArrays(primitiveType, offset, count);
}
