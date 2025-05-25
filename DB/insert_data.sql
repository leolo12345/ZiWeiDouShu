INSERT INTO yin_yang (id, name) VALUES
(1, '陽'),
(2, '陰');

INSERT INTO five_elements (id, name, generating_cycle, controlling_cycle) VALUES
(1, '水二局', '金生水', '水剋火'),
(2, '火六局', '木生火', '火剋金'),
(3, '土五局', '火生土', '土剋水'),
(4, '木三局', '水生木', '木剋土'),
(5, '金四局', '土生金', '金剋木');

INSERT INTO palaces (id, name, position) VALUES
(1, '命宮', 1),
(2, '父母宮', 2),
(3, '福德宮', 3),
(4, '田宅宮', 4),
(5, '官祿宮', 5),
(6, '交友宮', 6),
(7, '遷移宮', 7),
(8, '疾厄宮', 8),
(9, '財帛宮', 9),
(10, '子女宮', 10),
(11, '夫妻宮', 11),
(12, '兄弟宮', 12),
(13, '身宮', 13);

INSERT INTO star_categories (id, name) VALUES
(1, '十四主星'),
(2, '七吉星'),
(3, '四化星'),
(4, '六煞星'),
(5, '雜曜');

INSERT INTO heavenly_stems_earthly_branches (id, stem_name, branch_name, yin_yang_id, element_id) VALUES
(1, '甲', '子', 1, 4),
(2, '乙', '丑', 2, 3),
(3, '丙', '寅', 1, 2),
(4, '丁', '卯', 2, 4),
(5, '戊', '辰', 1, 3),
(6, '己', '巳', 2, 2),
(7, '庚', '午', 1, 5),
(8, '辛', '未', 2, 3),
(9, '壬', '申', 1, 1),
(10, '癸', '酉', 2, 5),
(11, '', '戌', 1, 3),
(12, '', '亥', 2, 1);

INSERT INTO zodiac_signs (id, name, earthly_branch_id) VALUES
(1, '鼠', 1),
(2, '牛', 2),
(3, '虎', 3),
(4, '兔', 4),
(5, '龍', 5),
(6, '蛇', 6),
(7, '馬', 7),
(8, '羊', 8),
(9, '猴', 9),
(10, '雞', 10),
(11, '狗', 11),
(12, '豬', 12);
INSERT INTO stars (id, name, category_id, strength_level) VALUES
(1, '紫微', 1, 10),
(2, '天機', 1, 8),
(3, '太陽', 1, 9),
(4, '武曲', 1, 9),
(5, '天同', 1, 7),
(6, '廉貞', 1, 8),
(7, '天府', 1, 9),
(8, '太陰', 1, 8),
(9, '貪狼', 1, 7),
(10, '巨門', 1, 6),
(11, '天相', 1, 8),
(12, '天梁', 1, 7),
(13, '七殺', 1, 8),
(14, '破軍', 1, 9);

INSERT INTO stars (id, name, category_id, strength_level) VALUES
(15, '文昌', 2, 7),
(16, '文曲', 2, 7),
(17, '左輔', 2, 8),
(18, '右弼', 2, 8),
(19, '天魁', 2, 8),
(20, '天鉞', 2, 8),
(21, '祿存', 2, 7);

INSERT INTO stars (id, name, category_id, strength_level) VALUES
(22, '化祿', 3, 0),
(23, '化權', 3, 0),
(24, '化科', 3, 0),
(25, '化忌', 3, 0);

INSERT INTO stars (id, name, category_id, strength_level) VALUES
(26, '擎羊', 4, -5),
(27, '陀羅', 4, -4),
(28, '火星', 4, -6),
(29, '鈴星', 4, -5),
(30, '天空', 4, -3),
(31, '地劫', 4, -4);

INSERT INTO stars (id, name, category_id, strength_level) VALUES
(32, '天馬', 5, 3),
(33, '龍池', 5, 2),
(34, '鳳閣', 5, 2),
(35, '紅鸞', 5, 3),
(36, '天喜', 5, 3);

