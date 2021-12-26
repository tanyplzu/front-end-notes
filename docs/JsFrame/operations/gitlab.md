# gitlab

[[toc]]

## .gitlab-ci.yml

### script

任务要执行的shell脚本内容

单行脚本

```yaml
job:
  script: npm install
```

多行脚本

```yaml
job:
  script:
    - npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
    - npm install --registry=http://registry.npm.taobao.org
```

### image

指定一个基础 Docker 镜像作为基础运行环境，经常用到的镜像有 node nginx docker

```yaml
job:
  image: node:latest
  script: npm install
```

### artifacts

```yaml

```

### tags

```yaml

```

### cache

```yaml

```

### stage

```yaml
stages:
  - build
  - test
  - deploy

job 0:
  stage: test
  script: echo 'tets'

job 1:
  stage: build
  script: echo 'build'
```

### when

```yaml

```

### only/except

```yaml
only:
  - master
```

## 例子

### vuepress 中的例子

```yaml
# 选择你要使用的 docker 镜像
image: node:14-buster

pages:
  # 每当 push 到 main 分支时触发部署
  only:
    - main

  # 缓存 node_modules
  cache:
    paths:
      - node_modules/

  # 安装依赖并运行构建脚本
  script:
    - yarn --frozen-lockfile
    - yarn docs:build --dest public

  artifacts:
    paths:
      - public
```

### dumi BranchPipeline.yml

```yaml
version: '1.0'
name: branch-pipeline
displayName: BranchPipeline
stages:
  - stage:
    name: compile
    displayName: 编译
    steps:
      - step: build@nodejs
        name: build_nodejs
        displayName: Nodejs 构建
        # 支持8.16.2、10.17.0、12.16.1、14.16.0、15.12.0五个版本
        nodeVersion: 14.16.0
        # 构建命令：安装依赖 -> 清除上次打包产物残留 -> 执行构建 【请根据项目实际产出进行填写】
        commands:
          - npm install && rm -rf ./dist && npm run build
        # 非必填字段，开启后表示将构建产物暂存，但不会上传到制品库中，7天后自动清除
        artifacts:
          # 构建产物名字，作为产物的唯一标识可向下传递，支持自定义，默认为BUILD_ARTIFACT。在下游可以通过${BUILD_ARTIFACT}方式引用来获取构建物地址
          - name: BUILD_ARTIFACT
            # 构建产物获取路径，是指代码编译完毕之后构建物的所在路径
            path:
              - ./dist
      - step: publish@general_artifacts
        name: publish_general_artifacts
        displayName: 上传制品
        # 上游构建任务定义的产物名，默认BUILD_ARTIFACT
        dependArtifact: BUILD_ARTIFACT
        # 构建产物制品库，默认default，系统默认创建
        artifactRepository: default
        # 上传到制品库时的制品命名，默认build
        artifactName: output
        dependsOn: build_nodejs
  - stage:
    name: release
    displayName: 发布
    steps:
      - step: publish@release_artifacts
        name: publish_release_artifacts
        displayName: '发布'
        # 上游上传制品任务的产出
        dependArtifact: output
        # 发行版制品库，默认release，系统默认创建
        artifactRepository: release
        # 发布制品版本号
        version: '1.0.0.0'
        # 是否开启版本号自增，默认开启
        autoIncrement: true
triggers:
  push:
    branches:
      exclude:
        - master
      include:
        - .*
```
