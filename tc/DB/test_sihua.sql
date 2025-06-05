-- 清空現有數據
DELETE FROM transformation_star_analysis;

-- 插入測試數據
INSERT INTO transformation_star_analysis (star, transformation_type, analysis) VALUES 
('天機', '祿', '天機化祿主聰明機智，善於謀略策劃，能得財利。在財帛宮主財源穩定；在官祿宮主職場順利，升遷快。'),
('天梁', '權', '天梁化權主性格剛直，有正義感，能在公共服務或行政部門有重要影響力。'),
('紫微', '科', '紫微化科主學識淵博，能在學術研究或科技領域取得重大成就和榮譽。'),
('太陰', '忌', '太陰化忌主多愁善感，情緒不穩，財運起伏大，投資需謹慎。');