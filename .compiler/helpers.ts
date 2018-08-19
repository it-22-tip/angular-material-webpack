import path from 'path';
let _root = path.resolve(__dirname, '..');

const rootPath = function (args :string) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

export default { rootPath }