INSERT INTO five_elements_age_limits (element_id, gender, start_age, end_age) VALUES
(1, 'male', 1, 10),
(1, 'female', 1, 10),
(2, 'male', 11, 20),
(2, 'female', 11, 20),
(3, 'male', 21, 30),
(3, 'female', 21, 30),
(4, 'male', 31, 40),
(4, 'female', 31, 40),
(5, 'male', 41, 50),
(5, 'female', 41, 50);
-- 14主星排列規則 (Star_A14)
INSERT INTO star_placement_rules (star_id, palace_id, condition_type, condition_value) VALUES
(1, 1, 'earthly_branch', '子'), (1, 2, 'earthly_branch', '丑'), (1, 3, 'earthly_branch', '寅'),
(1, 4, 'earthly_branch', '卯'), (1, 5, 'earthly_branch', '辰'), (1, 6, 'earthly_branch', '巳'),
(1, 7, 'earthly_branch', '午'), (1, 8, 'earthly_branch', '未'), (1, 9, 'earthly_branch', '申'),
(1, 10, 'earthly_branch', '酉'), (1, 11, 'earthly_branch', '戌'), (1, 12, 'earthly_branch', '亥'),

(2, 12, 'earthly_branch', '子'), (2, 1, 'earthly_branch', '丑'), (2, 2, 'earthly_branch', '寅'),
(2, 3, 'earthly_branch', '卯'), (2, 4, 'earthly_branch', '辰'), (2, 5, 'earthly_branch', '巳'),
(2, 6, 'earthly_branch', '午'), (2, 7, 'earthly_branch', '未'), (2, 8, 'earthly_branch', '申'),
(2, 9, 'earthly_branch', '酉'), (2, 10, 'earthly_branch', '戌'), (2, 11, 'earthly_branch', '亥'),

-- 天府星排列規則 (Star_Z06)
(7, 1, 'earthly_branch', '子'), (7, 2, 'earthly_branch', '丑'), (7, 3, 'earthly_branch', '寅'),
(7, 4, 'earthly_branch', '卯'), (7, 5, 'earthly_branch', '辰'), (7, 6, 'earthly_branch', '巳'),
(7, 7, 'earthly_branch', '午'), (7, 8, 'earthly_branch', '未'), (7, 9, 'earthly_branch', '申'),
(7, 10, 'earthly_branch', '酉'), (7, 11, 'earthly_branch', '戌'), (7, 12, 'earthly_branch', '亥'),

-- 文昌文曲排列規則 (Star_G07)
(15, 10, 'heavenly_stem', '甲'), (15, 9, 'heavenly_stem', '乙'), (15, 8, 'heavenly_stem', '丙'),
(15, 7, 'heavenly_stem', '丁'), (15, 6, 'heavenly_stem', '戊'), (15, 5, 'heavenly_stem', '己'),
(15, 4, 'heavenly_stem', '庚'), (15, 3, 'heavenly_stem', '辛'), (15, 2, 'heavenly_stem', '壬'),
(15, 1, 'heavenly_stem', '癸'),

(16, 4, 'heavenly_stem', '甲'), (16, 5, 'heavenly_stem', '乙'), (16, 6, 'heavenly_stem', '丙'),
(16, 7, 'heavenly_stem', '丁'), (16, 8, 'heavenly_stem', '戊'), (16, 9, 'heavenly_stem', '己'),
(16, 10, 'heavenly_stem', '庚'), (16, 11, 'heavenly_stem', '辛'), (16, 12, 'heavenly_stem', '壬'),
(16, 1, 'heavenly_stem', '癸'),

-- 天馬星排列規則 (Star_OS5)
(32, 2, 'earthly_branch', '寅'), (32, 11, 'earthly_branch', '亥'), (32, 8, 'earthly_branch', '申'),
(32, 5, 'earthly_branch', '巳'), (32, 2, 'earthly_branch', '寅'), (32, 11, 'earthly_branch', '亥'),
(32, 8, 'earthly_branch', '申'), (32, 5, 'earthly_branch', '巳'), (32, 2, 'earthly_branch', '寅'),
(32, 11, 'earthly_branch', '亥'), (32, 8, 'earthly_branch', '申'), (32, 5, 'earthly_branch', '巳');

-- 五行局數據 (FiveEleTable)
INSERT INTO five_elements (id, name) VALUES
(1, '水二局'), (2, '火六局'), (3, '土五局'), (4, '木三局'), (5, '金四局');

-- 五行局星曜排列表 (FiveEleTable)
INSERT INTO five_elements_star_tables (element_id, sequence_data) VALUES
(1, '1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,0,0,1,1,2,2,3,3,4'),
(2, '9,6,11,4,1,2,10,7,0,5,2,3,11,8,1,6,3,4,0,9,2,7,4,5,1,10,3,8,5,6'),
(3, '6,11,4,1,2,7,0,5,2,3,8,1,6,3,4,9,2,7,4,5,10,3,8,5,6,11,4,9,6,7'),
(4, '4,1,2,5,2,3,6,3,4,7,4,5,8,5,6,9,6,7,10,7,8,11,8,9,0,9,10,1,10,11'),
(5, '11,4,1,2,0,5,2,3,1,6,3,4,2,7,4,5,3,8,5,6,4,9,6,7,5,10,7,8,6,11');

