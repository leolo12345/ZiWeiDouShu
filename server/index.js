const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const PORT = 3001;

// 設置靜態文件服務
app.use('/TraditionalChinese', express.static(path.join(__dirname, '../TraditionalChinese')));

// 數據庫路徑 (相對于server目錄)
const dbPath = path.join(__dirname, '../TraditionalChinese/DB/ziwei.db');

// API端點：獲取星曜分析
// 添加根目錄重定向
app.get('/', (req, res) => {
  console.group(`[API][${new Date().toISOString()}] 根目錄重定向`);
  console.log('請求來源:', req.headers['user-agent']);
  res.redirect('/TraditionalChinese/index.html');
  console.groupEnd();
});

// 統一日誌中間件
app.use((req, res, next) => {
  console.groupCollapsed(`[API][${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('請求參數:', req.query);
  console.log('請求頭:', req.headers);
  const startTime = Date.now();
  
  res.on('finish', () => {
    console.log(`請求處理時間: ${Date.now() - startTime}ms`);
    console.log('響應狀態碼:', res.statusCode);
    console.groupEnd();
  });
  
  next();
});

// 基本數據API
app.get('/api/heavenly-stems', (req, res) => {
  try {
    console.log('[DB] 查詢天干數據');
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT name FROM heavenly_stems', [], (err, rows) => {
      if (err) {
        console.error('[DB][ERROR] 天干查詢錯誤:', err.message);
        return res.status(500).json({ error: err.message });
      }
      console.log('[DB] 查詢到天干數據:', rows.length, '條');
      res.json(rows);
      db.close();
    });
  } catch (e) {
    console.error('[API][ERROR] 處理天干請求異常:', {
      message: e.message,
      stack: e.stack,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ error: '伺服器內部錯誤' });
  }
});

app.get('/api/earthly-branches', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM earthly_branches', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/yin-yang', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM yin_yang', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/zodiac-signs', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM zodiac_signs', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/palaces', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM palaces', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/five-elements', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM five_elements', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

// 星曜數據API
app.get('/api/main-stars', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM main_stars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/auxiliary-stars', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM auxiliary_stars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/transformation-stars', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM transformation_stars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/evil-stars', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM evil_stars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/other-stars', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM other_stars', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

// 星曜位置數據API
app.get('/api/star-a14-positions', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM star_a14_positions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/star-z06-positions', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM star_z06_positions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/star-t08-positions', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM star_t08_positions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/star-g07-positions', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM star_g07_positions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/star-b06-positions', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM star_b06_positions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/star-os5-positions', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT * FROM star_os5_positions', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

// 星曜分析API
app.get('/api/star-analysis', (req, res) => {
  try {
    const { palace, star } = req.query;
    console.log('[API] 星曜分析請求參數:', { palace, star });
    
    if (!palace || !star) {
      console.warn('[API][WARN] 缺少必要參數');
      return res.status(400).json({ error: '缺少palace或star參數', analysis: '' });
    }

    const db = new sqlite3.Database(dbPath);
    const sql = `SELECT analysis FROM star_analysis WHERE palace = ? AND star = ?`;
    
    console.log('[DB] 執行查詢:', sql, [palace, star]);
    const queryStart = Date.now();
    
    db.get(sql, [palace, star], (err, row) => {
      console.log('[DB] 查詢耗時:', Date.now() - queryStart, 'ms');
      
      if (err) {
        console.error('[DB][ERROR] 查詢錯誤:', {
          message: err.message,
          stack: err.stack,
          timestamp: new Date().toISOString()
        });
        return res.status(500).json({ error: err.message, analysis: '' });
      }
      
      console.log('[DB] 查詢結果:', row ? '找到記錄' : '無匹配記錄');
      res.json({
        analysis: row ? row.analysis : '找不到對應分析',
        error: null
      });
      db.close();
    });
  } catch (e) {
    console.error('[API][ERROR] 星曜分析處理異常:', {
      message: e.message,
      stack: e.stack,
      timestamp: new Date().toISOString()
    });
    res.status(500).json({ error: '伺服器內部錯誤', analysis: '' });
  }
});

app.listen(PORT, () => {
  console.log(`服務器運行中: http://localhost:${PORT}`);
});