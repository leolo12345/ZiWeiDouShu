-- 創建宮位星曜分析表
CREATE TABLE IF NOT EXISTS palace_star_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    palace TEXT NOT NULL,     -- 宮位名稱(命宮/事業宮/財帛宮/遷移宮)
    star TEXT NOT NULL,       -- 星曜名稱
    analysis_1 TEXT NOT NULL, -- 第一條分析
    analysis_2 TEXT NOT NULL, -- 第二條分析
    analysis_3 TEXT NOT NULL, -- 第三條分析
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(palace, star)
);