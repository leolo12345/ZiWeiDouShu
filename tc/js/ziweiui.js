/*紫微斗數 Chinese Astrology Zi Wei Dou Shu*/

// 獲取三方宮位 (同宮、對宮、三合)
function getSanfangPalaces(mingGongIndex) {
    console.log('獲取三方宮位，命宮索引:', mingGongIndex);
    
    // 命宮本身
    const ming = mingGongIndex;
    
    // 事業宮（命宮天干之陽干順二，陰干退十）
    const shiye = (mingGongIndex + 10) % 12;
    
    // 財帛宮（事業宮天干之陽干順二，陰干退十）
    const caibo = (shiye + 10) % 12;
    
    console.log('三方宮位結果:', {ming, shiye, caibo});
    return [ming, shiye, caibo];
}

// 獲取四正宮位 (同宮、對宮、刑、沖)
function getSizhengPalaces(mingGongIndex) {
    // 四正為三方加上遷移宮
    const sanfang = getSanfangPalaces(mingGongIndex);
    
    // 遷移宮（財帛宮天干之陽干順二，陰干退十）
    const qianyi = ((mingGongIndex + 10 + 10 + 10) % 12);
    
    console.log('四正宮位結果:', {
        三方: sanfang,
        遷移: qianyi
    });
    return [...sanfang, qianyi];
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

var ziweiUI = {
	//主星列印方向 true:由右向左,false:由左向右
	right2left:false,
	//UI resize
	resize:function (){
		//var wdth=$(window).width();
	  //$("#divZiWei").css("left",wdth>640?(wdth-640)/2:0);
	},
	genNowDateZiwei:function (){
		this.getNowDate();
		this.genZiwei();
	},
	getNowDate:function(){
		var Today=new Date();
		var h=Today.getHours();
		Today.setDate(Today.getDate()+(h>=23?1:0)); 
		document.getElementById("sel_Year").value=Today.getFullYear();
		document.getElementById("sel_Month").value=Today.getMonth()+1;
		document.getElementById("sel_Day").value=Today.getDate();
		document.getElementById("sel_Hour").value=EarthlyBranches[(h+(h%2?1:0))%24/2];
	},
	//initial    	  
	initial:function (){
	  //畫紫微斗數空表格
	  document.getElementById("container").innerHTML="<div class='zwDivHeader'><h2>紫微斗數命盤 </h2></div></div><div class='ziwei'><div id='zw6'></div><div id='zw7'></div><div id='zw8'></div><div id='zw9'></div><div id='zw5'></div><div id='zwHome' class='zwDivCenter'><div id='basicInfo'><div>國曆：<span id='solarDate'></span></div><div>農曆：<span id='lunarDate'></span></div><div>生肖：<span id='zodiac'></span></div><div>五行局：<span id='fiveElement'></span></div><div>陰陽性別：<span id='genderType'></span></div></div></div><div id='zw10'></div><div id='zw4'></div><div id='zw11'></div><div id='zw3'></div><div id='zw2'></div><div id='zw1'></div><div id='zw12'></div>";
	  function addOption(id,a,b){
	  	for (i=a;i<=b;i++){ 
				let op = document.createElement('option');
	      op.value = i;
	      op.innerHTML = i;
	      document.getElementById(id).appendChild(op);
			}
	  }
	  addOption("sel_Year",1900,2049);
	  addOption("sel_Month",1,12);
	  addOption("sel_Day",1,31);
	  for (i=0;i<EarthlyBranches.length;i++){ 
	  	let op = document.createElement('option');
	  	op.value = EarthlyBranches[i];
	    op.innerHTML = EarthlyBranches[i]+"【"+((24+(i*2-1))%24).toString()+"~"+ (i*2+1).toString()+"】";
	  	document.getElementById("sel_Hour").appendChild(op);
	  }
	  //初始日期
	  this.genNowDateZiwei();
	  this.resize();
	},
	clearPalce:function (){
		for (i=0;i<12;i++){ 
			document.getElementById("zw"+(i+1).toString()).innerHTML="<div class='MangA'>" +EarthlyBranches[i]+ "</div>";
		}
	},
	cleanZiwei:function (){
		//$("#zwHome").html("");
		document.getElementById("zwHome").innerHTML = "";
},
// 調用API獲取四化星分析
fetchSihuaAnalysis: async function(transformationType, star) {
    try {
        console.group(`[四化星分析] ${transformationType} - ${star}`);
        console.log('開始發送請求...');
        
        // 檢查參數有效性
        if (!transformationType || !star) {
            throw new Error('缺少必要參數');
        }
        
        const apiUrl = `http://localhost:3001/api/sihua-analysis?star=${encodeURIComponent(star)}&transformation_type=${encodeURIComponent(transformationType)}`;
        console.log('API URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            console.error('API請求失敗:', {
                status: response.status,
                statusText: response.statusText
            });
            throw new Error(`四化星分析API請求失敗: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('API回應數據:', data);
        
        const result = data.analysis || '無分析內容';
        console.log('處理後的分析結果:', result);
        console.groupEnd();
        return result;
    } catch (error) {
        console.error('四化星分析請求失敗:', {
            message: error.message,
            stack: error.stack
        });
        console.groupEnd();
        throw error;
    }
},

// 調用API獲取星曜分析
fetchStarAnalysis: async function(palace, star, elementId) {
    try {
        // 標準化宮位名稱格式（移除【】等特殊符號）
        const normalizedPalace = palace.replace(/[【】]/g, '');
        
        // 驗證輸入參數
        if (!normalizedPalace || !star) {
            throw new Error('缺少必要參數: palace或star');
        }

        // 建立分析區域容器
        let analysisContainer = document.getElementById('mingfu-analysis');
        let sanfangContainer = document.getElementById('sanfang-analysis');
        
        if (!analysisContainer) {
            analysisContainer = document.createElement('div');
            analysisContainer.id = 'mingfu-analysis';
            analysisContainer.className = 'star-analysis-container';
            document.getElementById('zwHome').appendChild(analysisContainer);
        }
        
        if (!sanfangContainer) {
            sanfangContainer = document.createElement('div');
            sanfangContainer.id = 'sanfang-analysis';
            sanfangContainer.className = 'star-analysis-container';
            // 將三方四正分析容器插入到命福分析容器之後
            // analysisContainer.parentNode.insertBefore(sanfangContainer, analysisContainer.nextSibling);
        }

        // 發送API請求並等待響應
        const apiUrl = `http://localhost:3001/api/star-analysis?palace=${encodeURIComponent(normalizedPalace)}&star=${encodeURIComponent(star)}`;
        
        const startTime = performance.now();
        const response = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const duration = performance.now() - startTime;
        
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`API請求失敗: ${response.status} - ${response.statusText}`);
        }

        // 解析響應數據（兼容JSON和純文本）
        let responseText = await response.text();
        
        let analysisText;
        try {
            // 嘗試解析為JSON
            const data = JSON.parse(responseText);
            analysisText = data.analysis || responseText;
        } catch {
            // 直接使用純文本
            analysisText = responseText;
        }
        
        // 確保分析文本有效
        analysisText = (analysisText || '無分析內容').trim();
        
        // 返回格式化結果
        const resultText = `${palace}  ${star}星分析: ${analysisText}`;
        //const resultText = `${analysisText}`;		
        return resultText;
    } catch (error) {
        
        const analysisElement = document.getElementById('mingfu-analysis');
        if (!analysisElement) {
        	return;
        }
        
        // 清除現有錯誤訊息避免重複
        const existingErrors = analysisElement.querySelectorAll('.error');
        existingErrors.forEach(el => el.remove());
        
        // 添加錯誤訊息
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.innerHTML = `
            <p>${palace} ${star}星分析載入失敗</p>
            <p>原因: ${error.message}</p>
            <p>請檢查控制台獲取詳細錯誤信息</p>
        `;
        analysisElement.appendChild(errorDiv);
        
        return null;
    }
},
	genZiwei: async function() {
		
		let gender=	document.querySelectorAll("input[type=radio]");
		let genderValue="M";
		for (i=0;i<gender.length;i++){
				if (gender[i].checked){
					genderValue=gender[i].value;
					break;
				}
		}
		const birthParams = {
			year: document.getElementById("sel_Year").value,
			month: document.getElementById("sel_Month").value,
			day: document.getElementById("sel_Day").value,
			hour: document.getElementById("sel_Hour").value,
			gender: genderValue
		};
		
		const startTime = performance.now();
		var zw = ziwei.computeZiWei(birthParams.year, birthParams.month, birthParams.day, birthParams.hour, birthParams.gender);
		
		// 填充星曜表格
		let tableBody = document.getElementById("star-table-body");
		tableBody.innerHTML = "";
		for (let i = 0; i < 12; i++) {
			let row = document.createElement("tr");
			
			// 天干地支
			let cell0 = document.createElement("td");
			cell0.textContent = zw[i].StemBranch;
			row.appendChild(cell0);
			
			// 安十二宮
			let cell1 = document.createElement("td");
			cell1.textContent = zw[i].MangB;
			row.appendChild(cell1);
			
			// 主星
			let cell2 = document.createElement("td");
			let mainStars = zw[i].StarA.filter(star => !star.startsWith("化"));
			cell2.textContent = mainStars.map(star => star.replace(/<[^>]*>/g, "").substring(0, 2)).join(", ");
			row.appendChild(cell2);
			
			// 四化星
			let cell3 = document.createElement("td");
			let sihua = zw[i].StarA.filter(star => star.length > 2).map(star => star.substring(2));
			cell3.textContent = sihua.join(", ");
			row.appendChild(cell3);
			
			// 六吉星
			let cell4 = document.createElement("td");
			cell4.textContent = zw[i].Star6.join(", ").replace(/<[^>]*>/g, "");
			row.appendChild(cell4);
			
			// 六凶星
			let cell5 = document.createElement("td");
			cell5.textContent = zw[i].StarB.join(", ");
			row.appendChild(cell5);

			// 輔星
			let cell6 = document.createElement("td");
			cell6.textContent = zw[i].StarC.join(", ");
			row.appendChild(cell6);
			
			tableBody.appendChild(row);
		}
		
		// 獲取命宮和福德宮的主星分析
		let mingStars = [];
		let fudeStars = [];
		let analysisResults = [];
		
		try {
			// 調試：輸出完整命盤數據

			// 獲取命宮位置（兼容【】格式）
			const mingPalace = zw.findIndex(palace =>
				palace.MangB.includes("命宮"));
			if (mingPalace !== -1) {
				// 獲取命宮主星（過濾掉化星）
				mingStars = zw[mingPalace].StarA
					.filter(star => !star.startsWith("化"))
					.map(star => {
						const cleanedStar = star.replace(/<[^>]*>/g, "").substring(0, 2);
						return cleanedStar;
					});
				
				// 調用API獲取命宮分析並等待結果
				
				const mingAnalysisResults = await Promise.all(mingStars.map(star => {
					return this.fetchStarAnalysis("命宮", star, 'mingfu-analysis');
				}));
				analysisResults.push(...mingAnalysisResults.filter(Boolean));
			}

			// 獲取福德宮位置（完全兼容DOM格式）
			const fudePalace = zw.findIndex(palace =>
				palace.MangB.includes("福德宮"));
			if (fudePalace !== -1) {
				// 獲取福德宮主星（過濾掉化星）
				fudeStars = zw[fudePalace].StarA
					.filter(star => !star.startsWith("化"))
					.map(star => {
						const cleanedStar = star.replace(/<[^>]*>/g, "").substring(0, 2);
						return cleanedStar;
					});
				
				// 調用API獲取福德宮分析並等待結果
				
				const fudeAnalysisResults = await Promise.all(fudeStars.map(star => {
					return this.fetchStarAnalysis("福德宮", star, 'mingfu-analysis');
				}));
				analysisResults.push(...fudeAnalysisResults.filter(Boolean));
			}

				        // 獲取命宮三方四正分析
				        const mingPalaceIndex = zw.findIndex(palace => palace.MangB.includes("命宮"));
				        if (mingPalaceIndex !== -1) {
				            // 獲取三方宮位
				            const sanfangIndices = getSanfangPalaces(mingPalaceIndex);
				            const sanfangResults = sanfangIndices.map(index => {
				                const palace = zw[index];
				                // 過濾主星
				                const stars = palace.StarA
				                    .filter(star => !star.startsWith("化"))
				                    .map(star => star.replace(/<[^>]*>/g, "").substring(0, 2));
				                
				                return {
				                    index: index,
				                    name: palace.MangB,
				                    stars: stars
				                };
				            });

				            // 獲取四正宮位
				            const sizhengIndices = getSizhengPalaces(mingPalaceIndex);
				            const sizhengResults = sizhengIndices.map(index => {
				                const palace = zw[index];
				                const stars = palace.StarA
				                    .filter(star => !star.startsWith("化"))
				                    .map(star => star.replace(/<[^>]*>/g, "").substring(0, 2));
				                
				                return {
				                    index: index,
				                    name: palace.MangB,
				                    stars: stars
				                };
				            });

				            // 生成三方四正分析HTML
				                        const analyzePalaceStars = (stars, palaceType) => {
				                            const analyses = stars.map(star => {
				                                let analysis = [];
				                                switch (palaceType) {
				                                    case '命宮':
				                                        switch (star) {
				                                            case '巨門':
				                                                analysis = [
				                                                    '在命宮主個性靈活變通',
				                                                    '口才出眾善於表達',
				                                                    '應變能力特別強'
				                                                ];
				                                                break;
				                                            case '紫微':
				                                                analysis = [
				                                                    '在命宮主一生尊貴榮耀',
				                                                    '性格端莊高潔有威儀',
				                                                    '人生多得貴人提攜'
				                                                ];
				                                                break;
				                                            case '天機':
				                                                analysis = [
				                                                    '在命宮主聰明智慧過人',
				                                                    '思維敏捷反應快速',
				                                                    '擅長規劃與決策'
				                                                ];
				                                                break;
				                                            case '太陽':
				                                                analysis = [
				                                                    '在命宮主性格開朗光明',
				                                                    '為人正直受人敬重',
				                                                    '容易得到長輩提攜'
				                                                ];
				                                                break;
				                                            case '武曲':
				                                                analysis = [
				                                                    '在命宮主性格剛毅',
				                                                    '做事果斷有魄力',
				                                                    '善於管理財務'
				                                                ];
				                                                break;
				                                            case '天同':
				                                                analysis = [
				                                                    '在命宮主性格溫和',
				                                                    '待人寬厚有同理心',
				                                                    '人緣良好易得支持'
				                                                ];
				                                                break;
				                                            case '廉貞':
				                                                analysis = [
				                                                    '在命宮主性格耿直',
				                                                    '有原則不隨波逐流',
				                                                    '重視道德操守'
				                                                ];
				                                                break;
				                                            case '天府':
				                                                analysis = [
				                                                    '在命宮主性情溫厚',
				                                                    '富貴安逸享福',
				                                                    '人生順遂少波折'
				                                                ];
				                                                break;
				                                            case '太陰':
				                                                analysis = [
				                                                    '在命宮主性格內斂',
				                                                    '直覺敏銳有智慧',
				                                                    '擅長處理細節'
				                                                ];
				                                                break;
				                                            case '貪狼':
				                                                analysis = [
				                                                    '在命宮主性格進取',
				                                                    '有野心追求成就',
				                                                    '人生充滿活力'
				                                                ];
				                                                break;
				                                            case '天相':
				                                                analysis = [
				                                                    '在命宮主慈祥和善',
				                                                    '樂於助人積德',
				                                                    '人緣好福運佳'
				                                                ];
				                                                break;
				                                            case '天梁':
				                                                analysis = [
				                                                    '在命宮主端莊正直',
				                                                    '性格開朗樂觀',
				                                                    '人格魅力強'
				                                                ];
				                                                break;
				                                            case '七殺':
				                                                analysis = [
				                                                    '在命宮主性格剛烈',
				                                                    '做事雷厲風行',
				                                                    '有領袖魄力'
				                                                ];
				                                                break;
				                                            case '破軍':
				                                                analysis = [
				                                                    '在命宮主獨特創新',
				                                                    '不甘平凡愛冒險',
				                                                    '人生起伏大'
				                                                ];
				                                                break;
				                                        }
				                                        break;
				                                    case '事業宮':
				                                        switch (star) {
				                                            case '巨門':
				                                                analysis = [
				                                                    '在事業宮主善於溝通談判',
				                                                    '事業發展需要智慧',
				                                                    '適合外交公關工作'
				                                                ];
				                                                break;
				                                            case '紫微':
				                                                analysis = [
				                                                    '在事業宮主官運亨通',
				                                                    '易得高位重用',
				                                                    '有領導統御能力'
				                                                ];
				                                                break;
				                                            case '天機':
				                                                analysis = [
				                                                    '在事業宮主謀略出眾',
				                                                    '善於掌握機會',
				                                                    '事業發展順遂'
				                                                ];
				                                                break;
				                                            case '太陽':
				                                                analysis = [
				                                                    '在事業宮主光明磊落',
				                                                    '事業平步青雲',
				                                                    '易得領導賞識'
				                                                ];
				                                                break;
				                                            case '武曲':
				                                                analysis = [
				                                                    '在事業宮主財富權位',
				                                                    '善理財有手腕',
				                                                    '適合經商從政'
				                                                ];
				                                                break;
				                                            case '天同':
				                                                analysis = [
				                                                    '在事業宮主和氣生財',
				                                                    '貴人運旺有助力',
				                                                    '適合服務業'
				                                                ];
				                                                break;
				                                            case '廉貞':
				                                                analysis = [
				                                                    '在事業宮主獨立自主',
				                                                    '做事有原則',
				                                                    '適合專業技術'
				                                                ];
				                                                break;
				                                            case '天府':
				                                                analysis = [
				                                                    '在事業宮主穩健發展',
				                                                    '財運亨通有積累',
				                                                    '適合金融地產'
				                                                ];
				                                                break;
				                                            case '太陰':
				                                                analysis = [
				                                                    '在事業宮主謀略深遠',
				                                                    '暗中有貴人助',
				                                                    '適合幕僚工作'
				                                                ];
				                                                break;
				                                            case '貪狼':
				                                                analysis = [
				                                                    '在事業宮主開拓進取',
				                                                    '事業上升快速',
				                                                    '適合銷售創業'
				                                                ];
				                                                break;
				                                            case '天相':
				                                                analysis = [
				                                                    '在事業宮主名利雙收',
				                                                    '得人信任支持',
				                                                    '適合公益慈善'
				                                                ];
				                                                break;
				                                            case '天梁':
				                                                analysis = [
				                                                    '在事業宮主正直受重',
				                                                    '工作穩定發展',
				                                                    '適合公職教育'
				                                                ];
				                                                break;
				                                            case '七殺':
				                                                analysis = [
				                                                    '在事業宮主權威顯赫',
				                                                    '事業發展迅速',
				                                                    '適合從政經商'
				                                                ];
				                                                break;
				                                            case '破軍':
				                                                analysis = [
				                                                    '在事業宮主創新求變',
				                                                    '適合自主創業',
				                                                    '事業有起伏'
				                                                ];
				                                                break;
				                                        }
				                                        break;
				                                    case '財帛宮':
				                                        switch (star) {
				                                            case '巨門':
				                                                analysis = [
				                                                    '在財帛宮主財運變化多端',
				                                                    '善於把握投資機會',
				                                                    '收入來源不固定'
				                                                ];
				                                                break;
				                                            case '紫微':
				                                                analysis = [
				                                                    '在財帛宮主富貴雙全',
				                                                    '理財能力出眾',
				                                                    '易得意外之財'
				                                                ];
				                                                break;
				                                            case '天機':
				                                                analysis = [
				                                                    '在財帛宮主財運靈活',
				                                                    '善於投資理財',
				                                                    '收入來源多元'
				                                                ];
				                                                break;
				                                            case '太陽':
				                                                analysis = [
				                                                    '在財帛宮主正財亨通',
				                                                    '財源穩定光明',
				                                                    '易得領導提拔'
				                                                ];
				                                                break;
				                                            case '武曲':
				                                                analysis = [
				                                                    '在財帛宮主財運亨通',
				                                                    '理財有道富裕',
				                                                    '適合投資理財'
				                                                ];
				                                                break;
				                                            case '天同':
				                                                analysis = [
				                                                    '在財帛宮主財運平穩',
				                                                    '人緣好易得財',
				                                                    '適合合作經營'
				                                                ];
				                                                break;
				                                            case '廉貞':
				                                                analysis = [
				                                                    '在財帛宮主財運波動',
				                                                    '投資需謹慎',
				                                                    '宜守成保守'
				                                                ];
				                                                break;
				                                            case '天府':
				                                                analysis = [
				                                                    '在財帛宮主財運極佳',
				                                                    '積累豐厚有福',
				                                                    '適合金融投資'
				                                                ];
				                                                break;
				                                            case '太陰':
				                                                analysis = [
				                                                    '在財帛宮主財運隱祕',
				                                                    '收益穩定漸增',
				                                                    '適合暗中運作'
				                                                ];
				                                                break;
				                                            case '貪狼':
				                                                analysis = [
				                                                    '在財帛宮主財運活躍',
				                                                    '善於開源進取',
				                                                    '適合創業投資'
				                                                ];
				                                                break;
				                                            case '天相':
				                                                analysis = [
				                                                    '在財帛宮主財運福佑',
				                                                    '得財有道順遂',
				                                                    '適合穩健投資'
				                                                ];
				                                                break;
				                                            case '天梁':
				                                                analysis = [
				                                                    '在財帛宮主財運平順',
				                                                    '收入穩定持久',
				                                                    '適合固定工作'
				                                                ];
				                                                break;
				                                            case '七殺':
				                                                analysis = [
				                                                    '在財帛宮主財運強勁',
				                                                    '善於開拓財源',
				                                                    '適合大額投資'
				                                                ];
				                                                break;
				                                            case '破軍':
				                                                analysis = [
				                                                    '在財帛宮主財運變化',
				                                                    '投資需謹慎',
				                                                    '宜避免風險'
				                                                ];
				                                                break;
				                                        }
				                                        break;
				                                    case '遷移宮':
				                                        switch (star) {
				                                            case '巨門':
				                                                analysis = [
				                                                    '在遷移宮主移動頻繁',
				                                                    '適應能力特別強',
				                                                    '善於開拓新環境'
				                                                ];
				                                                break;
				                                            case '紫微':
				                                                analysis = [
				                                                    '在遷移宮主動則有利',
				                                                    '遷移調動皆吉',
				                                                    '外出發展順遂'
				                                                ];
				                                                break;
				                                            case '天機':
				                                                analysis = [
				                                                    '在遷移宮主機動靈活',
				                                                    '適應力強善變通',
				                                                    '出外發展有利'
				                                                ];
				                                                break;
				                                            case '太陽':
				                                                analysis = [
				                                                    '在遷移宮主遷移順遂',
				                                                    '外出有貴人助',
				                                                    '適合異地發展'
				                                                ];
				                                                break;
				                                            case '武曲':
				                                                analysis = [
				                                                    '在遷移宮主外出得財',
				                                                    '調動升遷順利',
				                                                    '適合外派工作'
				                                                ];
				                                                break;
				                                            case '天同':
				                                                analysis = [
				                                                    '在遷移宮主遷移平順',
				                                                    '人際關係良好',
				                                                    '外出有貴人助'
				                                                ];
				                                                break;
				                                            case '廉貞':
				                                                analysis = [
				                                                    '在遷移宮主獨立自主',
				                                                    '遷移變動較多',
				                                                    '宜審慎而行'
				                                                ];
				                                                break;
				                                            case '天府':
				                                                analysis = [
				                                                    '在遷移宮主遷移有利',
				                                                    '外出能得財富',
				                                                    '適合異地發展'
				                                                ];
				                                                break;
				                                            case '太陰':
				                                                analysis = [
				                                                    '在遷移宮主遷移隱密',
				                                                    '調動變化多端',
				                                                    '宜靜觀待變'
				                                                ];
				                                                break;
				                                            case '貪狼':
				                                                analysis = [
				                                                    '在遷移宮主遷移頻繁',
				                                                    '外出機會眾多',
				                                                    '適合創業發展'
				                                                ];
				                                                break;
				                                            case '天相':
				                                                analysis = [
				                                                    '在遷移宮主遷移平安',
				                                                    '外出有貴人助',
				                                                    '適合穩定發展'
				                                                ];
				                                                break;
				                                            case '天梁':
				                                                analysis = [
				                                                    '在遷移宮主遷移安定',
				                                                    '調動升遷順利',
				                                                    '適合公職發展'
				                                                ];
				                                                break;
				                                            case '七殺':
				                                                analysis = [
				                                                    '在遷移宮主動則有成',
				                                                    '調動升遷迅速',
				                                                    '適合創業發展'
				                                                ];
				                                                break;
				                                            case '破軍':
				                                                analysis = [
				                                                    '在遷移宮主變動頻繁',
				                                                    '遷移機會眾多',
				                                                    '宜審慎而行'
				                                                ];
				                                                break;
				                                        }
				                                        break;
				                                }
				                                return `[${star}]: ${analysis.join(' ')}`;
				                            });
				                            return `<div class="star-analysis-section" bis_skin_checked="1"><h3>${palaceType}分析</h3> ${analyses.join(' ')}</div>`;
				                        };

				                        const sanfangSizhengHTML = `
				                                    ${sizhengResults.map((palace, index) => {
				                                        const palaceType = index === 0 ? '命宮' :
				                                                         index === 1 ? '事業宮' :
				                                                         index === 2 ? '財帛宮' : '遷移宮';
				                                        return `
				                                                <div class="palace-stars-analysis">
				                                                    ${analyzePalaceStars(palace.stars, palaceType)}
				                                                </div>
				                                        `;
				                                    }).join('')}
				                        `;
				            // 更新三方四正分析容器
				            const sanfangContainer = document.getElementById('geju-analysis');
				            if (sanfangContainer) {
				                sanfangContainer.innerHTML = sanfangSizhengHTML;
				            }
				        }
			
			// 確保所有分析完成後更新UI
			// 確保使用正確的分析容器
			const analysisContainer = document.getElementById('mingfu-analysis');
			if (!analysisContainer) {
				return;
			}
				
			// 更新命盤中心的基本資訊
			// 更新中央基本資訊
			document.getElementById('solarDate').textContent = ziwei.getSolarDay();
			document.getElementById('lunarDate').textContent = ziwei.getLunarDay();
			document.getElementById('zodiac').textContent = ziwei.getShengXiao();
			document.getElementById('fiveElement').textContent = ziwei.getFiveElement();
			document.getElementById('genderType').textContent = ziwei.getYinYangGender();

			// 更新標題下方基本資訊
			document.getElementById('solar-info').textContent = ziwei.getSolarDay();
			document.getElementById('lunar-info').textContent = ziwei.getLunarDay();
			document.getElementById('zodiac-info').textContent = ziwei.getShengXiao();
			document.getElementById('fiveElement-info').textContent = ziwei.getFiveElement();
			document.getElementById('genderType-info').textContent = ziwei.getYinYangGender();

			let htmlContent = '';
			// 添加四化星分析區域
			let sihuaAnalysisContainer = document.createElement('tr');
			sihuaAnalysisContainer.innerHTML = '<td id="sihua-analysis" style="padding-left:20px;"></td>';
			document.getElementById('mingfu-analysis').parentNode.nextElementSibling.appendChild(sihuaAnalysisContainer);

			// 獲取四化星分析
			try {
				console.log('開始處理四化星分析...');
				const transformationTypes = ['化祿', '化權', '化科', '化忌'];
				let sihuaResults = [];
				
				for (const type of transformationTypes) {
					for (let i = 0; i < 12; i++) {
						// 使用正則表達式找出四化星
						const stars = zw[i].StarA.filter(star => star.includes(type));
						for (const star of stars) {
							// 去掉"化"字以匹配數據庫中的格式
							const transformationType = type.replace('化', '');
							// 清理星曜名稱，只保留前兩個字
							const cleanedStar = star.replace(/<[^>]*>/g, "").substring(0, 2);
							console.group('處理四化星');
							console.log('原始星曜:', star);
							console.log('清理後星曜:', cleanedStar);
							console.log('四化類型:', type);
							const analysis = await this.fetchSihuaAnalysis(transformationType, cleanedStar);
							if (analysis) {
								sihuaResults.push({type, star: cleanedStar, analysis});
							}
						}
					}
				}
				
				// 更新四化星分析顯示
				const sihuaContainer = document.getElementById('sihua-analysis');
				if (sihuaContainer && sihuaResults.length > 0) {
					const sihuaHTML = sihuaResults.map(({type, star, analysis}) => `
						<div class="star-analysis-section">
							<h3>${type}分析</h3>
							<div class="star-analysis-content">${star}: ${analysis}</div>
						</div>
					`).join('');
					sihuaContainer.innerHTML = sihuaHTML;
				}
			} catch (error) {
				console.error('四化星分析失敗:', error);
				const sihuaContainer = document.getElementById('sihua-analysis');
				if (sihuaContainer) {
					sihuaContainer.innerHTML = `
					    <div class="error">
					        <p>四化星分析載入失敗</p>
					        <p>錯誤原因: ${error.message}</p>
					    </div>`;
					console.error('完整錯誤信息:', error);
				}
			}

			if (analysisResults.length > 0) {
				htmlContent += analysisResults.map(text => {
					if (typeof text === 'string') {
						// 提取宮位和星曜名稱
						const palaceMatch = text.match(/(.*宮) (.*星)/);
						if (palaceMatch) {
							const palace = palaceMatch[1];
							const star = palaceMatch[2];
							// const analysis = text.replace(`${palace} ${star}分析: `, '');
							const analysis = ''.concat(star+':',  text.substring( text.indexOf(':') + 1 ).trim() );
							return `
								<div class="star-analysis-section">
									<h3>${palace}基本分析</h3>
									<div class="star-analysis-content">${analysis}</div>
								</div>
							`;
						}
						return `<div class="star-analysis-item">${text}</div>`;
					}
					return '';
				}).join('');
			} else if (mingStars.length > 0 || fudeStars.length > 0) {
				htmlContent += `
					<div class="star-analysis-section">
						<h3>命宮分析</h3>
						<div class="star-analysis-content">無分析資料</div>
					</div>
				`;
			}
						
			// 使用已宣告的analysisContainer變數更新內容
			if (analysisContainer) {
				analysisContainer.innerHTML = htmlContent;
			} else {
			}
		} catch (e) {
		}
	  //render Direction
		var styleLR=[" zwStarLeft"," zwStarRight"];
		if(this.right2left){ styleLR.reverse(); }
		//render Star
	    for (i=0;i<12;i++){
	  		document.getElementById("zw"+(i+1).toString()).innerHTML+=    
	  				"<div class='MangA'>" + zw[i].MangA + "</div>" +
	  			"<div class='StemBranch'>" + zw[i].StemBranch + "</div>" +
	  			"<div class='MangB'>" + zw[i].MangB + "</div>" +
						"<div class='MangC'>" + zw[i].MangC + "</div>" +
						"<div class='StarAll'>" + zw[i].StarAll + "</div>" ;
	  		var StarA1,StarA2,StarA3,StarB1,StarB2,StarC1,StarC2;
	  		StarA1="";StarA2="";StarA3="";StarB1="";StarB2="";StarC1="";StarC2="";
			var tmpSatrA=[[],[],[]];
			var k=0;
			for (j=0;j<zw[i].StarA.length;j++){
				tmpSatrA[0][k]=zw[i].StarA[j].substring(0,1);
	  			tmpSatrA[1][k]=zw[i].StarA[j].substring(1,2);
	  			tmpSatrA[2][k]=(zw[i].StarA[j].length>2)?"<span>"+zw[i].StarA[j].substring(3,4)+"</span>":"　";
				k+=1;
			}	
			for (j=0;j<zw[i].Star6.length;j++){
		  		tmpSatrA[0][k]="<span>"+zw[i].Star6[j].substring(0,1)+"</span>"
		  		tmpSatrA[1][k]="<span>"+zw[i].Star6[j].substring(1,2)+"</span>"
		  		tmpSatrA[2][k]=(zw[i].Star6[j].length>2)?"<span>"+zw[i].Star6[j].substring(3,4)+"</span>":"　";
				k+=1;
			}
			//style Left or Right
			if(this.right2left){
				for(j=0;j<3;j++){ tmpSatrA[j].reverse(); }
			}
			//render StarA & B & C
	  		for (j=0;j<tmpSatrA[0].length;j++){
				StarA1+=tmpSatrA[0][j];
	  			StarA2+=tmpSatrA[1][j];
	  			StarA3+=tmpSatrA[2][j];
	  		}
	  		for (j=0;j<zw[i].StarB.length;j++){
	  			StarB1+=zw[i].StarB[j].substring(0,1);
	  			StarB2+=zw[i].StarB[j].substring(1,2);
				}
	  		for (j=0;j<zw[i].StarC.length;j++){
	  			StarC1+=zw[i].StarC[j].substring(0,1);
	  			StarC2+=zw[i].StarC[j].substring(1,2);
		  	}
				document.getElementById("zw"+(i+1).toString()).innerHTML+=
						"<div class='StarA"+ styleLR[0] + "'>" + StarA1+ "<br>"+StarA2 + "<br><div class='Star4'>"+StarA3 + "</div></div>" +
	  				"<div class='StarB"+ styleLR[1] + "'>" + StarB1+ "<br>"+StarB2 + "</div>" +
	  				"<div class='StarC'>" + StarC1+ "<br>"+StarC2 + "</div>";
		}
		//大小限表
		var DS_Shian=ziwei.getDaShian();
		for (i=0;i<12;i++){
			document.getElementById("zw"+(i+1).toString()).innerHTML+=
					"<div class='MangY10'>"+ DS_Shian.DShian[i+1] + "</div>" +
					"<div class='MangY1'>" + DS_Shian.SShian[i+1] + "</div>" ;
		}
	}
};
window.addEventListener('load' ,function(){
//開始使用
	ziweiUI.initial();
	document.querySelector("input[type=button]").addEventListener('click',async function () {
		try {
			await ziweiUI.genZiwei();
		} catch (e) {
		} finally {
			console.groupEnd();
		}
	});
	let s = document.querySelectorAll("select");
	for (i=0;i<s.length;i++){
		s[i].addEventListener('change',async function () {
			try {
				await ziweiUI.genZiwei();
			} catch (e) {
			} finally {
				console.groupEnd();
			}
		});
	}
	let r=document.querySelectorAll("input[type=radio]");
	for (i=0;i<r.length;i++){
		r[i].addEventListener('change',async function () {
			try {
				await ziweiUI.genZiwei();
			} catch (e) {
			} finally {
				console.groupEnd();
			}
		});
	}
	window.addEventListener('resize',function() { ziweiUI.resize();});
	//$(window).resize(function() { ziweiUI.resize();});
});

// 添加以下内容强制识别为JavaScript
if (typeof ziweiUI !== 'undefined') {
}