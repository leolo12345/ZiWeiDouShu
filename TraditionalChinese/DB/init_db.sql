-- 紫微斗數數據庫初始化腳本
-- 創建陰陽定義表
CREATE TABLE yin_yang (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

-- 創建天干地支表
CREATE TABLE heavenly_stems_earthly_branches (
    id INTEGER PRIMARY KEY,
    stem_name TEXT NOT NULL,
    branch_name TEXT NOT NULL,
    yin_yang_id INTEGER REFERENCES yin_yang(id),
    element_id INTEGER REFERENCES five_elements(id),
    UNIQUE(stem_name, branch_name)
);

-- 創建生肖表
CREATE TABLE zodiac_signs (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    earthly_branch_id INTEGER REFERENCES heavenly_stems_earthly_branches(id)
);

-- 創建五行表
CREATE TABLE five_elements (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    generating_cycle TEXT,
    controlling_cycle TEXT
);

-- 創建十二宮表
CREATE TABLE palaces (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    position INTEGER NOT NULL,
    description TEXT
);

-- 創建星曜分類表
CREATE TABLE star_categories (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- 創建星曜表
CREATE TABLE stars (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    category_id INTEGER REFERENCES star_categories(id),
    strength_level INTEGER,
    description TEXT
);

-- 創建星曜排列規則表
CREATE TABLE star_placement_rules (
    id INTEGER PRIMARY KEY,
    star_id INTEGER REFERENCES stars(id),
    palace_id INTEGER REFERENCES palaces(id),
    condition_type TEXT NOT NULL,
    condition_value TEXT NOT NULL,
    UNIQUE(star_id, palace_id, condition_type, condition_value)
);

-- 創建五行大限表
CREATE TABLE five_elements_age_limits (
    id INTEGER PRIMARY KEY,
    element_id INTEGER REFERENCES five_elements(id),
    gender TEXT CHECK(gender IN ('male', 'female')),
    start_age INTEGER NOT NULL,
    end_age INTEGER NOT NULL
);

-- 創建命宮計算規則表
CREATE TABLE destiny_palace_rules (
    id INTEGER PRIMARY KEY,
    gender TEXT CHECK(gender IN ('male', 'female')),
    heavenly_stem TEXT NOT NULL,
    earthly_branch TEXT NOT NULL,
    destiny_palace_position INTEGER NOT NULL,
    UNIQUE(gender, heavenly_stem, earthly_branch)
);

-- 創建命盤分析項目表
CREATE TABLE five_elements_star_tables (
    id INTEGER PRIMARY KEY,
    element_id INTEGER REFERENCES five_elements(id),
    sequence_data TEXT NOT NULL
);

CREATE TABLE analysis_items (
    id INTEGER PRIMARY KEY,
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT
);

-- 創建索引以優化查詢性能
CREATE INDEX idx_stars_category ON stars(category_id);
CREATE INDEX idx_star_placement ON star_placement_rules(star_id, palace_id);
CREATE INDEX idx_age_limits ON five_elements_age_limits(element_id, gender);