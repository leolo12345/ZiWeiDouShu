-- 遷移硬編碼數據到數據庫
-- 此腳本用於將 lunar.js, ziweistar.js 中的硬編碼數據遷移到數據庫

-- 農曆年份信息表 (yearInfo 數組)
-- 先清空表
DELETE FROM lunar_year_info;

-- 插入 yearInfo 數據 (1900-2049)
-- 注意：以下僅示例前幾年的數據，實際需要插入全部 150 年數據
INSERT INTO lunar_year_info (year, info) VALUES 
(1900, 0x04bd8),
(1901, 0x04ae0),
(1902, 0x0a570),
(1903, 0x054d5),
(1904, 0x0d260),
(1905, 0x0d950);
-- 繼續插入其餘年份...

-- 節氣日期表 (fest 數組)
-- 先清空表
DELETE FROM solar_terms;

-- 插入節氣數據 (1900-2049)
-- 注意：以下僅示例前幾年的數據，實際需要插入全部數據
INSERT INTO solar_terms (year, month, term_index, day) VALUES 
-- 1900年
(1900, 1, 1, 4),
(1900, 2, 1, 6),
(1900, 3, 1, 5),
(1900, 4, 1, 6),
(1900, 5, 1, 6),
(1900, 6, 1, 7),
(1900, 7, 1, 8),
(1900, 8, 1, 8),
(1900, 9, 1, 9),
(1900, 10, 1, 8),
(1900, 11, 1, 7),
(1900, 12, 1, 6);
-- 繼續插入其餘年份...

-- 五行局表 (FiveEleTable 數組)
-- 創建五行局表數據
CREATE TABLE IF NOT EXISTS five_ele_table (
    id INTEGER PRIMARY KEY,
    element_id INTEGER,
    row_index INTEGER,
    col_index INTEGER,
    value INTEGER,
    FOREIGN KEY (element_id) REFERENCES five_elements(id)
);

-- 清空表
DELETE FROM five_ele_table;

-- 插入五行局表數據
-- 水二局
INSERT INTO five_ele_table (element_id, row_index, col_index, value) VALUES
(0, 0, 0, 1), (0, 0, 1, 2), (0, 0, 2, 2), (0, 0, 3, 3), (0, 0, 4, 3),
(0, 0, 5, 4), (0, 0, 6, 4), (0, 0, 7, 5), (0, 0, 8, 5), (0, 0, 9, 6),
(0, 0, 10, 6), (0, 0, 11, 7), (0, 0, 12, 7), (0, 0, 13, 8), (0, 0, 14, 8),
(0, 0, 15, 9), (0, 0, 16, 9), (0, 0, 17, 10), (0, 0, 18, 10), (0, 0, 19, 11),
(0, 0, 20, 11), (0, 0, 21, 0), (0, 0, 22, 0), (0, 0, 23, 1), (0, 0, 24, 1),
(0, 0, 25, 2), (0, 0, 26, 2), (0, 0, 27, 3), (0, 0, 28, 3), (0, 0, 29, 4);
-- 繼續插入其餘行...

-- 五行數組 (FiveEleArr 數組)
CREATE TABLE IF NOT EXISTS five_ele_arr (
    id INTEGER PRIMARY KEY,
    row_index INTEGER,
    col_index INTEGER,
    value INTEGER
);

-- 清空表
DELETE FROM five_ele_arr;

-- 插入五行數組數據
INSERT INTO five_ele_arr (row_index, col_index, value) VALUES
(0, 0, 0), (0, 1, 1), (0, 2, 3), (0, 3, 2), (0, 4, 4), (0, 5, 1),
(1, 0, 1), (1, 1, 2), (1, 2, 4), (1, 3, 3), (1, 4, 0), (1, 5, 2),
(2, 0, 2), (2, 1, 3), (2, 2, 0), (2, 3, 4), (2, 4, 1), (2, 5, 3),
(3, 0, 3), (3, 1, 4), (3, 2, 1), (3, 3, 0), (3, 4, 2), (3, 5, 4),
(4, 0, 4), (4, 1, 0), (4, 2, 2), (4, 3, 1), (4, 4, 3), (4, 5, 0);

-- 大限數據 (DaShian 數組)
CREATE TABLE IF NOT EXISTS dashian (
    id INTEGER PRIMARY KEY,
    element_id INTEGER,
    value INTEGER,
    FOREIGN KEY (element_id) REFERENCES five_elements(id)
);

-- 清空表
DELETE FROM dashian;

-- 插入大限數據
INSERT INTO dashian (element_id, value) VALUES
(0, 2), -- 水二局
(1, 6), -- 火六局
(2, 5), -- 土五局
(3, 3), -- 木三局
(4, 4); -- 金四局