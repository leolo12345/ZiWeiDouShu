const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
const PORT = 3001;

// 設置靜態文件服務
app.use('/tc', express.static(path.join(__dirname, '../tc')));

// 數據庫路徑 (相對于server目錄)
const dbPath = path.join(__dirname, '../tc/DB/ziwei.db');

// API端點：獲取星曜分析
// 添加根目錄重定向
app.get('/', (req, res) => {
  res.redirect('/tc/index.html');
});

// 簡化日誌中間件
app.use((req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    // 移除API請求日誌
  });
  
  next();
});

// 基本數據API
app.get('/api/heavenly-stems', (req, res) => {
  try {
    // 移除數據庫查詢日誌
    const db = new sqlite3.Database(dbPath);
    db.all('SELECT name FROM heavenly_stems', [], (err, rows) => {
      if (err) {
        // 移除所有日誌
        return res.status(500).json({ error: err.message });
      }
      // 移除數據查詢結果日誌
      res.json(rows);
      db.close();
    });
  } catch (e) {
    // 移除所有日誌
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
    
    if (!palace || !star) {
      // 移除參數檢查警告
      return res.status(400).json({ error: '缺少palace或star參數', analysis: '' });
    }

    const db = new sqlite3.Database(dbPath);
    const sql = `SELECT analysis FROM star_analysis WHERE palace = ? AND star = ?`;
    
    const queryStart = Date.now();
    
    db.get(sql, [palace, star], (err, row) => {
      if (err) {
        // 移除所有日誌
        return res.status(500).json({ error: err.message, analysis: '' });
      }
      res.json({
        analysis: row ? row.analysis : '找不到對應分析',
        error: null
      });
      db.close();
    });
  } catch (e) {
    // 移除所有日誌
    res.status(500).json({ error: '伺服器內部錯誤', analysis: '' });
  }
});

app.listen(PORT, () => {
  // 移除服務器啟動日誌
});