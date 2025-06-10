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

// 根目錄重定向
app.get('/', (req, res) => {
  res.redirect('/tc/index.html');
});

// 統一日誌中間件
app.use((req, res, next) => {
  console.groupCollapsed(`[API][${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('請求參數:', req.query);
  const startTime = Date.now();
  
  res.on('finish', () => {
    console.log(`請求處理時間: ${Date.now() - startTime}ms`);
    console.log('響應狀態碼:', res.statusCode);
    console.groupEnd();
  });
  
  next();
});

// 新增三方四正分析API
app.get('/api/sanfang-sizheng-analysis', (req, res) => {
  const { palaceId } = req.query;

  if (!palaceId) {
    return res.status(400).json({ error: '缺少 palaceId 參數' });
  }

  const db = new sqlite3.Database(dbPath);
  const sql = `SELECT * FROM sanfang_sizheng_analysis WHERE palace_id = ?`;

  db.all(sql, [palaceId], (err, rows) => {
    if (err) {
      console.error('[DB][ERROR] 三方四正分析查詢錯誤:', err.message);
      return res.status(500).json({ error: err.message });
    }

    res.json({
      analysis: rows,
      error: null
    });
    db.close();
  });
});

// 基本數據API
app.get('/api/heavenly-stems', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM heavenly_stems', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

app.get('/api/earthly-branches', (req, res) => {
  const db = new sqlite3.Database(dbPath);
  db.all('SELECT name FROM earthly_branches', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
    db.close();
  });
});

// 星曜分析API
app.get('/api/star-analysis', (req, res) => {
  const { palace, star } = req.query;

  if (!palace || !star) {
    return res.status(400).json({ error: '缺少palace或star參數', analysis: '' });
  }
  //star=star+'星'; 
  const db = new sqlite3.Database(dbPath);
  
  const sql = `SELECT analysis FROM star_analysis WHERE palace = ? AND star = ?`;

  db.get(sql, [palace, star], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message, analysis: '' });
    }

    res.json({
      analysis: row ? row.analysis : '找不到對應分析',
      error: null
    });
    db.close();
  });
});

// 四化星分析API
app.get('/api/sihua-analysis', (req, res) => {
  const { star, transformation_type } = req.query;

  if (!star || !transformation_type) {
    return res.status(400).json({ error: '缺少star或transformation_type參數', analysis: '' });
  }

  const db = new sqlite3.Database(dbPath);
  const sql = `SELECT analysis FROM transformation_star_analysis WHERE star = ? AND transformation_type = ?`;

  db.get(sql, [star, transformation_type], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message, analysis: '' });
    }

    res.json({
      analysis: row ? row.analysis : '找不到對應分析',
      error: null
    });
    db.close();
  });
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`服務器運行中: http://localhost:${PORT}`);
});