-- 五行相生相剋關係 (FiveEleArr)
INSERT INTO five_elements_age_limits (element_id, gender, start_age, end_age) VALUES
(1, 'male', 2, 11), (1, 'female', 6, 15),
(2, 'male', 6, 15), (2, 'female', 2, 11),
(3, 'male', 5, 14), (3, 'female', 5, 14),
(4, 'male', 3, 12), (4, 'female', 7, 16),
(5, 'male', 4, 13), (5, 'female', 4, 13);

-- 陰陽定義
INSERT INTO yin_yang (id, name) VALUES
(1, '陽'), (2, '陰');

-- 星曜分類
INSERT INTO star_categories (id, name) VALUES
(1, '十四主星'), (2, '六吉星'), (3, '四化星'), (4, '六煞星'), (5, '雜曜');

-- 十四主星
INSERT INTO stars (id, name, category_id) VALUES
(1, '紫微', 1), (2, '天機', 1), (3, '太陽', 1), (4, '武曲', 1),
(5, '天同', 1), (6, '廉貞', 1), (7, '天府', 1), (8, '太陰', 1),
(9, '貪狼', 1), (10, '巨門', 1), (11, '天相', 1), (12, '天梁', 1),
(13, '七殺', 1), (14, '破軍', 1);

-- 六吉星
INSERT INTO stars (id, name, category_id) VALUES
(15, '文昌', 2), (16, '文曲', 2), (17, '左輔', 2), (18, '右弼', 2),
(19, '天魁', 2), (20, '天鉞', 2), (21, '祿存', 2);

-- 四化星
INSERT INTO stars (id, name, category_id) VALUES
(22, '化祿', 3), (23, '化權', 3), (24, '化科', 3), (25, '化忌', 3);

-- 六煞星
INSERT INTO stars (id, name, category_id) VALUES
(26, '擎羊', 4), (27, '陀羅', 4), (28, '火星', 4), (29, '鈴星', 4),
(30, '天空', 4), (31, '地劫', 4);

-- 雜曜
INSERT INTO stars (id, name, category_id) VALUES
(32, '天馬', 5), (33, '龍池', 5), (34, '鳳閣', 5),
(35, '紅鸞', 5), (36, '天喜', 5);

-- 天干地支
INSERT INTO heavenly_stems_earthly_branches (id, stem_name, branch_name, yin_yang_id) VALUES
(1, '甲', '子', 1), (2, '乙', '丑', 2), (3, '丙', '寅', 1),
(4, '丁', '卯', 2), (5, '戊', '辰', 1), (6, '己', '巳', 2),
(7, '庚', '午', 1), (8, '辛', '未', 2), (9, '壬', '申', 1),
(10, '癸', '酉', 2), (11, '甲', '戌', 1), (12, '乙', '亥', 2);

INSERT INTO five_elements_star_tables (element_id, sequence_data) VALUES
(1, '[1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,0,0,1,1,2,2,3,3,4]'),
(2, '[9,6,11,4,1,2,10,7,0,5,2,3,11,8,1,6,3,4,0,9,2,7,4,5,1,10,3,8,5,6]'),
(3, '[6,11,4,1,2,7,0,5,2,3,8,1,6,3,4,9,2,7,4,5,10,3,8,5,6,11,4,9,6,7]'),
(4, '[4,1,2,5,2,3,6,3,4,7,4,5,8,5,6,9,6,7,10,7,8,11,8,9,0,9,10,1,10,11]'),
(5, '[11,4,1,2,0,5,2,3,1,6,3,4,2,7,4,5,3,8,5,6,4,9,6,7,5,10,7,8,6,11]');

INSERT INTO destiny_palace_rules (gender, heavenly_stem, earthly_branch, destiny_palace_position) VALUES
('male', '甲', '子', 1),
('female', '甲', '子', 7),
('male', '乙', '丑', 2),
('female', '乙', '丑', 8);

INSERT INTO analysis_items (id, code, name, description) VALUES
(1, 'DESTINY', '命宮分析', '命宮主星及其組合分析'),
(2, 'DECADE', '大限分析', '十年大限運勢分析'),
(3, 'YEARLY', '流年分析', '當年運勢分析'),
(4, 'CAREER', '事業分析', '官祿宮及相關星曜分析'),
(5, 'FINANCE', '財運分析', '財帛宮及相關星曜分析'),
(6, 'LOVE', '感情分析', '夫妻宮及相關星曜分析');