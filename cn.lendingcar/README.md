react-native-boilerplate
=======

* react => 16.3.1
* react-native => 0.55.4


插件介绍
--------

1. [react => 16.3.1](https://5b05c94e0733d530fd1fafe0--reactjs.netlify.com/docs/hello-world.html)

2. [react-native => 0.55.4](https://facebook.github.io/react-native/docs/0.55/getting-started.html)

3. [native-base => 2.6.1](https://docs.nativebase.io/Components.html#Components)

4. [prop-types => 15.6.2](https://github.com/facebook/prop-types)

5. [react-native-router-flux => 4.0.0-beta.31](https://github.com/aksonov/react-native-router-flux)

6. [redux-saga => 0.16.0](https://redux-saga.js.org/)

7. [redux-immutable => 4.0.0](https://github.com/gajus/redux-immutable)

8. [redux-form => 7.4.2](https://redux-form.com/7.4.2/examples/)

项目结构
--------
 * react-native-boilerplate/
  * android/
  * ios/
  * ...
  * src/
    * components/
      * componentName/
        * index.js
        * index.stories.js
        * styles.js
    * containers/
      * containerName/
        * actions.js
        * constants.js
        * index.js
        * reducer.js
        * sagas.js
        * selectors.js
        * styles.js
    * forms/
      * formFields/
        * formFieldName/
          * index.js
          * index.stories.js
        * constants.js
        * index.js
        * styles.js
      * formName/
        * index.js
        * index.stories.js
        * styles.js
    * translations/
      * en.js
      * zh.js
    * store/
    * actions.js
    * App.js
    * constants.js
    * reducer.js
    * routes.js
    * sagas.js
    * selectors.js
  * storybook
    * ContentView/
    * FooterView/
    * HeaderView/
    * ...


开始使用
-------
<!--
1. ```git clone https://github.com/china-english/react-native-boilerplate.git```

2. ```cd react-native-boilerplate```
-->

1. ```npm i``` or ```yarn```

2. ```react-native link```

3. ```npm start && react-native run-ios``` or ```npm start && react-native run-android```

# Additional step:
## Android:
1. create android/local.properties file

2. add ```sdk.dir=/Users/<user_name>/Library/Android/sdk```

## ios (if installed pod):
1. update ios/Porfile

2. `pod update`

debugger 工具
-------
本项目使用 [React Native Debugger](https://github.com/jhen0409/react-native-debugger) 进行测试。(工具需要安装)


xcode 调试debug
------
1. Product -> Clean
2. Choose a specific simulator, or choose connected real iPhone
3. Product -> Build
4. Product -> Scheme -> Edit Scheme... -> "Run": "Info": "Build Configuration",
for debug version app, choose "Debug",
for release version app, choose "Release".
5. Product -> Run


xcode 打包build，即testflight
------
1. Product -> Clean
2. Choose "Generic iOS Device"
3. Product -> Scheme -> Edit Scheme... -> "Run": "Info": "Build Configuration",
for debug version app, choose "Debug",
for release version app, choose "Release".
4. update version and build
5. Product -> Archive
6. "Distribute App" -> "iOS App Store" -> "Upload" -> "Automatically Manage Signing" -> "Upload"


模版生成器的使用
---------
### container

  1. ```npm run generate```，然后选择 container 选项；

  2. container 分三类：Component, stateless function, pureComponent；

  3. 输入 container 的名字；

  4. container 是否需要链接 route；

  5. 输入 route 的名字；

  6. 是否需要翻译 container；

  7. 是否需要 app 的 header 部分；

  8. 是否需要 app 的 footer 部分；

  9. 是否需要进行数据交互（action、redux...）；

  10. 是否需要 saga；

  > 当 container 不需要链接 route 的时候，5不会执行  
  > 当 container 需要链接 route 的时候，会自动在 route 中添加相关 route

### component

  1. ```npm run generate```，然后选择 component 选项；

  2. component 分三类：Component, stateless function, pureComponent；

  3. 输入 component 的名字；

  4. 是否需要翻译 component；

  5. 是否需要链接 storybook；


### form

  1. ```npm run generate```，然后选择 form 选项；

  2. form 分三类：Component, stateless function, pureComponent；

  3. 输入 form 的名字；

  4. 是否需要翻译 form；

  5. 是否需要链接 storybook；


### formField

  1. ```npm run generate```，然后选择 formField;

  2. 输入 formField 的名字；

  3. 是否需要翻译 formField；

  4. 是否需要链接 storybook；

  > formField 生成时会自动修改相关引入文件，你只需要在 form 文件中修改相应的 formField type 名即可.


storybook 的使用
-------

1. ```npm run storybook```

2. ```react-native run-ios or react-native run-android```

3. 打开 http://localhost:7007/ 就可以测试已有的组件了

> 当你运行 storybook 时，你的应用将无法运行(被 storybook 覆盖)，想要返回应用时，需要停止 ```npm run storybook``` 重新 ```npm start``` 随后刷新你的应用即可  
> 当你使用 native-base 时，存在两个特殊组件（ header 和 container ），已将其单独处理。  
> 当你使用 ```npm run generate``` 生成新的 storybook 时，请 重新跑一次 ```npm run storybook```


相对路径引入文件
-------

已设置的相对路径文件有：

1. apis: "./src/apis",
2. src: "./src",
3. configs: "./src/configs",
4. components: "./src/components",
5. containers: "./src/containers",
6. forms: "./src/forms",
7. formFields: "./src/forms/formFields",
8. utils: "./src/utils",
9. commonColor: "./src/theme/variables/commonColor",
10. platform: "./src/theme/variables/platform",
11. theme: "./src/theme",
12. translations: "./src/translations",
13. storybook: "./storybook",

全局方法
----

 目前暂时有两个：

 1. translate(value: string) 方法（翻译）；
 1. changeLanguage(value: string) 方法（修改语言）；



常见报错
----
# xcode:

## 'RCTAssert.h' file not found
在项目下的Libraries文件夹下，选中RCTAnimation.scodeproj，在Build Settings下修改Search Paths 中 header search paths 的路径为 $(SRCROOT)/…/…/react-native/React

## ../node_modules/native-base/Fonts/FontAwesome5_Brands.ttf: No such file or directory
1. react-native unlink native-base
2. removing font files in Resources folder within xcode
3. react-native link native-base

## ENOENT no such file or directory .babelrc
`./node_modules/react-native/scripts/packager.sh start --reset-cache`

## if app is always on launch screen
1. Product -> Stop
2. delete app in simulator
3. Product -> Clean
4. Run again.

### third-party: 'config.h' file not found
cd node_modules/react-native/third-party/glog-0.3.4
../../scripts/ios-configure-glog.sh

### Xcode10 has error 'Build input file cannot be found':
switch back to the Legacy Build System (File > Project Settings > Workspace Settings > Legacy Build System)
