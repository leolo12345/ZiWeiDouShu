-- 創建四化星分析表
CREATE TABLE IF NOT EXISTS transformation_star_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    star TEXT NOT NULL,                 
    transformation_type TEXT NOT NULL,  
    analysis TEXT NOT NULL,             
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(star, transformation_type)
);