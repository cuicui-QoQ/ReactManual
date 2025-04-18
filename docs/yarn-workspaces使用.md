给工作区根目录安装开发依赖
yarn add <package> -D -W
比如：yarn add jest -D -W

给指定工作区安装依赖
yarn workspace <workspace-name> add <package>
比如：yarn workspace lg-button add lodash@4

给所有工作区安装依赖
yarn install

运行某个项目则直接在packages 目录下去 yarn dev 即可
