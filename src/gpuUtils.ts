export const translation = [150, 100];

export function createProgram(
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) {
  const vertexShader = createVertexShader(gl, vertexShaderSource);
  const fragmentShader = createFragmentShader(gl, fragmentShaderSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error linking program");
  } else {
    return program;
  }
}

function createVertexShader(
  gl: WebGL2RenderingContext,
  vertexShaderSource: string
) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("Error compiling vertex shader");
    console.log(gl.getShaderInfoLog(vertexShader));
  } else {
    return vertexShader;
  }
}

function createFragmentShader(
  gl: WebGL2RenderingContext,
  fragmentShaderSource: string
) {
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("Error compiling the fragment shader");
    console.log(gl.getShaderInfoLog(fragmentShader));
  } else {
    return fragmentShader;
  }
}

export function rotationMatrix(angleInRadians: number) {
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);
  return [
    [c, -s, 0],
    [s, c, 0],
    [0, 0, 1],
  ];
}

export function translationMatrix(tx: number, ty: number) {
  return [
    [1, 0, 0],
    [0, 1, 0],
    [tx, ty, 1],
  ];
}
