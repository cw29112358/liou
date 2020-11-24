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

1. ```git clone https://github.com/china-english/react-native-boilerplate.git```

2. ```cd react-native-boilerplate```

3. ```npm i``` or ```yarn```

4. ```react-native link```

5. ```npm start && react-native run-ios``` or ```npm start && react-native run-android```

for Android:
1. create android/local.properties file,
2. add ```sdk.dir=/Users/<user_name>/Library/Android/sdk```

for ios
1. update ios/Porfile
2. `pod update`

To run your app on iOS:
   `cd <project_name>`
   `react-native run-ios`
   - or -
   Open ios/GlobalMerchantsUnion.xcodeproj in Xcode
   Hit the Run button

To run your app on Android:
   `cd <project_name>`
   Have an Android emulator running (quickest way to get started), or a device connected
   `react-native run-android`


debugger 工具
-------
本项目使用 [React Native Debugger](https://github.com/jhen0409/react-native-debugger) 进行测试。(工具需要安装)


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

 配置Android环境
 -------

1. 把 my-release-key.keystore 文件放到你工程中的android/app文件夹下
2. 编辑~/.gradle/gradle.properties 文件，新加或修改以下属性
`
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
`

3. 编辑你项目目录下的android/app/build.gradle，添加如下的签名配置：
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...

打包 APK 文件
-------

1. 在项目中运行 `cd android && ./gradlew assembleRelease`
