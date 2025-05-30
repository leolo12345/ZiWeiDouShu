/*紫微斗數 Chinese Astrology Zi Wei Dou Shu*/
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
	  //document.getElementById("container").innerHTML="<div id='queryDiv'><h2>紫微斗數命盤</h2><div>西元<select id='sel_Year'></select> 年<select id='sel_Month'></select> 月<select id='sel_Day'></select> 日<select id='sel_Hour'></select> 時<input type='radio' id='gender' name='gender' value='M' checked>男<input type='radio' name='gender' value='F'>女<input type='button' value='現在時間*' id='btnNowDate'></div></div><div class='ziwei'><div><div id='zw6'></div><div id='zw7'></div><div id='zw8'></div><div id='zw9'></div></div><div><div id='zw5'></div><div id='zw4'></div><div id='zwHome' class='zwDivCenter'></div><div id='zw10'></div><div id='zw11'></div></div><div><div id='zw3'></div><div id='zw2'></div><div id='zw1'></div><div id='zw12'></div></div></div>";
	  document.getElementById("container").innerHTML="<div class='zwDivHeader'><h2>紫微斗數命盤 </h2></div></div><div class='ziwei'><div id='zw6'></div><div id='zw7'></div><div id='zw8'></div><div id='zw9'></div><div id='zw5'></div><div id='zwHome' class='zwDivCenter'></div><div id='zw10'></div><div id='zw4'></div><div id='zw11'></div><div id='zw3'></div><div id='zw2'></div><div id='zw1'></div><div id='zw12'></div>";
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
// 調用API獲取星曜分析
fetchStarAnalysis: async function(palace, star, elementId) {
    try {
        // 標準化宮位名稱格式（移除【】等特殊符號）
        const normalizedPalace = palace.replace(/[【】]/g, '');
        
        // 驗證輸入參數
        if (!normalizedPalace || !star) {
            throw new Error('缺少必要參數: palace或star');
        }

        // 確保分析區域存在
        let analysisContainer = document.getElementById('mingfu-analysis');
        if (!analysisContainer) {
            analysisContainer = document.createElement('div');
            analysisContainer.id = 'mingfu-analysis';
            analysisContainer.className = 'star-analysis-container';
            document.getElementById('zwHome').appendChild(analysisContainer);
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
			
			// 確保所有分析完成後更新UI
			// 確保使用正確的分析容器
			const analysisContainer = document.getElementById('mingfu-analysis');
			if (!analysisContainer) {
				return;
			}
				
			// 等待所有分析完成後構建HTML內容
			let htmlContent = "<div class='basic-info'>";

/*			+ "<h3>基本資訊</h3>"
				+ "國曆：" + ziwei.getSolarDay() + "<br>"
				+ "農曆：" + ziwei.getLunarDay()+ "<br>"
				+ "生肖：【" + ziwei.getShengXiao() + "】"+"<br>"
				+ "<div>"+ ziwei.getFiveElement() +"</div>"
				+ "<div>"+ ziwei.getYinYangGender()+"</div>"
				+ "</div>";
*/			
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
			console.groupEnd();
		}
		
		// 添加四化星分析
		try {
			// 獲取命宮和福德宮的四化星
			const mingPalace = zw.findIndex(p => p.MangB.includes("命宮"));
			const fudePalace = zw.findIndex(p => p.MangB.includes("福德宮"));
			
			let sihuaResults = [];
			
			// 處理命宮四化星
			if (mingPalace !== -1) {
				const mingSihua = zw[mingPalace].StarA
					.filter(star => star.startsWith("化"))
					.map(star => star.substring(0, 2))
				
				const mingSihuaAnalysis = await Promise.all(mingSihua.map(star =>
					this.fetchStarAnalysis("命宮", star, 'mingfu-analysis')
				));
				sihuaResults.push(...mingSihuaAnalysis.filter(Boolean));
			}
			
			// 處理福德宮四化星
			if (fudePalace !== -1) {
				const fudeSihua = zw[fudePalace].StarA
					.filter(star => star.startsWith("化"))
					.map(star => star.substring(0, 2))
				
				const fudeSihuaAnalysis = await Promise.all(fudeSihua.map(star =>
					this.fetchStarAnalysis("福德宮", star, 'mingfu-analysis')
				));
				sihuaResults.push(...fudeSihuaAnalysis.filter(Boolean));
			}
			
			// 更新UI顯示四化星分析
			if (sihuaResults.length > 0) {
				const analysisContainer = document.getElementById('mingfu-analysis');
				if (analysisContainer) {
					const sihuaHtml = sihuaResults.map(text => {
						if (typeof text === 'string') {
							const palaceMatch = text.match(/(.*宮) (.*星)/);
							if (palaceMatch) {
								const palace = palaceMatch[1];
								const star = palaceMatch[2];
								const analysis = ''.concat(star+':', text.substring(text.indexOf(':') + 1).trim());
								return `
									<div class="star-analysis-section">
										<h3>${palace}四化分析</h3>
										<div class="star-analysis-content">${analysis}</div>
									</div>
								`;
							}
							return `<div class="star-analysis-item">${text}</div>`;
						}
						return '';
					}).join('');
					
					analysisContainer.innerHTML += sihuaHtml;
				}
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
	}
});
	let s = document.querySelectorAll("select");
	for (i=0;i<s.length;i++){
		s[i].addEventListener('change',async function () {
			try {
				await ziweiUI.genZiwei();
			} catch (e) {
			} finally {
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
			}
		});
	}
	window.addEventListener('resize',function() { ziweiUI.resize();});
	//$(window).resize(function() { ziweiUI.resize();});
});

// 添加以下内容强制识别为JavaScript
if (typeof ziweiUI !== 'undefined') {
}