-- 創建宮位星曜分析表
CREATE TABLE IF NOT EXISTS palace_star_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    palace TEXT NOT NULL,     -- 宮位名稱
    star TEXT NOT NULL,       -- 星曜名稱
    analysis_1 TEXT NOT NULL, -- 基本分析
    analysis_2 TEXT NOT NULL, -- 性格分析
    analysis_3 TEXT NOT NULL, -- 影響分析
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(palace, star)
);

-- 插入命宮星曜分析
INSERT INTO palace_star_analysis (palace, star, analysis_1, analysis_2, analysis_3) VALUES 
('命宮', '巨門', '在命宮主個性靈活變通', '口才出眾善於表達', '應變能力特別強'),
('命宮', '紫微', '在命宮主一生尊貴榮耀', '性格端莊高潔有威儀', '人生多得貴人提攜'),
('命宮', '天機', '在命宮主聰明智慧過人', '思維敏捷反應快速', '擅長規劃與決策'),
('命宮', '太陽', '在命宮主性格開朗光明', '為人正直受人敬重', '容易得到長輩提攜'),
('命宮', '武曲', '在命宮主性格剛毅', '做事果斷有魄力', '善於管理財務'),
('命宮', '天同', '在命宮主性格溫和', '待人寬厚有同理心', '人緣良好易得支持'),
('命宮', '廉貞', '在命宮主性格耿直', '有原則不隨波逐流', '重視道德操守'),
('命宮', '天府', '在命宮主性情溫厚', '富貴安逸享福', '人生順遂少波折'),
('命宮', '太陰', '在命宮主性格內斂', '直覺敏銳有智慧', '擅長處理細節'),
('命宮', '貪狼', '在命宮主性格進取', '有野心追求成就', '人生充滿活力'),
('命宮', '天相', '在命宮主慈祥和善', '樂於助人積德', '人緣好福運佳'),
('命宮', '天梁', '在命宮主端莊正直', '性格開朗樂觀', '人格魅力強'),
('命宮', '七殺', '在命宮主性格剛烈', '做事雷厲風行', '有領袖魄力'),
('命宮', '破軍', '在命宮主獨特創新', '不甘平凡愛冒險', '人生起伏大');

-- 創建三方四正分析表
CREATE TABLE IF NOT EXISTS sanfang_sizheng_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    palace_type TEXT NOT NULL,  -- 宮位類型（同宮、三方、四正）
    description TEXT NOT NULL,  -- 分析描述
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 插入三方四正分析
INSERT INTO sanfang_sizheng_analysis (palace_type, description) VALUES 
('三方', '三方宮位是命宮的延伸，分別影響人生的不同面向，包括性格、事業、人際與遷移'),
('四正', '四正宮位直接影響命宮的能量，對人生有重要影響，反映一個人的基本性格與發展方向');