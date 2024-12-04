/**  中间件
 * 比如你可以基于传入的请求，重写、重定向、修改请求或响应头、甚至直接响应内容。
 * 一个比较常见的应用就是鉴权，在打开页面渲染具体的内容前，先判断用户是否登录，如果未登录，则跳转到登录页面。
*/
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};