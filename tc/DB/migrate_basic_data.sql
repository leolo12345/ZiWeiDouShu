-- 陰陽表
CREATE TABLE IF NOT EXISTS yin_yang (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- 生肖表
CREATE TABLE IF NOT EXISTS zodiac_signs (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    earthly_branch_name TEXT REFERENCES earthly_branches(name)
);

-- 宮位表
CREATE TABLE IF NOT EXISTS palaces (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- 五行局表
CREATE TABLE IF NOT EXISTS five_elements (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    element_type TEXT
);

-- 插入陰陽數據
INSERT OR IGNORE INTO yin_yang (name) VALUES ('陽'), ('陰');

-- 插入生肖數據
INSERT OR IGNORE INTO zodiac_signs (name, earthly_branch_name) VALUES 
    ('鼠', '子'), ('牛', '丑'), ('虎', '寅'), ('兔', '卯'),
    ('龍', '辰'), ('蛇', '巳'), ('馬', '午'), ('羊', '未'),
    ('猴', '申'), ('雞', '酉'), ('狗', '戌'), ('豬', '亥');

-- 插入宮位數據
INSERT OR IGNORE INTO palaces (name, description) VALUES 
    ('命宮', '代表個人的生命力和整體運勢'),
    ('兄弟宮', '代表兄弟姐妹關係和人際關係'),
    ('夫妻宮', '代表婚姻和伴侶關係'),
    ('子女宮', '代表子女和創造力'),
    ('財帛宮', '代表財富和物質生活'),
    ('疾厄宮', '代表健康和困難'),
    ('遷移宮', '代表旅行和變動'),
    ('交友宮', '代表朋友和社交圈'),
    ('事業宮', '代表事業和成就'),
    ('田宅宮', '代表房產和居住環境'),
    ('福德宮', '代表內在修養和福氣'),
    ('父母宮', '代表父母和長輩關係');

-- 插入五行局數據
INSERT OR IGNORE INTO five_elements (name) VALUES
    ('水二局'),
    ('火六局'),
    ('土五局'),
    ('木三局'),
    ('金四局');

-- 主星表
CREATE TABLE IF NOT EXISTS main_stars (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- 輔星表
CREATE TABLE IF NOT EXISTS auxiliary_stars (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- 四化星表
CREATE TABLE IF NOT EXISTS transformation_stars (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- 六凶星表
CREATE TABLE IF NOT EXISTS evil_stars (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- 雜曜表
CREATE TABLE IF NOT EXISTS other_stars (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT
);

-- 插入主星數據
INSERT OR IGNORE INTO main_stars (name) VALUES
    ('紫微'),('天機'),('太陽'),('武曲'),('天同'),('廉貞'),('天府'),
    ('太陰'),('貪狼'),('巨門'),('天相'),('天梁'),('七殺'),('破軍');

-- 插入輔星數據
INSERT OR IGNORE INTO auxiliary_stars (name) VALUES
    ('文昌'),('文曲'),('左輔'),('右弼'),('天魁'),('天鉞'),('祿存');

-- 插入四化星數據
INSERT OR IGNORE INTO transformation_stars (name) VALUES
    ('化祿'),('化權'),('化科'),('化忌');

-- 插入六凶星數據
INSERT OR IGNORE INTO evil_stars (name) VALUES
    ('擎羊'),('陀羅'),('火星'),('鈴星'),('天空'),('地劫');

-- 插入雜曜數據
INSERT OR IGNORE INTO other_stars (name) VALUES
    ('天馬'),('龍池'),('鳳閣'),('紅鸞'),('天喜');