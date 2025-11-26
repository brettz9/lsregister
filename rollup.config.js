export default [{
  input: 'src/index.js',
  external: ['node:child_process', 'mac-defaults'],
  output: {
    file: 'dist/index.cjs',
    format: 'cjs'
  }
}];
