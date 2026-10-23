# 中韩留学生互助站（免费部署起步项目）

这是一个独立网站起步项目，包含：
- 响应式中文页面
- 翻译求助、景点推荐、生活互助分类
- 发帖、查看帖子、评论
- Cloudflare Pages Functions + D1 数据库接口

## 重要说明
这个项目尚未部署。发布之前必须创建 Cloudflare D1 数据库并绑定 `DB`，再运行 `schema.sql` 初始化数据表。匿名发帖意味着任何人都可能提交内容；上线后建议增加限流、举报/删除管理和垃圾内容防护。不要在帖子中收集证件、地址、电话等敏感信息。

## 免费上线（浏览器操作为主）

1. 将整个 ZIP 解压到电脑。
2. 登录 GitHub，创建一个新的空仓库，例如 `zhonghan-mutual-aid`，不要勾选添加 README。
3. 把解压后的文件和 `functions` 文件夹上传到仓库根目录。确保 `index.html`、`schema.sql` 和 `functions/` 在最外层。
4. 登录 Cloudflare，打开 Workers & Pages，创建 D1 数据库，名称使用 `zhonghan-mutual-aid-db`。
5. 在 D1 数据库的 Console / SQL Editor 中执行 `schema.sql` 的全部 SQL。
6. 在 Cloudflare 的 Pages 项目设置中，把 D1 数据库绑定到变量名 `DB`，选择刚创建的数据库。本项目不需要在代码中填写数据库 ID，优先使用 Cloudflare 控制台的 D1 绑定设置。
7. 创建 Pages 项目并连接 GitHub 仓库。框架预设选 None；构建命令留空；输出目录填 `/` 或按 Cloudflare 当前界面要求设置为项目根目录。
8. 部署后打开 Cloudflare 提供的 `*.pages.dev` 网址，测试发帖和评论。

## 如果部署报错
把报错文字或截图发给 ChatGPT，不要发送密码、API Token、Cookie 或其他秘密凭据。
