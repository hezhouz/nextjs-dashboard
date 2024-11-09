# Next.js 
Next.js 是一个 React框架，它为您提供创建 Web 应用程序的构建块。

## 文件目录结构
```text
-app 包含应用程序的所有路线、组件和逻辑，这是主要工作的地方。
|-lib 包含应用程序中使用的函数，例如可重用的实用程序函数和数据提取函数。
|-ui 包含应用程序的所有 UI 组件，例如卡片、表格和表单。为了节省时间，我们已为您预先设计了这些组件的样式。
-public 包含应用程序的所有静态资产，例如图像。
-next.config.js 
```
## 一、开发
### 1. **CSS** 页面 CSS 使用 [tailwind](https://tailwindcss.com/) 直接背好累名就行了，不用写一大摞css文件
### 2. **图片**  图片资源是放在 /public 里面，一般正常使用DOM的 img 自带的组件，在next中提供了一个图片组件
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

### 3. **创建页面**  Next.js 使用文件系统路由，其中​​文件夹用于创建嵌套路由。每个文件夹代表一个映射到 URL 段的路由段。

 **app 目录必须包含根布局，也就是 app/layout.js 这个文件是必需的。**
 **根布局必须包含 html 和 body标签，其他布局不能包含这些标签。**

 - 例如： 我在app下创建index文件 app/index.tsx  就会映射到 / 根路径
      app/about/index.tsx   相对的路由就是 /about 
![app router](</images/截屏2024-10-31 10.59.12.png>)

 - template 模板类似于布局（layout），它也会传入每个子布局或者页面。但不会像布局那样维持状态。




#### 3.1遇到的问题 
 1. 在使用 Next.js 的动态路由传参数时当你定义像 "/about/[id]" 这样的动态路由时，路径中的 id 参数会作为 params 的一部分，并以异步方式传递给页面。

 因为 params 的获取是异步的，所以在访问 params.id 前需要先确保 params 已经准备好，即在代码中需要 await 等待。否则，在 params 未完成加载时直接使用 params.id 会引发下面👇的报错。
 Error: Route "/about/[id]" used params.id. params should be awaited before using its properties. 
```js
export async function Page(context) {
  const { params } = await context;
  const id = params.id;
}

```