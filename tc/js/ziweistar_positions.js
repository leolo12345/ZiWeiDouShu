/*
 * 紫微斗數星曜位置數據格式化模塊
 * 此模塊負責將從數據庫獲取的星曜位置數據轉換為程序可用的格式
 */

// 星曜位置數據格式化函數
function formatStarPositions() {
    console.log("開始格式化星曜位置數據...");

    // 格式化主星位置數據 (Star_A14)
    if (StarA14Positions && StarA14Positions.length > 0) {
        // 初始化三維數組
        Star_A14 = Array(12).fill().map(() => Array(12).fill().map(() => []));
        
        // 填充數據
        StarA14Positions.forEach(item => {
            Star_A14[item.row_index][item.col_index].push(item.star_id);
        });
        console.log("主星位置數據格式化成功");
    } else {
        console.error("主星位置數據格式化失敗");
        throw new Error("主星位置數據無效");
    }

    // 格式化紫微諸星表 (Star_Z06)
    if (StarZ06Positions && StarZ06Positions.length > 0) {
        // 初始化二維數組
        Star_Z06 = Array(7).fill().map(() => Array(12).fill(0));
        
        // 填充數據
        StarZ06Positions.forEach(item => {
            Star_Z06[item.row_index][item.col_index] = item.position;
        });
        console.log("紫微諸星位置數據格式化成功");
    } else {
        console.error("紫微諸星位置數據格式化失敗");
        throw new Error("紫微諸星位置數據無效");
    }

    // 格式化天府諸星表 (Star_T08)
    if (StarT08Positions && StarT08Positions.length > 0) {
        // 初始化二維數組
        Star_T08 = Array(8).fill().map(() => Array(12).fill(0));
        
        // 填充數據
        StarT08Positions.forEach(item => {
            Star_T08[item.row_index][item.col_index] = item.position;
        });
        console.log("天府諸星位置數據格式化成功");
    } else {
        console.error("天府諸星位置數據格式化失敗");
        throw new Error("天府諸星位置數據無效");
    }

    // 格式化六吉星位置數據 (Star_G07)
    if (StarG07Positions && StarG07Positions.length > 0) {
        // 初始化二維數組
        Star_G07 = Array(7).fill().map(() => Array(12).fill(0));
        
        // 填充數據
        StarG07Positions.forEach(item => {
            Star_G07[item.row_index][item.col_index] = item.star_id;
        });
        console.log("六吉星位置數據格式化成功");
    } else {
        console.error("六吉星位置數據格式化失敗");
        throw new Error("六吉星位置數據無效");
    }

    // 格式化六凶星位置數據 (Star_B06)
    if (StarB06Positions && StarB06Positions.length > 0) {
        // 由於六凶星位置數據的特殊結構，需要特殊處理
        Star_B06 = Array(6).fill().map(() => []);
        
        // 填充數據
        StarB06Positions.forEach(item => {
            if (item.row_index === 2 || item.row_index === 3) {
                // 這些行是二維數組
                if (!Star_B06[item.row_index][Math.floor(item.col_index / 12)]) {
                    Star_B06[item.row_index][Math.floor(item.col_index / 12)] = [];
                }
                Star_B06[item.row_index][Math.floor(item.col_index / 12)][item.col_index % 12] = item.star_id;
            } else {
                // 這些行是一維數組
                Star_B06[item.row_index][item.col_index] = item.star_id;
            }
        });
        console.log("六凶星位置數據格式化成功");
    } else {
        console.error("六凶星位置數據格式化失敗");
        throw new Error("六凶星位置數據無效");
    }

    // 格式化雜曜位置數據 (Star_OS5)
    if (StarOS5Positions && StarOS5Positions.length > 0) {
        // 初始化二維數組
        Star_OS5 = Array(5).fill().map(() => Array(12).fill(0));
        
        // 填充數據
        StarOS5Positions.forEach(item => {
            Star_OS5[item.row_index][item.col_index] = item.position;
        });
        console.log("雜曜位置數據格式化成功");
    } else {
        console.error("雜曜位置數據格式化失敗");
        throw new Error("雜曜位置數據無效");
    }

    console.log("所有星曜位置數據格式化完成");
}

// 將函數導出，以便其他模塊使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatStarPositions
    };
} else {
    // 在瀏覽器環境中使用
    window.formatStarPositions = formatStarPositions;
}