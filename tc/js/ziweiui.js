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
            analysisContainer.parentNode.insertBefore(sanfangContainer, analysisContainer.nextSibling);
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
				                                let analysis = '';
				                                switch (star) {
				                                    case '紫微': analysis = '主權貴尊榮'; break;
				                                    case '天機': analysis = '主聰明智慧'; break;
				                                    case '太陽': analysis = '主光明正氣'; break;
				                                    case '武曲': analysis = '主財帛權威'; break;
				                                    case '天同': analysis = '主和善化凶'; break;
				                                    case '文昌': analysis = '主文書才華'; break;
				                                    case '天梁': analysis = '主端正清高'; break;
				                                    case '巨門': analysis = '主口才辯析'; break;
				                                    case '貪狼': analysis = '主欲望進取'; break;
				                                    case '太陰': analysis = '主陰柔暗藏'; break;
				                                    case '天相': analysis = '主仁慈福德'; break;
				                                    case '廉貞': analysis = '主剛直固執'; break;
				                                    case '破軍': analysis = '主變革創新'; break;
				                                    case '七殺': analysis = '主權威剛強'; break;
				                                    case '天府': analysis = '主富貴祿位'; break;
				                                    default: analysis = '星曜待分析';
				                                }
				                                return `[${star}]:${analysis}`;
				                            });
				                            return `${palaceType} ${analyses.join(' ')}`;
				                        };

				                        const sanfangSizhengHTML = `
				                            <div class="star-analysis-section">
				                                <div class="palace-analysis-column">三方四正總格局分析
				                                    ${sizhengResults.map((palace, index) => {
				                                        const palaceType = index === 0 ? '命宮:' :
				                                                         index === 1 ? '事業宮:' :
				                                                         index === 2 ? '財帛宮:' : '遷移宮:';
				                                        return `<div class="palace-row">${analyzePalaceStars(palace.stars, palaceType)}</div>`;
				                                    }).join('')}
				                                </div>
				                            </div>
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
			document.getElementById('solarDate').textContent = ziwei.getSolarDay();
			document.getElementById('lunarDate').textContent = ziwei.getLunarDay();
			document.getElementById('zodiac').textContent = ziwei.getShengXiao();
			document.getElementById('fiveElement').textContent = ziwei.getFiveElement();
			document.getElementById('genderType').textContent = ziwei.getYinYangGender();

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