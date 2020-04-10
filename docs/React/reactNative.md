# ReactNative

不能连接到服务：

- [could not connect to development server on android](https://stackoverflow.com/questions/42064283/react-nativecould-not-connect-to-development-server-on-android)

- https://github.com/facebook/react-native/issues/15388

### RN 运行机制

- https://www.cnblogs.com/guyuehuanhuan/p/6847979.html
- https://www.jianshu.com/p/82a28c8b673b

## RN 之于原生

react-native本质上相当于android的一个Activity,ios的一个UIView

## RN 之于 web

使用flex布局,没有class,id的概念,样式全靠style

## 启动项目

首次启动需要下载 gradle 这个过程可能会很漫长

解决方案

1. 参照的启动过程,将下载好的 zip 放到指定位置
2. 修改项目下载 gradle 的地址./android/gradle/wrapper/gradle-wrapper.properties

gradle 依赖库导致 build 慢
./android/build.gradle

```js
repositories {
    google()//必须使用，否则会报一堆错误
    maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }//阿里备用源,下载更新快
}
```

版本 59 启动报 500

重启 server

## 开发辅助-开发选项

```shell
# 启动方式
ios: Cmd+R to reload,Cmd+D or shake for dev menu
android:  Double tap R on your keyboard to reload,Shake or press menu button for dev menu
# 命令行:
adb shell input keyevent 82(WIN android可用,其他待验证)
# 开发菜单
Reload
Debug JS Remotely
Enable Live Reload
Enable Hot Reloading
Toggle Inspector
Show Perf Monotor
Start/Stop Sampling Profiler
Dev Setting
```

[React Native Live Reload 和 Hot Reloading 的区别](https://www.jianshu.com/p/671803a83439)
