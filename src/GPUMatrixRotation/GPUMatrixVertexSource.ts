export const gpuMatrixVertexSource = `#version 300 es
    in vec2 a_position;
    uniform float u_angleInRadians;
    uniform vec2 u_resolution;
    uniform mat3 u_matrix;

    void main() {
        float c = cos(u_angleInRadians);
        float s = sin(u_angleInRadians);
        mat2 rotMat = mat2(
            c, s,
            -s, c
            );
        vec2 position = a_position * rotMat;
        position = (u_matrix * vec3(position,1)).xy;
        //vec2 position = a_position;
        // convert the position from pixels to 0.0 to 1.0
        vec2 zeroToOne = position / u_resolution;

        // convert from 0->1 to 0->2
        vec2 zeroToTwo = zeroToOne * 2.0;

        // convert from 0->2 to -1->+1 (clipspace)
        vec2 clipSpace = zeroToTwo - 1.0;

        gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    }
`;
