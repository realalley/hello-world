-- ============================================
-- 海外滑雪找搭子 - Supabase 数据库初始化脚本
-- ============================================

-- 1. 用户资料表
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  nickname TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 找搭子信息表
CREATE TABLE IF NOT EXISTS buddy_listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  resort_id INTEGER NOT NULL,
  resort_name TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  xiaohongshu_name TEXT NOT NULL,
  xiaohongshu_url TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 创建索引
CREATE INDEX idx_buddy_resort ON buddy_listings(resort_id);
CREATE INDEX idx_buddy_user ON buddy_listings(user_id);
CREATE INDEX idx_buddy_dates ON buddy_listings(start_date, end_date);

-- 4. Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE buddy_listings ENABLE ROW LEVEL SECURITY;

-- 5. RLS 策略
-- profiles: 所有人可读，只有自己可写
CREATE POLICY "profiles_read_all" ON profiles FOR SELECT USING (true);
CREATE POLICY "profiles_write_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- buddy_listings: 所有人可读，登录用户可创建，只有自己可删除
CREATE POLICY "listings_read_all" ON buddy_listings FOR SELECT USING (true);
CREATE POLICY "listings_insert_own" ON buddy_listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "listings_update_own" ON buddy_listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "listings_delete_own" ON buddy_listings FOR DELETE USING (auth.uid() = user_id);

-- 6. 自动创建 profile（新用户注册时）
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
