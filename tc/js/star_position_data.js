// 星曜位置數據插入函數

function insertStarA14Data(db) {
    // 先清空表，避免重複插入
    db.run('DELETE FROM star_a14_positions', function(err) {
        if (err) {
            console.error('清空 star_a14_positions 表時出錯:', err.message);
            return;
        }
        
        const Star_A14 = [
            [[0],[],[13],[],[5,6],[7],[8],[4,9],[3,10],[2,11],[12],[1]],
            [[1],[0,13],[],[6],[7],[5,8],[9],[10],[4,11],[3,12],[2],[]],
            [[13],[1],[0,6],[7],[8],[9],[5,10],[11],[12],[10],[3],[2]],
            [[2],[6],[1,7],[0,8],[9],[10],[11],[5,12],[],[],[4],[3,13]],
            [[3,6],[2,7],[8],[1,9],[0,10],[11],[12],[],[5],[],[13],[4]],
            [[4,7],[3,8],[2,9],[10],[1,10],[0,12],[],[],[],[5,13],[],[6]],
            [[8],[4,9],[3,10],[2,11],[12],[1],[0],[],[13],[],[5,6],[7]],
            [[9],[10],[4,11],[3,12],[2],[],[1],[0,13],[],[6],[7],[5,8]],
            [[5,10],[11],[12],[10],[3],[2],[13],[1],[0,6],[7],[8],[9]],
            [[11],[5,12],[],[],[4],[3,13],[2],[6],[1,7],[0,8],[9],[10]],
            [[12],[],[5],[],[13],[4],[3,6],[2,7],[8],[1,9],[0,10],[11]],
            [[],[],[],[5,13],[],[6],[4,7],[3,8],[2,9],[10],[1,10],[0,12]]
        ];

        const stmt = db.prepare('INSERT INTO star_a14_positions (row_index, col_index, star_id) VALUES (?, ?, ?)');

        Star_A14.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                col.forEach(starId => {
                    stmt.run(rowIndex, colIndex, starId);
                });
            });
        });

        stmt.finalize();
    });
}

module.exports = {
    insertStarA14Data,
    insertStarZ06Data,
    insertStarT08Data,
    insertStarG07Data,
    insertStarB06Data,
    insertStarOS5Data
};
function insertStarZ06Data(db) {
    // 先清空表，避免重複插入
    db.run('DELETE FROM star_z06_positions', function(err) {
        if (err) {
            console.error('清空 star_z06_positions 表時出錯:', err.message);
            return;
        }
        
        const Star_Z06 = [
            [0,1,2,3,4,5,6,7,8,9,10,11],
            [11,0,1,2,3,4,5,6,7,8,9,10],
            [9,10,11,0,1,2,3,4,5,6,7,8],
            [8,9,10,11,0,1,2,3,4,5,6,7],
            [7,8,9,10,11,0,1,2,3,4,5,6],
            [4,5,6,7,8,9,10,11,0,1,2,3],
            [4,3,2,1,0,11,10,9,8,7,6,5]
        ];

        const stmt = db.prepare('INSERT INTO star_z06_positions (row_index, col_index, position) VALUES (?, ?, ?)');

        Star_Z06.forEach((row, rowIndex) => {
            row.forEach((position, colIndex) => {
                stmt.run(rowIndex, colIndex, position);
            });
        });

        stmt.finalize();
    });
}

function insertStarT08Data(db) {
    // 先清空表，避免重複插入
    db.run('DELETE FROM star_t08_positions', function(err) {
        if (err) {
            console.error('清空 star_t08_positions 表時出錯:', err.message);
            return;
        }
        
        const Star_T08 = [
            [10,,4,5,6,7,8,9,0,11],
            [1,2,3,4,5,6,7,8,9,10,11,0],
            [2,3,4,5,6,7,8,9,10,11,0,1],
            [3,4,5,6,7,8,9,10,11,0,1,2],
            [4,5,6,7,8,9,10,11,0,1,2,3],
            [5,6,7,8,9,10,11,0,1,2,3,4],
            [6,7,8,9,10,11,0,1,2,3,4,5],
            [10,11,0,1,2,3,4,5,6,7,8,9]
        ];

        const stmt = db.prepare('INSERT INTO star_t08_positions (row_index, col_index, position) VALUES (?, ?, ?)');

        Star_T08.forEach((row, rowIndex) => {
            row.forEach((position, colIndex) => {
                stmt.run(rowIndex, colIndex, position);
            });
        });

        stmt.finalize();
    });
}

