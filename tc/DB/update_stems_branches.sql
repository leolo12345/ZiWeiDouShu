-- 創建天干表（如果不存在）
CREATE TABLE IF NOT EXISTS heavenly_stems (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    yin_yang_id INTEGER REFERENCES yin_yang(id),
    element_id INTEGER REFERENCES five_elements(id)
);

-- 創建地支表（如果不存在）
CREATE TABLE IF NOT EXISTS earthly_branches (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    yin_yang_id INTEGER REFERENCES yin_yang(id),
    element_id INTEGER REFERENCES five_elements(id)
);

-- 插入天干數據（忽略已存在的數據）
INSERT OR IGNORE INTO heavenly_stems (name, yin_yang_id, element_id)
SELECT DISTINCT stem_name, yin_yang_id, element_id
FROM heavenly_stems_earthly_branches
WHERE stem_name != '';

-- 插入地支數據（忽略已存在的數據）
INSERT OR IGNORE INTO earthly_branches (name, yin_yang_id, element_id)
SELECT DISTINCT branch_name, yin_yang_id, element_id
FROM heavenly_stems_earthly_branches
WHERE branch_name != '';

-- 顯示更新後的表結構
SELECT 'Heavenly Stems Table Structure:';
PRAGMA table_info(heavenly_stems);

SELECT 'Earthly Branches Table Structure:';
PRAGMA table_info(earthly_branches);

-- 查詢天干數據
SELECT 'Heavenly Stems Data:';
SELECT * FROM heavenly_stems;

-- 查詢地支數據
SELECT 'Earthly Branches Data:';
SELECT * FROM earthly_branches;