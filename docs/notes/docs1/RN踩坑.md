### RN运行机制

    https://www.cnblogs.com/guyuehuanhuan/p/6847979.html
    https://www.jianshu.com/p/82a28c8b673b
    
## RN之于原生

    react-native本质上相当于android的一个Activity,ios的一个UIView
    
## RN之于web   

    使用flex布局,没有class,id的概念,样式全靠style
    
## 环境搭建

参考[React Native中文网](https://reactnative.cn/docs/getting-started.html)

## 启动项目

首次启动需要下载gradle这个过程可能会很漫长

    Downloading https://services.gradle.org/distributions/gradle-4.10.2-all.zip
    Unzipping C:\Users\Administrator\.gradle\wrapper\dists\gradle-4.10.2-all\9fahxiiecdb76a5g3aw9oi8rv\gradle-4.10.2-all.zip to C:\Users\Administrator\.gradle\wrapper\dists\gradle-4.10.2-all\9fahxiiecdb76a5g3aw9oi8rv

解决方案

    1:参照的启动过程,将下载好的zip放到指定位置
    2:修改项目下载gradle的地址./android/gradle/wrapper/gradle-wrapper.properties

gradle依赖库导致build慢
./android/build.gradle  

    repositories {
        google()//必须使用，否则会报一堆错误
        maven { url 'http://maven.aliyun.com/nexus/content/groups/public/' }//阿里备用源,下载更新快
    }  

版本59启动报500

重启server

## 至此应该就能看到RN的启动页面了

## 开发辅助-开发选项
    启动方式
        ios: Cmd+R to reload,Cmd+D or shake for dev menu
        android:  Double tap R on your keyboard to reload,Shake or press menu button for dev menu
        命令行:adb shell input keyevent 82(WIN android可用,其他待验证)
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

### 开启network调试功能
### console使用过度影响性能(debug包尽量少打log或者用完就注调或删掉,relese包重置console不输出信息)

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
**打完包后断开server连接,重新进入app,非debug模式下也可以正常访问,与上面属于同一个问题
</font>

## 全局修改RN组件的属性

用户在缩放系统字体时app的字体不随系统字体缩放

    import { Text, TextInput } from 'react-native';
    TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { defaultProps: false });
    Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false });

## Touchable 系列组件

先看[官网](https://reactnative.cn/docs/handling-touches/)

    TouchableHighlight
        制作按钮或者链接。注意此组件的背景会在用户手指按下时变暗
        TouchableHighlight只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们
        可以用样式修饰
    TouchableOpacity
        户手指按下时降低按钮的透明度，而不会改变背景的颜色
        可以用样式修饰
    TouchableWithoutFeedback
        处理点击事件的同时不显示任何视觉反馈
        不可以用样式修饰
<font color="red">
**尽量避免Touch系列组件直接包裹,里层事件可能不被触发
</font>


## 图片处理

Image引用处理source为""报Warning

    <Image source={null}/>
Image引用处理source为null android不报错不显示,ios报错

    <Image source={null}/>
Image为图片设置圆角安卓正常显示，ios显示异常

    <Image source={{uri:'https://csdnimg.cn/pubfooter/images/job-QR.png'}} style={{width: 100,height: 100,borderRadius:20}}/>

![avatar](./assert/images/img_borderRadius.png)

解决方案:拿View包裹Image,给View加圆角overflow: 'hidden'

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

Image加载出错显示默认图片

    <Image
        source={...}
        onLoad={this.onLoad}
        onError={this.onError}
    />

解决方案:监听onError事件

关于图片最好抽成一个组件[Logo.js](./assert/js/Logo.js)

## Text组件
    <Text>{''}</Text>报错
    <Text>{null}</Text>不报错,占位置

### Text嵌套

    非嵌套Text为一个块级组件,嵌套组件为一个行内组件
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

    嵌套Text样式
        margin,padding,border,width,height,textAlign不起作用
        textDecorationLine会叠加承父Text的textDecorationLine
        lineHeight不明
        backgroundColor,fontSize,color,fontWeight生效
    <Text>数据<Text>嵌套数据</Text></Text>

### Text使用自定义字体

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
            onRefresh={this.handleRefresh}// 因为涉及到this.state
            colors={['#6D83FC']}
            progressBackgroundColor="#ffffff"
            />
        )}
    />

[getItemLayout官方解释](https://reactnative.cn/docs/flatlist/#getitemlayout)

[对于列表元素可展开](http://pm.cvsource.cn/zentao/bug-view-1377.html)

<font color="red">** 列表元素UI固定的不要加此属性,影响渲染性能</font>

## 使用导航(react-navigation)

### [React Navigation官网](https://reactnavigation.org/)

### react-navigation判断回退的是原生还是RN

通过dangerouslyGetParent拿到navigation信息
![avatar](./assert/images/routeInfo.jpg)

    onBack = async () => {
        const parent = this.props.navigation.dangerouslyGetParent();
        if (parent.state.index === 0) {
            RNManager.pop();
        } else {
            this.props.navigation.pop();
        }
    }

### react-navigation原生二次进入RN,StatusBar 不受控制

原生->RN->原生->RN,StatusBar够不到

解决方案:
    原生控制,给MainReactActivity添加APP默认的StatusBar样式

<font color="red">
    虽然问题解决，但并未完全理解 正常来说 RN样式>Activity样式,但原生只是给StatusBar添加了默认样式,改完之后StatusBar显示的样式是RN的样式,不知为何
</font>
    
### transitionConfig,页面切换卡顿

    transitionConfig:()=>({
      screenInterpolator:StackViewStyleInterpolator.forHorizontal
    })

react-navigation提供的切换方式

    forHorizontal,
    forVertical,
    forFadeFromBottomAndroid,
    forFadeToBottomAndroid,
    forFade,

参考 [react-navigation-stack/src/views/StackView/StackViewStyleInterpolator](./assert/js/StackViewStyleInterpolator.js)

实际情况如不满足可参考[官网](https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig)自定义
    
### 使用react-navigation页面间跳转
![avatar](./assert/images/react-nevigation.png)
    push:直接添加
    replace:替换当前路由,页面刷新
    navigate:当前路由栈里有该路由则跳转到该路由的位置,在目标路由与当前路由之间的路由都失效,没有目标理由push目标路由到当前路由栈

## 兼容iPhoneX

判断是否是iPhoneX

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

    StatusBar 从20 变成了 44
    导航条高度依然是 44
    顶部的总体高度变成 88
    安全区域距离页面底部需要保留 34pt

没踩的坑

[混合热更新](https://docs.microsoft.com/en-us/appcenter/build/react-native/)

[手势响应](https://reactnative.cn/docs/gesture-responder-system/)

[动画](https://reactnative.cn/docs/animations/)

