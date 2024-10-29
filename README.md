## Next.js 
Next.js 是一个 React框架，它为您提供创建 Web 应用程序的构建块。

#### 文件目录结构
```text
-app 包含应用程序的所有路线、组件和逻辑，这是主要工作的地方。
|-lib 包含应用程序中使用的函数，例如可重用的实用程序函数和数据提取函数。
|-ui 包含应用程序的所有 UI 组件，例如卡片、表格和表单。为了节省时间，我们已为您预先设计了这些组件的样式。
-public 包含应用程序的所有静态资产，例如图像。
-next.config.js 
```
#### 开发
1. **CSS** 页面 CSS 使用 [tailwind](https://tailwindcss.com/) 直接背好累名就行了，不用写一大摞css文件
2. **图片**  图片资源是放在 /public 里面，一般正常使用DOM的 img 自带的组件，在next中提供了一个图片组件
```text
组件<Image>​
该<Image>组件是HTML标签的扩展<img>，并带有自动图像优化功能，例如：

加载图像时自动防止布局偏移。
调整图像大小以避免将大图像传送到视口较小的设备。
默认情况下延迟加载图像（图像进入视口时加载）。
以现代格式（如WebP）提供图像和AVIF，当浏览器支持时。
```
```js
// 示例 
import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      <Image
        src="/hero-desktop.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="Screenshots of the dashboard project showing desktop version"
      />
    </div>
  );
}
```

2. **创建页面**  Next.js 使用文件系统路由，其中​​文件夹用于创建嵌套路由。每个文件夹代表一个映射到 URL 段的路由段。



