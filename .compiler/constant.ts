import path from 'path'
// import PackageJSON from '../package.json';

// const { dependencies, devDependencies } = PackageJSON
const RootPath = path.join(__dirname, '..');
const SrcPath = path.join(RootPath, 'src');
const CompilerPath = path.join(RootPath, '.compiler');
const NodeModulesPath = path.join(RootPath, 'node_modules');
const StaticPath = path.join(RootPath, 'static');
const DistPath = path.join(RootPath, 'dist');
const RendererPath = path.join(SrcPath, 'renderer');
const SharedPath = path.join(SrcPath, 'shared');
const MainPath = path.join(SrcPath, 'main');
const ServerPath = path.join(SrcPath, 'server');
const RendererTemplatePath = path.join(RendererPath, 'index.ejs');
const RendererEntry = path.join(RendererPath, 'RendererEntry.js');
const MainEntry = path.join(MainPath, 'MainEntry.js');
const OutputPath = path.join(DistPath, 'electron');

export {
  // PackageJSON,
  // dependencies,
  // devDependencies,
  RootPath,
  SrcPath,
  RendererTemplatePath,
  CompilerPath,
  NodeModulesPath,
  StaticPath,
  RendererPath,
  SharedPath,
  RendererEntry,
  MainPath,
  MainEntry,
  DistPath,
  OutputPath,
  ServerPath
}
