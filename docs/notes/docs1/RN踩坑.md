# RN 运行机制

    https://www.cnblogs.com/guyuehuanhuan/p/6847979.html
    https://www.jianshu.com/p/82a28c8b673b

## RN 之于原生

    react-native 本质上相当于 android 的一个 Activity,ios 的一个 UIView

## RN 之于 web

    使用 flex 布局，没有 class,id 的概念，样式全靠 style

## 环境搭建

参考[React Native中文网](https://reactnative.cn/docs/getting-started.html)

## 启动项目

首次启动需要下载 gradle 这个过程可能会很漫长

    Downloading https://services.gradle.org/distributions/gradle-4.10.2-all.zip
    Unzipping C:\Users\Administrator\.gradle\wrapper\dists\gradle-4.10.2-all\9fahxiiecdb76a5g3aw9oi8rv\gradle-4.10.2-all.zip to C:\Users\Administrator\.gradle\wrapper\dists\gradle-4.10.2-all\9fahxiiecdb76a5g3aw9oi8rv

解决方案

    1: 参照的启动过程，将下载好的 zip 放到指定位置
    2: 修改项目下载 gradle 的地址。/android/gradle/wrapper/gradle-wrapper.properties

gradle 依赖库导致 build 慢
./android/build.gradle

    repositories {
        google()// 必须使用，否则会报一堆错误
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }// 阿里备用源，下载更新快
    }

版本 59 启动报 500

重启 server

## 至此应该就能看到 RN 的启动页面了

## 开发辅助 - 开发选项

    启动方式
        ios: Cmd+R to reload,Cmd+D or shake for dev menu
        android:  Double tap R on your keyboard to reload,Shake or press menu button for dev menu
        命令行：adb shell input keyevent 82(WIN android 可用，其他待验证）
    开发菜单
        Reload
        Debug JS Remotely
        Enable Live Reload
        Enable Hot Reloading
        Toggle Inspector
        Show Perf Monotor
        Start/Stop Sampling Profiler
        Dev Setting

[React Native Live Reload 和Hot Reloading的区别](https://www.jianshu.com/p/671803a83439)

# 开发过程中踩过的坑

### 开启 network 调试功能

### console 使用过度影响性能 (debug 包尽量少打 log 或者用完就注调或删掉，relese 包重置 console 不输出信息）

    if (__DEV__) {
        GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
    } else {
      global.console = {
        info: () => { },
        log: () => { },
        warn: () => { },
        debug: () => { },
        error: () => { },
      };
    }
<font color="red">
**启动热更新后修改代码编译报错刷新有效，但是页面会刷新，启用旧代码
</font>
<font color="red">
**打完包后断开 server 连接，重新进入 app, 非 debug 模式下也可以正常访问，与上面属于同一个问题
</font>

## 全局修改 RN 组件的属性

用户在缩放系统字体时 app 的字体不随系统字体缩放

    import { Text, TextInput } from 'react-native';
    TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { defaultProps: false });
    Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false });

## Touchable 系列组件

先看[官网](https://reactnative.cn/docs/handling-touches/)

    TouchableHighlight
        制作按钮或者链接。注意此组件的背景会在用户手指按下时变暗
        TouchableHighlight 只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个 View 来包装它们
        可以用样式修饰
    TouchableOpacity
        户手指按下时降低按钮的透明度，而不会改变背景的颜色
        可以用样式修饰
    TouchableWithoutFeedback
        处理点击事件的同时不显示任何视觉反馈
        不可以用样式修饰
<font color="red">
**尽量避免 Touch 系列组件直接包裹，里层事件可能不被触发
</font>

## 图片处理

Image 引用处理 source 为""报 Warning

    <Image source={null}/>
Image 引用处理 source 为 null android 不报错不显示，ios 报错

    <Image source={null}/>
Image 为图片设置圆角安卓正常显示，ios 显示异常

    <Image source={{uri:'https://csdnimg.cn/pubfooter/images/job-QR.png'}} style={{width: 100,height: 100,borderRadius:20}}/>

![avatar](./assert/images/img_borderRadius.png)

解决方案：拿 View 包裹 Image, 给 View 加圆角 overflow: 'hidden'

    const radiusStyle = {
        borderTopRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        borderBottomRightRadius: borderRadius,
        borderTopLeftRadius: borderRadius,
        overflow: 'hidden',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    }
    const tarnsStyle = {
        width:100,
        height:100,
    }
    <View style={[radiusStyle,tarnsStyle]}>
        <Image
            style={tarnsStyle}
            resizeMode={resizeMode}
            source="..."
        />
    </View>

Image 加载出错显示默认图片

    <Image
        source={...}
        onLoad={this.onLoad}
        onError={this.onError}
    />

解决方案：监听 onError 事件

关于图片最好抽成一个组件[Logo.js](./assert/js/Logo.js)

## Text 组件

    <Text>{''}</Text>报错
    <Text>{null}</Text>不报错，占位置

### Text 嵌套

    非嵌套 Text 为一个块级组件，嵌套组件为一个行内组件
    <View>
        <Text>
            占位符占位符占位符占位符占位符占位符占位符占位符占位符占位符
        </Text>
        <Text>
            asdada
        </Text>
    </View>

<font color="red">** 有些布局目前没有想出实现方案</font>

![avatar](./assert/images/Text-cannot.png)
![avatar](./assert/images/Text-cannot1.jpg)

    嵌套 Text 样式
        margin,padding,border,width,height,textAlign 不起作用
        textDecorationLine 会叠加承父 Text 的 textDecorationLine
        lineHeight 不明
        backgroundColor,fontSize,color,fontWeight 生效
    <Text>数据<Text>嵌套数据</Text></Text>

### Text 使用自定义字体

[RN使用自定义字体](https://www.imooc.com/article/34470)

## 长列表渲染的问题

    <FlatList
        style={styles.container}
        data={dataArray}
        renderItem={this._rendItem}
        numColumns={numColumns}
        ListFooterComponent={ViewUtils.ListFooter(showFoot)}
        ListEmptyComponent={ViewUtils.ListEmpty()}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.5}
        keyExtractor={({ index }) => index}
        getItemLayout={(data, index) => ( // 处理最底部一条数据的时候展开错位
            { length: data, offset: 20 * index, index }
        )}
        ItemSeparatorComponent={height && this.itemDivideComponent(height)}
        // 为刷新设置颜色
        refreshControl={(
            <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.handleRefresh}// 因为涉及到 this.state
            colors={['#6D83FC']}
            progressBackgroundColor="#ffffff"
            />
        )}
    />

