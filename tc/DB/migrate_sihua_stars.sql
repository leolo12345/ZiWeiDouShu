-- 紫微斗數四化星專用資料表
CREATE TABLE IF NOT EXISTS sihua_stars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    palace TEXT NOT NULL,      -- 宮位名稱
    type TEXT NOT NULL,        -- 四化類型(化祿/化權/化科/化忌)
    analysis TEXT NOT NULL,    -- 分析內容
    UNIQUE(palace, type)
);

-- 從star_analysis遷移四化星資料
INSERT INTO sihua_stars (palace, type, analysis)
SELECT palace, 
       CASE 
           WHEN star = '化祿' THEN '化祿'
           WHEN star = '化權' THEN '化權' 
           WHEN star = '化科' THEN '化科'
           WHEN star = '化忌' THEN '化忌'
       END as type,
       analysis
FROM star_analysis
WHERE star IN ('化祿', '化權', '化科', '化忌');

-- 驗證遷移結果
SELECT COUNT(*) as total_sihua FROM sihua_stars;
SELECT * FROM sihua_stars LIMIT 5;

-- 創建索引優化查詢性能
CREATE INDEX idx_sihua_palace ON sihua_stars(palace);
CREATE INDEX idx_sihua_type ON sihua_stars(type);
CREATE INDEX idx_sihua_combo ON sihua_stars(palace, type);

-- 可選：從原表刪除已遷移的四化星資料(執行前請備份)
-- DELETE FROM star_analysis WHERE star IN ('化祿', '化權', '化科', '化忌');