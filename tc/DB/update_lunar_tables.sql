-- 創建農曆年份信息表
CREATE TABLE lunar_year_info (
    id INTEGER PRIMARY KEY,
    year INTEGER NOT NULL,
    info INTEGER NOT NULL,
    UNIQUE(year)
);

-- 創建節氣日期表
CREATE TABLE solar_terms (
    id INTEGER PRIMARY KEY,
    year INTEGER NOT NULL,
    month INTEGER NOT NULL,
    day INTEGER NOT NULL,
    term_index INTEGER NOT NULL,
    UNIQUE(year, month, term_index)
);

-- 創建索引以優化查詢性能
CREATE INDEX idx_lunar_year ON lunar_year_info(year);
CREATE INDEX idx_solar_terms ON solar_terms(year, month);