[getItemLayout官方解释](https://reactnative.cn/docs/flatlist/#getitemlayout)

[对于列表元素可展开](http://pm.cvsource.cn/zentao/bug-view-1377.html)

<font color="red">** 列表元素UI固定的不要加此属性,影响渲染性能</font>

## 使用导航 (react-navigation)

### [React Navigation官网](https://reactnavigation.org/)

### react-navigation 判断回退的是原生还是 RN

通过 dangerouslyGetParent 拿到 navigation 信息
![avatar](./assert/images/routeInfo.jpg)

    onBack = async () => {
        const parent = this.props.navigation.dangerouslyGetParent();
        if (parent.state.index === 0) {
            RNManager.pop();
        } else {
            this.props.navigation.pop();
        }
    }

### react-navigation 原生二次进入 RN,StatusBar 不受控制

原生 ->RN->原生 ->RN,StatusBar 够不到

解决方案：
    原生控制，给 MainReactActivity 添加 APP 默认的 StatusBar 样式

<font color="red">
    虽然问题解决，但并未完全理解 正常来说 RN 样式》Activity 样式，但原生只是给 StatusBar 添加了默认样式，改完之后 StatusBar 显示的样式是 RN 的样式，不知为何
</font>

### transitionConfig, 页面切换卡顿

    transitionConfig:()=>({
      screenInterpolator:StackViewStyleInterpolator.forHorizontal
    })

react-navigation 提供的切换方式

    forHorizontal,
    forVertical,
    forFadeFromBottomAndroid,
    forFadeToBottomAndroid,
    forFade,

参考 [react-navigation-stack/src/views/StackView/StackViewStyleInterpolator](./assert/js/StackViewStyleInterpolator.js)

实际情况如不满足可参考[官网](https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig)自定义

### 使用 react-navigation 页面间跳转

![avatar](./assert/images/react-nevigation.png)
    push: 直接添加
    replace: 替换当前路由，页面刷新
    navigate: 当前路由栈里有该路由则跳转到该路由的位置，在目标路由与当前路由之间的路由都失效，没有目标理由 push 目标路由到当前路由栈

## 兼容 iPhoneX

判断是否是 iPhoneX

    import { Dimensions, Platform } from 'react-native';
    const screenW = Dimensions.get('window').width;
    const screenH = Dimensions.get('window').height;
    // iPhoneX
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    export default class DeviceUtils {
    static isIphoneX() {
        return (
        Platform.OS === 'ios' && ((screenH >= X_HEIGHT && screenW >= X_WIDTH) || (screenH >= X_WIDTH && screenW >= X_HEIGHT))
        );
    }
    }

![avatar](./assert/images/iphoneX.png)

    StatusBar 从 20 变成了 44
    导航条高度依然是 44
    顶部的总体高度变成 88
    安全区域距离页面底部需要保留 34pt

没踩的坑

[混合热更新](https://docs.microsoft.com/en-us/appcenter/build/react-native/)

[手势响应](https://reactnative.cn/docs/gesture-responder-system/)

[动画](https://reactnative.cn/docs/animations/)
