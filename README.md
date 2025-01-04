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

## 使用到的轮子插件
依赖包 [limiter](https://www.npmjs.com/package/limiter)  为了防止被恶意调用，限制每分钟最多调用次数。


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

### 4. **服务端组件和客户端组件的使用**
  **在nextjs中，组件默认使用的是服务端组件**   **请求在服务端执行，并将渲染后的HTML页面返回给客户端。**
  -  优势

    1. 获取数据更快：因为服务器离数据储存的服务器很近，以及性能、网络都比较流畅。
    2. 安全：敏感信息和逻辑都存在服务端。
    3. 缓存：服务端渲染结果可以缓存，在后续请求中反复使用。
    4. 依赖包体积小：服务端的组件代码不会打包到 bundle 中。
    5. 首屏页面渲染速度：服务端渲染生成 HTML，快速展示 UI。
    6. Streaming（分流渲染）：服务端组件可以将渲染工作拆分为 chunks（块），并在准备就绪时将它们流式传输到客户端。用户可以更早看到页面的部分内容，而不必等待整个页面渲染完毕。


  - 缺点

    1. 在服务端组件不能使用 useState 状态管理。
    2. 不能使用浏览器的 API 如：location 等。

  - 接下来看下如何使用

   一般情况都是服务端组件和客户端组件交替使用

```text
注意事项写在前面
⚠️注意： 服务端组件可以直接导入客户端组件，但客户端组件并不能导入服务端组件

⚠️注意： "use client"用于声明服务端和客户端组件模块之间的边界。
        当你在文件中定义了一个 "use client"，导入的其他模块包括子组件，都会被视为客户端 bundle 的一部分。
```

```js
'use client' // 设置组件为客户端组件在该文件第一行写上 ‘use client’

import ServerComponent from './Server-Component'// 在客户端倒入服务端组件 这是万万不可以的。原因看开头注意事项
export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <ServerComponent />
    </>
  )
}

```

### 5. 数据获取 Server Actions

Server Action 是指在服务端执行的异步函数，他们可以在服务端和客户端组件使用，用来处理 Next.js 中的数据提交和更改。


#### 5.1基本用法

定义一个 Server Action 需要使用 **use server** 指令。按定义位置分为两种用法：
1. 将**use server**放到一个 async 函数顶部表示改函数为 Server Action
2. 将**use server**放到一个文件顶部表示改函数导出的所有函数都是 Server Action

#### 5.2使用场景


想定一个场景，实现一个简单的 todolist， 然后在逐步加上提交表单时的等待状态、服务端如何验证字段、如何进行更好的更新、如何进行错误处理、如何获取 header And cookies 的数据、如何重定向？



### 6. 懒加载
  在 next.js 中有了两种方法实现懒加载
  - 使用 React.lazy() 和 suspanse 
  - 使用 next/dynamic 实现动态导入

####  6.1React.lazy 和 suspanse 的用法

```js
import { Suspanse, lazy } from 'react'
const components = lazy(() => import('./components.tsx'))

export default function page() {
  return(
    <Suspanse fullback={<Lodding />}>
      <h1>Preview</h1>
      <components />
    </Suspanse>
  )
}
```
上面👆是 React 中的用法，下面咱们来介绍一下在 next.js 中的实际用法

####  6.2 next/dynamic 的基本用法

```js
import dynamic from 'next/dynamic'

const Compontents = dynamic(
  () => import('./compontents.tsx'), // 第一个参数表示加载函数，用法同lazy函数
  {
    loading: () => <p>Loading...</p> // 第二个参数表示配置项，可以设置加载组件， 如同suspanse中的fullback
  }
)
/** 注意事项
 * 1. import 中的路径不能有模版字符串或者变量
 * 2. import 必须在dynamic 内部
 * 3. dynamic 跟 lazy 函数一样，需要放在模块顶部
*/
export default function page() {
  return(
    <div>
      <Compontents />
    </div>
  )
}
```
⚠️懒加载只适用于客户端组件，如果导入一个服务端组件那么只会懒加载组件中的客户端组件，服务端组件本身是不会懒加载的



### 复习一下 TS 好久没用忘的差不多了😂 2024-12-10

大白话解释TS的作用： **就是静态类型检查，在编写代码的时候就能避免一些简单的类型错误bug。 在打包或者编译的时候编译器会去掉TS的注解并将代码转换为js，因为没有任何浏览器或者运行环境可以直接运行TS，所以这就是为什么TS需要一个编译器**


#### 常见的几种类型 
  - string  number boolean  原始的类型 很EZ
  - Array（数组） 如 [1,2,3] 可以这样弄 Array<number> / number[]，如 ['a','b','c'] Array<string> 复杂的后面说
  - Function（函数）传递的参数需要类型注解 
  - Object（对象） 
  ```ts
    // 常用的方法 类型别名
    type Point = {
      x: number;
      y: number;
    };
    // 或者 接口声明 interfaces 
    //interface Point {
    //  x: number;
    //  y: number;
    //}
    // Exactly the same as the earlier example
    function printCoord(pt: Point) {
      console.log("The coordinate's x value is " + pt.x);
      console.log("The coordinate's y value is " + pt.y);
    }
    // interfaces 和 type 两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。
  ```
  - 类型收窄案例分析
  需求:如果 padLeft 参数 padding 是一个数字，我们就在 input 前面添加同等数量的空格，而如果 padding 是一个字符串，我们就直接添加到 input 前面。
  ```ts
  function padLeft(padding: number | string, input: string) {
    if (typeof padding === "number") { // 如果不加这句类型判断，ts会把 padding + 1 这段标红，他在警告我们 直接这么相加并不会得到我们想要的结果，
      return new Array(padding + 1).join(" ") + input;
    }
    return padding + input;
  }
  ```
  - 类型判形式的示例
  ```ts
    function isFish(pet: Fish | Bird): pet is Fish {//  pet is Fish 用来告诉 ts：如果函数返回 true，参数 pet 的类型就是 Fish。
      return (pet as Fish).swim !== undefined;
    }
  ``` 
  - 类型辨别联合
  ```ts
    interface StartAction {
      type: "start";
      payload: { user: string };
    }
    interface StopAction {
      type: "stop";
    }
    interface ResetAction {
      type: "reset";
      payload: { reason: string };
    }
    type Action = StartAction | StopAction | ResetAction;

    // 通过检查可辨别字段，TypeScript 自动缩小类型范围，避免不必要的类型断言。
    function handleAction(action: Action) {
      switch (action.type) {
        case "start":
          console.log(`Starting for user: ${action.payload.user}`);
          break;

        case "stop":
          console.log("Stopping");
          break;

        case "reset":
          console.log(`Reset because: ${action.payload.reason}`);
          break;

        default:
          throw new Error("Unknown action type");
      }
    }

  ```
#### 函数类型
  最常用和最让人头疼的就是函数类型的编写，得牢记于心

  - 简单的函数类型表达式 function xxxx(fn: (a: string) => void) {...}
  - 泛型函数
  ```ts
  // <Type> ： 表示一个泛型参数的占位符,它的作用是让函数支持不同类型 
  // Type[] ：表示元素类型为 Type 的数组
  // Type | undefined ： 表示函数返回 Tpye 类型或者 undefined 类型
  function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
  }

  const nums = [1, 2, 3];
  const firstNum = firstElement(nums); // 推断为 number | undefined
  console.log(firstNum); // 输出: 1

  const words = ["apple", "banana"];
  const firstWord = firstElement(words); // 推断为 string | undefined
  console.log(firstWord); // 输出: "apple"

  const emptyList: boolean[] = [];
  const firstEmpty = firstElement(emptyList); // 推断为 boolean | undefined
  console.log(firstEmpty); // 输出: undefined

  const obj= [{a:1, b:2}, {c:3, b: 4}];
  const firstEmpty = firstElement(obj); // 推断为 Object | undefined
  console.log(firstEmpty); // 输出: {a:1, b:2}
  ```
  - 泛型约束函数 这也是很常用的

  约束有几点需要注意

    1. 如果可能的话，直接使用类型参数而不是约束它。
    2. 尽可能用更少的类型参数
    3. 如果一个类型参数仅仅出现在一个地方，强烈建议你重新考虑是否真的需要它
    4. 当你写一个回调函数的类型时,不要写一个可选参数, 除非你真的打算调用函数的时候不传入实参
    5. 尽可能的使用联合类型替代重载
    6. void 跟 undefined 不一样
    7. object 不同于 Object ，总是用 object! // 解释： 函数就是对象

示例

  ```ts
    //<T, K extends keyof T> 是泛型参数的声明
    // T 表示对象的类型。
    // K 是一个泛型 它必须是 T 的键之一  （通过 keyof T 约束）
    // (obj: T, key: K) 参数 一个是对象、一个是对象中的key
    // T[K] 表示对象 T 中键 K 对应的属性的类型。
    function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
      return obj[key];
    }
    const person = {
      name: "Alice",
      age: 30,
      job: "Engineer",
    };
    // 函数调用：获取 name 属性
    const personName = getProperty(person, "name"); // 推断类型为 string
    console.log(personName); // 输出: Alice
    // 函数调用：获取 age 属性
    const personAge = getProperty(person, "age"); // 推断类型为 number
    console.log(personAge); // 输出: 30
  ```
  - 泛型对象

  




## 二、新概念



### 1. Edge Runtime & Node.js Runtime 概念

让我们先从 CDN 说起，内容分发网络（Content Delivery Network）他是由分布在不同地理位置的服务器及数据中心的虚拟网络，目的在于以最小的网络延迟将内容分发给用户。现在需要它干一点除了缓存和传输网络内容的事情， 就是 **边缘网络** (edge Network)
让它干什么呢？ 目的是为了用户更快的能看到页面，就是让它帮忙大哥做一点计算的活，它的环境特殊只能使用[web APIs ](https://nextjs.org/docs/app/api-reference/edge).





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