/**
 * 紫微斗數分析助手函數
 * 提供格式化星曜分析和四化星分析的函數
 */

// 創建全局命名空間
window.analysisHelpers = (function() {
    
    /**
     * 格式化主星分析內容
     * @param {Array} analysisResults - 分析結果數組
     * @param {string} title - 分析標題
     * @returns {string} 格式化的HTML內容
     */
    function generateStarAnalysisContent(analysisResults, title) {
        if (!analysisResults || !Array.isArray(analysisResults) || analysisResults.length === 0) {
            return `<div class="analysis-section">
                <h4>${title || '主星'}分析</h4>
                <div class="no-analysis-data">命宮主星分析將在排盤後顯示...</div>
            </div>`;
        }

        console.log(`生成${title || '主星'}分析，共有${analysisResults.length}項結果`);
        
        return `
            <div class="analysis-section">
                <h4>${title || '主星'}分析</h4>
                <ul class="star-analysis-list">
                    ${analysisResults.map(item => `
                        <li class="star-analysis-item">${item}</li>
                    `).join('')}
                </ul>
            </div>
        `;
    }

    /**
     * 格式化四化星分析內容
     * @param {Array} sihuaResults - 四化星分析結果數組
     * @returns {string} 格式化的HTML內容
     */
    function generateSihuaAnalysisContent(sihuaResults) {
        console.log(`生成四化星分析，${sihuaResults ? sihuaResults.length : 0}項結果`);
        
        if (!sihuaResults || !Array.isArray(sihuaResults) || sihuaResults.length === 0) {
            return `
            <div class="analysis-section">
                <h4>四化星分析</h4>
                <div class="no-analysis-data">四化星分析將在排盤後顯示...</div>
            </div>`;
        }
        
        // 根據四化類型進行分組
        const grouped = {};
        sihuaResults.forEach(result => {
            const type = getTransformationType(result);
            if (!grouped[type]) {
                grouped[type] = [];
            }
            grouped[type].push(result);
        });

        // 按四化順序排列：祿、權、科、忌
        const order = ['祿', '權', '科', '忌'];
        const sortedKeys = Object.keys(grouped).sort((a, b) => {
            return order.indexOf(a) - order.indexOf(b);
        });

        return `
            <div class="analysis-section">
                <h4>四化星分析</h4>
                ${sortedKeys.length > 0 ? sortedKeys.map(type => `
                    <div class="sihua-group">
                        <h5>化${type}星</h5>
                        <ul class="sihua-analysis-list">
                            ${grouped[type].map(item => `
                                <li class="sihua-analysis-item">${item}</li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('') : '<div class="no-analysis-data">未找到四化星數據</div>'}
            </div>
        `;
    }

    /**
     * 生成擴展分析內容
     * 包含更完整的分析結構，如三方四正、特殊格局等
     */
    function generateExtendedAnalysis() {
        return `
        <div class="extended-analysis">
            <div class="analysis-section">
                <h4>命宮三方四正總格局分析</h4>
                <div class="no-analysis-data">三方四正總格局分析將在後續版本提供</div>
            </div>
            
            <div class="analysis-section">
                <h4>命宮三方四正六吉星和六煞星分析</h4>
                <div class="no-analysis-data">六吉星和六煞星分析將在後續版本提供</div>
            </div>
            
            <div class="analysis-section">
                <h4>紫微斗數的特殊格局分析</h4>
                <div class="no-analysis-data">特殊格局分析將在後續版本提供</div>
            </div>
            
            <div class="analysis-section">
                <h4>工作能力分析</h4>
                <div class="no-analysis-data">工作能力分析將在後續版本提供</div>
            </div>
            
            <div class="analysis-section">
                <h4>貼心小建議</h4>
                <div class="no-analysis-data">貼心小建議將在後續版本提供</div>
            </div>
        </div>`;
    }

    /**
     * 生成完整的分析內容
     * @param {Array} starResults - 主星分析結果
     * @param {Array} sihuaResults - 四化星分析結果
     * @returns {string} 完整的分析HTML內容
     */
    function generateFullAnalysisContent(starResults, sihuaResults) {
        return `
        <div class="full-analysis-content">
            <div class="section-a">
                <h3>A. 命宮與福德宮主星的基本分析</h3>
                ${generateStarAnalysisContent(starResults, '主星')}
            </div>
            
            <div class="section-b">
                <h3>B. 四化星分析</h3>
                ${generateSihuaAnalysisContent(sihuaResults)}
            </div>
            
            <div class="section-c">
                <h3>C. 命宮三方四正總格局分析</h3>
                <div class="no-analysis-data">三方四正總格局分析將在後續版本提供</div>
            </div>
            
            <div class="section-d">
                <h3>D. 命宮三方四正六吉星和六煞星分析</h3>
                <div class="no-analysis-data">六吉星和六煞星分析將在後續版本提供</div>
            </div>
            
            <div class="section-e">
                <h3>E. 紫微斗數的特殊格局分析</h3>
                <div class="no-analysis-data">特殊格局分析將在後續版本提供</div>
            </div>
            
            <div class="section-f">
                <h3>F. 工作能力分析</h3>
                <div class="no-analysis-data">工作能力分析將在後續版本提供</div>
            </div>
            
            <div class="section-g">
                <h3>G. 貼心小建議</h3>
                <div class="no-analysis-data">貼心小建議將在後續版本提供</div>
            </div>
        </div>`;
    }

    /**
     * 從四化星分析文本中提取四化類型
     * @param {string} text - 四化星分析文本
     * @returns {string} 四化類型（祿、權、科、忌）
     */
    function getTransformationType(text) {
        if (!text) return '其他';
        
        const types = ['祿', '權', '科', '忌'];
        for (const type of types) {
            if (text.includes(`化${type}`)) {
                return type;
            }
        }
        return '其他';
    }

    /**
     * 格式化格局分析內容
     * @param {Object} patternData - 格局分析數據
     * @returns {string} 格式化的HTML內容
     */
    function generatePatternAnalysisContent(patternData) {
        if (!patternData || Object.keys(patternData).length === 0) {
            return '<div class="no-analysis-data">格局分析暫無數據</div>';
        }

        return `
            <div class="pattern-analysis-section">
                <h4>格局分析</h4>
                <div class="pattern-content">
                    ${Object.entries(patternData).map(([patternName, description]) => `
                        <div class="pattern-item">
                            <div class="pattern-name">${patternName}</div>
                            <div class="pattern-description">${description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 導出函數
    return {
        generateStarAnalysisContent,
        generateSihuaAnalysisContent,
        generatePatternAnalysisContent,
        generateExtendedAnalysis,
        generateFullAnalysisContent,
        
        // 輔助方法
        parseAnalysisText: function(text) {
            if (!text) return { title: '', content: '' };
            
            const colonIndex = text.indexOf('：');
            if (colonIndex === -1) return { title: '', content: text };
            
            return {
                title: text.substring(0, colonIndex).trim(),
                content: text.substring(colonIndex + 1).trim()
            };
        },
        
        // 簡單格式化工具
        formatList: function(items, className = '') {
            if (!items || !Array.isArray(items) || items.length === 0) {
                return '<div class="empty-list">無數據</div>';
            }
            
            return `
                <ul class="${className}">
                    ${items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
        }
    };
})();

// 確保分析助手已載入的標誌
console.log('分析助手函數已載入 - 版本 1.1');