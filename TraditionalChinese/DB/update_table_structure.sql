-- 檢查是否存在 element_type 列，如果不存在則添加
PRAGMA foreign_keys=off;

BEGIN TRANSACTION;

-- 創建臨時表
CREATE TABLE IF NOT EXISTS five_elements_temp (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    element_type TEXT
);

-- 將舊表數據複製到臨時表
INSERT INTO five_elements_temp(id, name) 
SELECT id, name FROM five_elements;

-- 刪除舊表
DROP TABLE IF EXISTS five_elements;

-- 創建新表
CREATE TABLE IF NOT EXISTS five_elements (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    element_type TEXT
);

-- 將臨時表數據複製到新表
INSERT INTO five_elements(id, name, element_type) 
SELECT id, name, element_type FROM five_elements_temp;

-- 刪除臨時表
DROP TABLE five_elements_temp;

COMMIT;

PRAGMA foreign_keys=on;

-- 更新五行局數據，添加 element_type
UPDATE five_elements SET element_type = '水' WHERE name = '水二局';
UPDATE five_elements SET element_type = '火' WHERE name = '火六局';
UPDATE five_elements SET element_type = '土' WHERE name = '土五局';
UPDATE five_elements SET element_type = '木' WHERE name = '木三局';
UPDATE five_elements SET element_type = '金' WHERE name = '金四局';