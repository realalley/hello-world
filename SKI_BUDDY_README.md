# 海外滑雪找搭子

华人海外滑雪爱好者找搭子应用。

## 快速开始

### 1. 安装依赖
```bash
cd ski-buddy
npm install
```

### 2. 配置 Supabase
1. 注册 [Supabase](https://supabase.com)（免费）
2. 创建新项目
3. 在 SQL Editor 中执行 `supabase.sql` 脚本
4. 在 Settings > API 中获取 URL 和 anon key
5. 复制 `.env.example` 为 `.env`，填入：
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### 3. 本地开发
```bash
npm run dev
```

### 4. 构建
```bash
npm run build
```

## 技术栈
- React 18 + Vite 5
- Tailwind CSS 3
- Supabase（数据库 + 认证）
- React Router 6
