-- 紫微斗數星曜位置數據表結構更新

-- 創建主星位置表 (Star_A14)
CREATE TABLE IF NOT EXISTS star_a14_positions (
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    star_id INTEGER NOT NULL,
    PRIMARY KEY (row_index, col_index, star_id)
);

-- 清空現有數據
DELETE FROM star_a14_positions;

-- 插入新的星曜位置數據
INSERT INTO star_a14_positions (row_index, col_index, star_id)
VALUES
-- 第0行
(0, 0, 0),
(0, 2, 13),
(0, 4, 5),
(0, 4, 6),
(0, 5, 7),
(0, 6, 8),
(0, 7, 4),
(0, 7, 9),
(0, 8, 3),
(0, 8, 10),
(0, 9, 2),
(0, 9, 11),
(0, 10, 12),
(0, 11, 1),
-- 第1行
(1, 0, 1),
(1, 1, 0),
(1, 1, 13),
(1, 3, 6),
(1, 4, 7),
(1, 5, 5),
(1, 5, 8),
(1, 6, 9),
(1, 7, 10),
(1, 8, 4),
(1, 8, 11),
(1, 9, 3),
(1, 9, 12),
(1, 10, 2),
-- 第2行
(2, 0, 13),
(2, 1, 1),
(2, 1, 4),
(2, 2, 0),
(2, 2, 6),
(2, 3, 7),
(2, 4, 8),
(2, 5, 9),
(2, 6, 5),
(2, 6, 10),
(2, 7, 11),
(2, 8, 12),
(2, 9, 10),
(2, 10, 3),
(2, 11, 2),
-- 第3行
(3, 0, 2),
(3, 1, 6),
(3, 2, 1),
(3, 2, 7),
(3, 3, 0),
(3, 3, 8),
(3, 4, 9),
(3, 5, 10),
(3, 6, 11),
(3, 7, 5),
(3, 7, 12),
(3, 10, 4),
(3, 11, 3),
(3, 11, 13),
-- 第4行
(4, 0, 3),
(4, 0, 6),
(4, 1, 2),
(4, 1, 7),
(4, 2, 8),
(4, 3, 1),
(4, 3, 9),
(4, 4, 0),
(4, 4, 10),
(4, 5, 11),
(4, 6, 12),
(4, 9, 13),
(4, 10, 4),
-- 第5行
(5, 0, 4),
(5, 0, 7),
(5, 1, 3),
(5, 1, 8),
(5, 2, 2),
(5, 2, 9),
(5, 3, 10),
(5, 4, 1),
(5, 4, 10),
(5, 5, 0),
(5, 5, 12),
(5, 10, 5),
(5, 10, 13),
(5, 11, 6),
-- 第6行
(6, 0, 8),
(6, 1, 4),
(6, 1, 9),
(6, 2, 3),
(6, 2, 10),
(6, 3, 2),
(6, 3, 11),
(6, 4, 12),
(6, 5, 1),
(6, 6, 0),
(6, 9, 13),
(6, 10, 5),
(6, 10, 6),
(6, 11, 7),
-- 第7行
(7, 0, 9),
(7, 1, 10),
(7, 2, 4),
(7, 2, 11),
(7, 3, 3),
(7, 3, 12),
(7, 4, 2),
(7, 6, 1),
(7, 7, 0),
(7, 7, 13),
(7, 10, 6),
(7, 11, 5),
(7, 11, 8),
-- 第8行
(8, 0, 5),
(8, 0, 10),
(8, 1, 11),
(8, 2, 12),
(8, 3, 10),
(8, 4, 3),
(8, 5, 2),
(8, 6, 13),
(8, 7, 1),
(8, 8, 0),
(8, 8, 6),
(8, 9, 7),
(8, 10, 8),
(8, 11, 9),
-- 第9行
(9, 0, 11),
(9, 1, 5),
(9, 1, 12),
(9, 4, 4),
(9, 5, 3),
(9, 5, 13),
(9, 6, 2),
(9, 7, 6),
(9, 8, 1),
(9, 8, 7),
(9, 9, 0),
(9, 9, 8),
(9, 10, 9),
(9, 11, 10),
-- 第10行
(10, 0, 12),
(10, 2, 5),
(10, 4, 13),
(10, 5, 4),
(10, 6, 3),
(10, 6, 6),
(10, 7, 2),
(10, 7, 7),
(10, 8, 8),
(10, 9, 1),
(10, 9, 9),
(10, 10, 0),
(10, 10, 10),
(10, 11, 11),
-- 第11行
(11, 3, 5),
(11, 3, 13),
(11, 5, 6),
(11, 6, 4),
(11, 6, 7),
(11, 7, 3),
(11, 7, 8),
(11, 8, 2),
(11, 8, 9),
(11, 9, 10),
(11, 10, 1),
(11, 10, 10),
(11, 11, 0),
(11, 11, 12);

-- 創建紫微諸星位置表 (Star_Z06)
CREATE TABLE IF NOT EXISTS star_z06_positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    position INTEGER NOT NULL,
    UNIQUE(row_index, col_index)
);

-- 創建天府諸星位置表 (Star_T08)
CREATE TABLE IF NOT EXISTS star_t08_positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    position INTEGER NOT NULL,
    UNIQUE(row_index, col_index)
);

-- 創建六吉星位置表 (Star_G07)
CREATE TABLE IF NOT EXISTS star_g07_positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    star_id INTEGER NOT NULL,
    UNIQUE(row_index, col_index, star_id)
);

-- 創建六凶星位置表 (Star_B06)
CREATE TABLE IF NOT EXISTS star_b06_positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    star_id INTEGER NOT NULL,
    UNIQUE(row_index, col_index, star_id)
);

-- 創建雜曜位置表 (Star_OS5)
CREATE TABLE IF NOT EXISTS star_os5_positions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    row_index INTEGER NOT NULL,
    col_index INTEGER NOT NULL,
    position INTEGER NOT NULL,
    UNIQUE(row_index, col_index)
);