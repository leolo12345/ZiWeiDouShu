// 三方四正和格局分析的輔助函數
// 這個文件之後會被整合到 ziweiui.js 中

// 獲取三方宮位 (同宮、對宮、三合)
function getSanfangPalaces(mingGongIndex) {
    console.log('獲取三方宮位，命宮索引:', mingGongIndex);
    
    // 同宮 (命宮本身)
    const tong = mingGongIndex;
    
    // 對宮 (命宮對面的宮位)
    const dui = (mingGongIndex + 6) % 12;
    
    // 三合 (地支三合)
    const sanhe1 = (mingGongIndex + 4) % 12;
    const sanhe2 = (mingGongIndex + 8) % 12;
    
    console.log('三方宮位結果:', {tong, dui, sanhe1, sanhe2});
    return [tong, dui, sanhe1, sanhe2];
}

// 獲取四正宮位 (同宮、對宮、刑、沖)
function getSizhengPalaces(mingGongIndex) {
    console.log('獲取四正宮位，命宮索引:', mingGongIndex);
    
    // 同宮 (命宮本身)
    const tong = mingGongIndex;
    
    // 對宮 (命宮對面的宮位)
    const dui = (mingGongIndex + 6) % 12;
    
    // 刑宮
    const xing = getXingPalace(mingGongIndex);
    
    // 沖宮
    const chong = (mingGongIndex + 3) % 12;
    
    console.log('四正宮位結果:', {tong, dui, xing, chong});
    return [tong, dui, xing, chong];
}

// 獲取刑宮 (地支相刑關係)
function getXingPalace(palaceIndex) {
    // 地支相刑關係: 子刑卯，丑刑戌，寅刑巳，辰刑辰，午刑午，未刑丑，申刑寅，酉刑酉，亥刑亥
    const xingMap = {
        0: 3,  // 子刑卯
        1: 10, // 丑刑戌
        2: 5,  // 寅刑巳
        4: 4,  // 辰自刑
        6: 6,  // 午自刑
        7: 1,  // 未刑丑
        8: 2,  // 申刑寅
        9: 9,  // 酉自刑
        11: 11 // 亥自刑
    };
    
    return xingMap[palaceIndex] !== undefined ? xingMap[palaceIndex] : palaceIndex;
}

// 輔助函數：分析宮位組合
async function analyzePalaceGroup(palaceIndices, groupType, places) {
    try {
        console.log(`分析${groupType}宮位組合:`, palaceIndices);
        
        // 獲取宮位名稱
        const palaceNames = palaceIndices.map(index => {
            const palace = places.find(p => p.palace.index === index);
            return palace ? palace.palace.name : `未知宮位(${index})`;
        });
        
        // 獲取宮位主星
        const palaceStars = palaceIndices.map(index => {
            const palace = places.find(p => p.palace.index === index);
            return palace ? palace.StarA.map(s => s.name).join(',') : '';
        });
        
        console.log(`${groupType}宮位分析:`, {palaceNames, palaceStars});
        
        // 生成分析內容
        return `
            <div class="relation-analysis-item">
                <h5>${groupType}宮位: ${palaceNames.join('、')}</h5>
                <div class="relation-detail">
                    ${palaceIndices.map((index, i) => `
                        <div class="palace-item">
                            <span class="palace-name">${palaceNames[i]}</span>
                            <span class="palace-stars">${palaceStars[i]}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } catch (error) {
        console.error(`${groupType}宮位分析失敗:`, error);
        return '';
    }
}

// 創建錯誤信息顯示
function createErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `<p>${message}</p>`;
    return errorDiv;
}

console.log('三方四正和格局分析函數載入完成');