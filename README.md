# 闲鱼文案生成器

一个基于扣子（Coze）API的智能闲鱼文案生成工具，采用简洁的Material Design风格。

## 🚀 快速开始

### 本地运行

1. 安装依赖
```bash
npm install
```

2. 启动服务器
```bash
npm start
```

3. 访问页面
打开浏览器访问：`http://localhost:5000`

## 🌐 部署到线上（让别人也能用）

### 方法一：Render（推荐，免费）

1. 注册 [Render](https://render.com) 账号
2. 点击 "New +" → "Web Service"
3. 连接您的GitHub仓库
4. 配置如下：
   - **Name**: xianyu-copy-generator（或其他名称）
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. 在 "Environment" 中添加环境变量：
   - **Key**: `API_TOKEN`
   - **Value**: 您的扣子API Token
6. 点击 "Create Web Service"
7. 等待部署完成后，您会获得一个公网URL！

### 方法二：使用 render.yaml 一键部署

项目中已包含 `render.yaml` 配置文件，可以直接使用。

## 📝 使用说明

1. 在输入框中描述你的商品
2. 点击「✨ 生成闲鱼文案」按钮
3. 等待文案生成
4. 点击「复制文案」即可使用

## 💡 提示

- 详细描述商品能让文案更精准
- 记得标注品牌、型号、成色、价格
- 说明是否包邮、有无配件、购买渠道

## ⚠️ 注意事项

- 扣子API需要积分，积分用完后需要充值
- 建议在部署平台设置环境变量来保护API Token