function insertStarG07Data(db) {
    // 先清空表，避免重複插入
    db.run('DELETE FROM star_g07_positions', function(err) {
        if (err) {
            console.error('清空 star_g07_positions 表時出錯:', err.message);
            return;
        }
        
        const Star_G07 = [
            [10,9,8,7,6,5,4,3,2,1,0,11],
            [4,5,6,7,8,9,10,11,0,1,2,3],
            [4,5,6,7,8,9,10,11,0,1,2,3],
            [10,9,8,7,6,5,4,3,2,1,0,11],
            [1,0,11,11,1,0,1,6,3,3],
            [7,8,9,9,7,8,7,2,5,5],
            [2,3,5,6,5,6,8,9,11,0]
        ];

        const stmt = db.prepare('INSERT INTO star_g07_positions (row_index, col_index, star_id) VALUES (?, ?, ?)');

        Star_G07.forEach((row, rowIndex) => {
            row.forEach((starId, colIndex) => {
                stmt.run(rowIndex, colIndex, starId);
            });
        });

        stmt.finalize();
    });
}

function insertStarB06Data(db) {
    // 先清空表，避免重複插入
    db.run('DELETE FROM star_b06_positions', function(err) {
        if (err) {
            console.error('清空 star_b06_positions 表時出錯:', err.message);
            return;
        }
        
        const Star_B06 = [
            [3,4,6,7,6,7,9,10,0,1],
            [1,2,4,5,4,5,7,8,10,11],
            [[2,3,4,5,6,7,8,9,10,11,0,1],[3,4,5,6,7,8,9,10,11,0,1,2],[1,2,3,4,5,6,7,8,9,10,11,0],[9,10,11,0,1,2,3,4,5,6,7,8]],
            [[10,11,0,1,2,3,4,5,6,7,8,9],[10,11,0,1,2,3,4,5,6,7,8,9],[3,4,5,6,7,8,9,10,11,0,1,2],[10,11,0,1,2,3,4,5,6,7,8,9]],
            [11,10,9,8,7,6,5,4,3,2,1,0],
            [11,0,1,2,3,4,5,6,7,8,9,10]
        ];

        const stmt = db.prepare('INSERT INTO star_b06_positions (row_index, col_index, star_id) VALUES (?, ?, ?)');

        Star_B06.forEach((row, rowIndex) => {
            if (Array.isArray(row[0])) {
                row.forEach((subRow, subRowIndex) => {
                    subRow.forEach((starId, colIndex) => {
                        // 使用 subRowIndex * 12 + colIndex 作為列索引，確保唯一性
                        const actualColIndex = subRowIndex * 12 + colIndex;
                        stmt.run(rowIndex, actualColIndex, starId);
                    });
                });
            } else {
                row.forEach((starId, colIndex) => {
                    stmt.run(rowIndex, colIndex, starId);
                });
            }
        });

        stmt.finalize();
    });
}

function insertStarOS5Data(db) {
    // 先清空表，避免重複插入
    db.run('DELETE FROM star_os5_positions', function(err) {
        if (err) {
            console.error('清空 star_os5_positions 表時出錯:', err.message);
            return;
        }
        
        const Star_OS5 = [
            [2,11,8,5,2,11,8,5,2,11,8,5],
            [4,5,6,7,8,9,10,11,0,1,2,3],
            [10,9,8,7,6,5,4,3,2,1,0,11],
            [3,2,1,0,11,10,9,8,7,6,5,4],
            [9,8,7,6,5,4,3,2,1,0,11,10]
        ];

        const stmt = db.prepare('INSERT INTO star_os5_positions (row_index, col_index, position) VALUES (?, ?, ?)');

        Star_OS5.forEach((row, rowIndex) => {
            row.forEach((position, colIndex) => {
                stmt.run(rowIndex, colIndex, position);
            });
        });

        stmt.finalize();
    });
}