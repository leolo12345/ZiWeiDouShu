-- 創建三方四正分析表
CREATE TABLE IF NOT EXISTS sanfang_sizheng_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    analysis_type TEXT NOT NULL, -- 'sanfang' 或 'sizheng'
    palace_type TEXT NOT NULL,   -- 'tong', 'dui', 'sanhe1', 'sanhe2', 'xing', 'chong'
    description TEXT NOT NULL,   -- 分析描述
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入三方宮位的基本分析
INSERT INTO sanfang_sizheng_analysis (analysis_type, palace_type, description) VALUES
('sanfang', 'tong', '同宮為命宮本身，代表個人的基本特質與生命型態'),
('sanfang', 'dui', '對宮與命宮相對，反映人生的另一面向與潛在特質'),
('sanfang', 'sanhe1', '第一個三合宮位，與命宮呈120度角，顯示人生的輔助力量'),
('sanfang', 'sanhe2', '第二個三合宮位，與命宮呈240度角，代表潛在的支持力量');

-- 插入四正宮位的基本分析
INSERT INTO sanfang_sizheng_analysis (analysis_type, palace_type, description) VALUES
('sizheng', 'tong', '同宮為命宮本身，是人生的主要面向'),
('sizheng', 'dui', '對宮顯示生命中的對立面與平衡點'),
('sizheng', 'xing', '刑宮代表生命中的衝突與挑戰'),
('sizheng', 'chong', '沖宮表示外在的衝擊與改變力量');