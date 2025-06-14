-- 紫微斗數星曜分析資料表
CREATE TABLE IF NOT EXISTS star_analysis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    palace TEXT NOT NULL,  -- 宮位名稱
    star TEXT NOT NULL,    -- 主星名稱
    analysis TEXT NOT NULL, -- 分析內容
    UNIQUE(palace, star)
);

-- 插入12宮位14主星分析資料
INSERT OR IGNORE INTO star_analysis (palace, star, analysis) VALUES
-- 命宮(1)
('命宮', '紫微', '領導格局強，自尊心高，需左輔右弼扶持方能成大局。適合管理職位，但需注意剛愎自用。與天府同宮可增穩重，遇煞星則易孤高。'),
('命宮', '天機', '聰明靈活反應快，善謀略但多思多慮。適合從事策劃、顧問工作。流年遇天機主變動，需注意決策反覆。與天梁同宮可增穩定性。'),
('命宮', '太陽', '光明磊落個性積極，重名譽好面子。白天生人太陽旺，事業發展佳；夜晚生人則需加倍努力。適合教育、公關等陽光行業，防過度勞心。'),
('命宮', '武曲', '剛毅果決行動力強，重實際利益。理財能力佳，適合金融、技術領域。女命武曲稍嫌剛強，需配柔和星曜調和。逢化祿財運亨通。'),
('命宮', '天同', '溫和善良人緣佳，享受生活略顯懶散。福星高照但需激發鬥志。適合服務、休閒產業。與天梁同宮可增智慧，逢煞星則易消極。'),
('命宮', '廉貞', '感情豐富複雜多變，才華洋溢防桃花。適合藝術、娛樂行業。化忌時易有官非，需謹言慎行。與天府同宮可制其蕩，增穩定性。'),
('命宮', '天府', '穩重保守理財佳，有庫存觀念略固執。女命天府旺夫益子。適合行政、財務工作。逢祿存財庫豐盈，遇煞星則易小氣計較。'),
('命宮', '太陰', '細膩敏感重感情，利文職藝術工作。夜晚生人太陰旺，心思縝密；白天生人則需培養耐心。化忌時防情緒困擾，需多戶外活動。'),
('命宮', '貪狼', '多才多藝交際廣，慾望強學習力佳。桃花星需防沉迷享樂。適合業務、外交工作。逢火鈴可轉化為積極動力，成就非凡。'),
('命宮', '巨門', '口才佳善分析，直言不諱防口舌。適合法律、評論工作。化祿時靠口才得財，化忌則是非多。與太陽同宮可化解暗性。'),
('命宮', '天相', '穩重輔助重信譽，服務性強調和諧。適合秘書、協調工作。逢天府增其穩，遇刑忌則易優柔寡斷。衣著講究重形象。'),
('命宮', '天梁', '清高正直有貴人，略孤僻好研究。適合醫療、宗教工作。蔭星能逢凶化吉。與天同同宮福壽雙全，逢煞星則愛說教。'),
('命宮', '七殺', '果斷衝勁開創力強，勇於改革防衝動。適合軍警、工程工作。逢紫微可為良將，獨坐則需注意人際關係。化權時權力大增。'),
('命宮', '破軍', '破舊立新變動大，消耗多需節制。適合創新、改革領域。逢祿存可積財，遇煞星則勞碌。與天梁同宮可增穩，減少破壞性。'),

-- 兄弟宮(2)
('兄弟宮', '紫微', '兄弟有領導力，相處較嚴肅重規矩。長兄如父型，遇吉星可獲提攜。逢煞星則易權威管教，需注意溝通方式。與天府同宮兄弟成就高。'),
('兄弟宮', '天機', '兄弟聰明反應快，但互動多變易爭執。適合保持適當距離，各忙各的事業。逢化忌需防金錢糾紛，文書往來要明確。'),
('兄弟宮', '太陽', '兄弟熱情開朗，事業有成就助益大。男性兄弟緣佳，遇凶星則防強勢干涉。白天生人兄弟助力強，夜晚生人需主動聯繫。'),
('兄弟宮', '武曲', '兄弟獨立性強，重實際利益少情感交流。金錢往來要分明，適合事業合作。逢祿存兄弟理財佳，遇煞星則易因財失和。'),
('兄弟宮', '天同', '兄弟和睦互助性強，但需防過度依賴。遇困難時最能獲得兄弟支持。逢吉星兄弟情深，遇煞星則易被拖累。'),
('兄弟宮', '廉貞', '兄弟緣分特殊，關係複雜防競爭比較。可能有同父異母或收養關係。逢桃花星需防感情糾葛，適合保持適當距離。'),
('兄弟宮', '天府', '兄弟穩重可靠，事業有成較少聯繫。關鍵時刻能得助力，平常各忙各的。逢祿存兄弟財運佳，遇煞星則防吝嗇小氣。'),
('兄弟宮', '太陰', '兄弟細心體貼，女性兄弟緣分佳。適合心靈交流，防過度敏感多疑。夜晚生人兄弟助力大，化忌時防情緒困擾。'),
('兄弟宮', '貪狼', '兄弟活潑交際廣，朋友多人脈豐富。需防金錢借貸糾紛，合夥要謹慎。逢火鈴兄弟成就非凡，遇桃花星則防複雜關係。'),
('兄弟宮', '巨門', '兄弟口才佳善辯，易有口舌是非爭執。適合從事法律、銷售行業。化祿時靠口才得財，化忌則家庭紛爭多。'),
('兄弟宮', '天相', '兄弟規矩有禮，關係和諧少衝突。重視家庭聚會，逢年過節團圓。逢天府增穩重，遇煞星則易優柔寡斷。'),
('兄弟宮', '天梁', '兄弟成熟穩重，有責任感但代溝可能。長兄如父型，遇困難能得指點。逢煞星則愛說教，需耐心溝通。'),
('兄弟宮', '七殺', '兄弟獨立自主，關係直接防衝突。各忙事業聚少離多，逢吉星可合作開創。遇煞星則競爭激烈，需保持距離。'),
('兄弟宮', '破軍', '兄弟變動大，可能早離家或海外發展。需包容不同生活方式，逢祿存可獲經濟支持。遇煞星則關係疏遠。'),

-- 夫妻宮(3)
('夫妻宮', '紫微', '配偶強勢有領導力，婚姻重地位名聲。男命得賢內助，女命配偶成就高。逢左輔右弼婚姻穩定，遇煞星則防配偶專制。適合晚婚，早婚易有摩擦。'),
('夫妻宮', '天機', '配偶聰明靈活，但感情變化需防不定。宜找年齡差距大或外鄉人。逢化忌防婚變，需培養共同興趣。與天梁同宮可增穩定性。'),
('夫妻宮', '太陽', '配偶熱情開朗，婚姻光明但防強勢。男命得妻助，女命防妻奪夫權。白天生人婚姻佳，夜晚生人需多包容。逢煞星防配偶過度外向。'),
('夫妻宮', '武曲', '配偶務實能幹，婚姻穩定但缺情趣。重視物質基礎，適合共同創業。逢化祿財運佳，遇煞星則防冷戰。女命武曲坐夫妻宮稍嫌剛硬。'),
('夫妻宮', '天同', '配偶溫柔體貼，婚姻和諧但防懶散。重視生活享受，需激發上進心。逢吉星婚姻幸福，遇煞星則防依賴性強。適合找性格互補對象。'),
('夫妻宮', '廉貞', '配偶魅力強，感情複雜需防第三者。婚姻多考驗，需真誠相待。逢桃花星防外遇，化忌時防官非。與天府同宮可制其蕩性。'),
('夫妻宮', '天府', '配偶穩重可靠，婚姻平順但較保守。重視家庭穩定，財務觀念佳。逢祿存配偶理財強，遇煞星則防過度節儉。適合長期婚姻關係。'),
('夫妻宮', '太陰', '配偶細心體貼，感情深厚防敏感。女命得夫寵，男命配偶賢淑。夜晚生人婚姻佳，化忌時防情緒困擾。需多溝通避免誤會。'),
('夫妻宮', '貪狼', '配偶多才多藝，感情豐富防桃花。宜晚婚，早婚易生變。逢火鈴可轉化為創造力，遇桃花星則防複雜關係。需培養共同價值觀。'),
('夫妻宮', '巨門', '配偶直言不諱，需防口舌爭執。適合聚少離多，朝夕相處易摩擦。化祿時靠配偶口才得利，化忌則家庭紛爭多。需學習溝通技巧。'),
('夫妻宮', '天相', '配偶端莊得體，婚姻和諧重形象。重視社交禮儀，家庭觀念強。逢天府增穩重，遇刑忌則防優柔寡斷。適合找性格穩定的對象。'),
('夫妻宮', '天梁', '配偶成熟穩重，有長輩緣防代溝。可能年齡差距大，或配偶像長輩。逢煞星則愛說教，需耐心溝通。婚姻多經介紹而成。'),
('夫妻宮', '七殺', '配偶個性強勢，感情激烈防衝突。適合各自有事業空間。逢紫微可為良配，獨坐則需包容。化權時配偶權力大，需平衡關係。'),
('夫妻宮', '破軍', '配偶變動大，婚姻需多包容適應。可能再婚或配偶職業特殊。逢祿存可穩定關係，遇煞星則防離異。適合找性格互補的對象。'),

-- 以下繼續其他9個宮位的資料...
('子女宮', '紫微', '子女聰明有領導力，教育需重品德培養。逢吉星子女成就高，遇煞星則防過度強勢。適合培養管理能力，但需教導謙遜。'),
('子女宮', '天機', '子女聰明好動，學習能力強但注意力易分散。教育方式需靈活多變，逢化忌需防投機心態。適合啟發式教學。'),
('子女宮', '太陽', '子女活潑外向，重名譽好表現。白天生人子女緣佳，需培養責任感。遇煞星防過度自我中心，宜多團體活動。'),
('子女宮', '武曲', '子女獨立性強，重實際少情感表達。金錢觀念需從小培養，逢祿存理財能力佳。遇煞星防過度物質導向。'),
('子女宮', '天同', '子女溫和乖巧，依賴性較強需培養獨立性。逢吉星親子關係融洽，遇煞星則防懶散。適合鼓勵式教育。'),
('子女宮', '廉貞', '子女個性強情感豐富，教育需耐心引導。逢桃花星防早戀，化忌時防叛逆。需建立明確行為規範。'),
('子女宮', '天府', '子女穩重懂事，自我要求高。逢祿存理財觀念佳，遇煞星則防固執。適合培養組織規劃能力。'),
('子女宮', '太陰', '子女細膩敏感，創造力強。夜晚生人子女緣深，需多情感交流。化忌時防情緒波動，宜培養藝術興趣。'),
('子女宮', '貪狼', '子女多才多藝，好奇心強需正確引導。逢火鈴創造力佳，遇桃花星防沉迷娛樂。適合多元發展。'),
('子女宮', '巨門', '子女口才好善辯，需培養溝通技巧。化祿時語言天賦佳，化忌則防口舌是非。適合辯論、外語學習。'),
('子女宮', '天相', '子女規矩有禮，重視形象。教育需以身作則，逢天府增穩重。遇刑忌則防優柔寡斷，需培養決斷力。'),
('子女宮', '天梁', '子女成熟早慧，有責任感但代溝可能。逢煞星愛說教，需雙向溝通。適合培養社會關懷。'),
('子女宮', '七殺', '子女獨立性強，個性鮮明需包容。逢紫微可為良才，獨坐則需耐心引導。適合體育、軍事訓練。'),
('子女宮', '破軍', '子女創意強喜變動，教育方式需彈性。逢祿存可引導正向發展，遇煞星則防破壞性。適合創新領域培養。'),

-- 財帛宮(4)
('財帛宮', '紫微', '財運穩健宜投資不動產，逢吉星可成富格。適合管理大資金，遇煞星則防過度揮霍。與天府同宮財庫豐盈。'),
('財帛宮', '天機', '財運多變動，宜技術性、策劃性求財。逢化忌防投機失利，適合知識變現。需分散風險。'),
('財帛宮', '太陽', '財源廣闊名中求利，適合靠名聲賺錢。白天生人財運佳，夜晚生人需勤奮。遇煞星防虛榮消費。'),
('財帛宮', '武曲', '正財旺盛，宜技術、金融業。逢化祿財源滾滾，遇煞星則勞碌求財。適合穩健理財。'),
('財帛宮', '天同', '財運平順福氣財，但需防過度享受。逢吉星不勞而獲，遇煞星則懶散失機。適合服務業求財。'),
('財帛宮', '廉貞', '偏財運強，但風險高需謹慎。逢桃花星防色破財，化忌時防官非損財。適合創意產業。'),
('財帛宮', '天府', '財庫穩定善積蓄，宜長期投資。逢祿存富足有餘，遇煞星則小氣失機。適合財務管理職。'),
('財帛宮', '太陰', '財運細水長流，宜文教、藝術業。夜晚生人聚財力強，化忌時防情緒消費。適合穩健理財。'),
('財帛宮', '貪狼', '財路多元交際財，但需防貪多失利。逢火鈴爆發力強，遇桃花星防色破財。適合業務工作。'),
('財帛宮', '巨門', '口才生財，宜法律、銷售業。化祿時靠嘴賺錢，化忌則是非損財。需靠專業取信。'),
('財帛宮', '天相', '財運平穩輔助財，宜合作求財。逢天府增穩重，遇刑忌則決策失誤。適合財務顧問。'),
('財帛宮', '天梁', '清高之財，宜醫療、宗教業。逢煞星愛說教失機，需務實理財。適合專業服務收費。'),
('財帛宮', '七殺', '冒險求財，宜軍警、工程業。逢紫微可成大業，獨坐則波動大。適合開創性投資。'),
('財帛宮', '破軍', '破舊立新財，宜創新行業。逢祿存可積財，遇煞星則消耗大。適合風險投資。'),

-- 疾厄宮(5)
('疾厄宮', '紫微', '體質強健，防心腦血管疾病。逢吉星抵抗力強，遇煞星則防過度勞心。需定期健康檢查。'),
('疾厄宮', '天機', '神經系統敏感，防失眠、頭痛。逢化忌防神經衰弱，需規律作息。適合靜坐養生。'),
('疾厄宮', '太陽', '防眼睛、心血管問題。白天生人體質佳，夜晚生人需多運動。遇煞星防過度勞累。'),
('疾厄宮', '武曲', '呼吸系統較弱，防感冒、肺炎。逢化祿體質轉佳，遇煞星則防意外傷害。需強化心肺功能。'),
('疾厄宮', '天同', '消化系統敏感，防脾胃不調。逢吉星恢復力強，遇煞星則防代謝問題。飲食需定時定量。'),
('疾厄宮', '廉貞', '防泌尿系統、性病。逢桃花星節制慾望，化忌時防發炎感染。需注重個人衛生。'),
('疾厄宮', '天府', '脾胃功能為主，防飲食失調。逢祿存吸收力佳，遇煞星則防肥胖。需均衡飲食。'),
('疾厄宮', '太陰', '防婦科、內分泌失調。夜晚生人體質佳，化忌時防情緒病。適合中醫調理。'),
('疾厄宮', '貪狼', '防肝膽問題、過度消耗。逢火鈴精力旺盛，遇桃花星防縱慾傷身。需節制菸酒。'),
('疾厄宮', '巨門', '防口腔、食道疾病。化祿時消化佳，化忌則防胃病。飲食需細嚼慢嚥。'),
('疾厄宮', '天相', '防皮膚過敏、循環問題。逢天府增抵抗力，遇刑忌則防濕疹。需注重皮膚保養。'),
('疾厄宮', '天梁', '防骨骼、關節問題。逢煞星愛說教傷神，需適度運動。適合太極、瑜伽。'),
('疾厄宮', '七殺', '防意外傷害、手術。逢紫微抵抗力強，獨坐則需注意安全。運動前需暖身。'),
('疾厄宮', '破軍', '防代謝異常、消耗性疾病。逢祿存可調理，遇煞星則恢復慢。需補充營養。'),

-- 遷移宮(6)
('遷移宮', '紫微', '外出得貴人助，宜大都市發展。逢吉星事業擴展，遇煞星則防強龍壓地頭蛇。適合管理職位。'),
('遷移宮', '天機', '外出多變動機會，宜靈活應變。逢化忌防舟車風險，需預備方案。適合頻繁出差。'),
('遷移宮', '太陽', '外出發展佳，宜陽光充足地。白天生人運勢強，夜晚生人需主動。遇煞星防文化衝突。'),
('遷移宮', '武曲', '外出求財佳，宜金融中心。逢化祿財源廣進，遇煞星則勞碌奔波。適合技術工作。'),
('遷移宮', '天同', '外出得福氣，宜休閒地區。逢吉星遊玩愉快，遇煞星則防懶散失機。適合服務業。'),
('遷移宮', '廉貞', '外出桃花旺，防複雜關係。逢桃花星防艷遇，化忌時防官非。需謹言慎行。'),
('遷移宮', '天府', '外出穩重得利，宜商業城市。逢祿存積財在外，遇煞星則防保守失機。適合長期外派。'),
('遷移宮', '太陰', '外出宜文教區，夜晚活動佳。化忌時防迷路，需預先規劃。適合藝術文化交流。'),
('遷移宮', '貪狼', '外出人脈廣，宜多元文化地。逢火鈴爆發力強，遇桃花星防糾紛。適合國際業務。'),
('遷移宮', '巨門', '外出靠口才，宜語言相通地。化祿時演講成功，化忌則防口舌。需學習當地語言。'),
('遷移宮', '天相', '外出得助力，宜合作發展。逢天府增人緣，遇刑忌則防受騙。適合團隊工作。'),
('遷移宮', '天梁', '外出遇貴人，宜專業領域。逢煞星愛說教，需尊重當地文化。適合學術交流。'),
('遷移宮', '七殺', '外出開創佳，宜新興地區。逢紫微可掌權，獨坐則防衝突。適合開拓市場。'),
('遷移宮', '破軍', '外出變動大，宜創新領域。逢祿存可穩定，遇煞星則勞碌。適合冒險創業。'),

-- 僕役宮(7)
('僕役宮', '紫微', '部屬能力強，需明確授權。逢吉星得良助，遇煞星則防功高震主。適合領導團隊。'),
('僕役宮', '天機', '部屬聰明多變，需彈性管理。逢化忌防投機，需建立制度。適合創意團隊。'),
('僕役宮', '太陽', '部屬熱情積極，白天生人助力強。遇煞星防強勢，需明確分工。適合業務團隊。'),
('僕役宮', '武曲', '部屬務實能幹，重績效管理。逢化祿效率高，遇煞星則防冷漠。適合技術團隊。'),
('僕役宮', '天同', '部屬和諧但效率低，需激勵。逢吉星團隊樂，遇煞星則防散漫。適合服務團隊。'),
('僕役宮', '廉貞', '部屬才華洋溢，防辦公室戀情。逢桃花星防糾紛，化忌時防背叛。需明確界線。'),
('僕役宮', '天府', '部屬穩重可靠，逢祿存忠誠高。遇煞星則防官僚，需暢通溝通。適合行政團隊。'),
('僕役宮', '太陰', '部屬細心體貼，女性助力多。夜晚生人配合佳，化忌時防情緒。適合文書團隊。'),
('僕役宮', '貪狼', '部屬多才多藝，人脈資源廣。逢火鈴衝勁足，遇桃花星防八卦。適合公關團隊。'),
('僕役宮', '巨門', '部屬口才好，防辦公室政治。化祿時談判佳，化忌則防是非。需透明化管理。'),
('僕役宮', '天相', '部屬配合度高，逢天府增穩定。遇刑忌則決策慢，需明確指示。適合執行團隊。'),
('僕役宮', '天梁', '部屬經驗豐富，逢煞星愛說教。需尊重專業，適合顧問團隊。'),
('僕役宮', '七殺', '部屬獨立性強，逢紫微可成將。獨坐則防衝突，需明確目標。適合開創團隊。'),
('僕役宮', '破軍', '部屬變動大，逢祿存可留才。遇煞星則流動高，需彈性管理。適合創新團隊。'),

-- 官祿宮(8)
('官祿宮', '紫微', '事業格局大，宜管理職。逢吉星可掌權，遇煞星則防剛愎。適合政府、大企業。'),
('官祿宮', '天機', '事業多變動，宜策劃職。逢化忌防反覆，需專注領域。適合顧問、分析師。'),
('官祿宮', '太陽', '事業名聲佳，宜教育、媒體。白天生人發展順，遇煞星防過勞。適合公眾人物。'),
('官祿宮', '武曲', '事業重實績，宜金融、技術。逢化祿財運佳，遇煞星則勞碌。適合專業人士。'),
('官祿宮', '天同', '事業平順，宜服務業。逢吉星輕鬆有成，遇煞星則防懶散。適合休閒產業。'),
('官祿宮', '廉貞', '事業競爭強，宜藝術、娛樂。逢桃花星防緋聞，化忌時防官非。需專業形象。'),
('官祿宮', '天府', '事業穩健，宜行政、財務。逢祿存財運穩，遇煞星則防保守。適合管理職。'),
('官祿宮', '太陰', '事業細水長流，宜文教、藝術。夜晚生人靈感強，化忌時防憂鬱。適合創作工作。'),
('官祿宮', '貪狼', '事業多元發展，宜業務、外交。逢火鈴衝勁足，遇桃花星防分心。適合跨領域。'),
('官祿宮', '巨門', '事業靠口才，宜法律、銷售。化祿時談判佳，化忌則防口舌。需專業認證。'),
('官祿宮', '天相', '事業重合作，逢天府增穩重。遇刑忌則決策慢，適合輔助職。'),
('官祿宮', '天梁', '事業宜專業，逢煞星愛說教。需建立權威，適合醫療、宗教。'),
('官祿宮', '七殺', '事業開創強，逢紫微可成將。獨坐則防衝突，適合軍警、工程。'),
('官祿宮', '破軍', '事業變革大，逢祿存可積累。遇煞星則消耗，適合創新領域。'),

-- 田宅宮(9)
('田宅宮', '紫微', '不動產運佳，宜市中心房產。逢吉星可成富格，遇煞星則防奢侈。適合長期持有。'),
('田宅宮', '天機', '房產多變動，宜靈活運用。逢化忌防糾紛，需明確產權。適合投資型房產。'),
('田宅宮', '太陽', '房產光線佳，宜朝南住宅。白天生人運勢強，遇煞星防高調。適合景觀宅。'),
('田宅宮', '武曲', '房產價值穩，宜金融區附近。逢化祿增值快，遇煞星則需維修。適合商用不動產。'),
('田宅宮', '天同', '居家舒適，宜休閒環境。逢吉星家庭和樂，遇煞星則防懶散。適合度假宅。'),
('田宅宮', '廉貞', '房產裝潢美，防鄰里糾紛。逢桃花星防隱私，化忌時防官非。需注重社區品質。'),
('田宅宮', '天府', '房產穩健，宜成熟社區。逢祿存財庫豐，遇煞星則防吝嗇。適合家族傳承。'),
('田宅宮', '太陰', '房產寧靜，宜近水環境。夜晚生人運勢佳，化忌時防潮濕。適合藝術工作室。'),
('田宅宮', '貪狼', '房產多用途，宜多元發展。逢火鈴增值快，遇桃花星防複雜。適合混合使用。'),
('田宅宮', '巨門', '房產靠口才，宜學區附近。化祿時談判佳，化忌則防噪音。需注重隔音。'),
('田宅宮', '天相', '房產重裝潢，逢天府增價值。遇刑忌則決策慢，適合委託專業。'),
('田宅宮', '天梁', '房產宜傳統，逢煞星愛說教。需注重風水，適合長期居住。'),
('田宅宮', '七殺', '房產變動大，逢紫微可增值。獨坐則防衝突，適合重建案。'),
('田宅宮', '破軍', '房產需翻新，逢祿存可獲利。遇煞星則消耗，適合老屋改造。'),

-- 福德宮(10)
('福德宮', '紫微', '精神生活高貴，逢吉星心靈富足。遇煞星則防孤高，需培養嗜好。適合藝術欣賞。'),
('福德宮', '天機', '思想活躍多慮，逢化忌防焦慮。需靜心修養，適合哲學研究。'),
('福德宮', '太陽', '精神光明積極，白天生人能量強。遇煞星防過度樂觀，需務實規劃。'),
('福德宮', '武曲', '重視實際享受，逢化祿物質滿足。遇煞星則防執著，需平衡心靈。'),
('福德宮', '天同', '心靈平和享福，逢吉星無憂無慮。遇煞星則防懶散，需適度挑戰。'),
('福德宮', '廉貞', '情感豐富複雜，逢桃花星防執迷。化忌時防抑鬱，需情緒出口。'),
('福德宮', '天府', '心靈穩重滿足，逢祿存知足常樂。遇煞星則防固執，需接納新事物。'),
('福德宮', '太陰', '內心細膩敏感，夜晚生人靈感強。化忌時防憂鬱，適合藝術創作。'),
('福德宮', '貪狼', '慾望多元強烈，逢火鈴轉化能量。遇桃花星防沉迷，需提升心靈。'),
('福德宮', '巨門', '思想深刻善辯，化祿時智慧增。化忌則防鑽牛角尖，需開闊心胸。'),
('福德宮', '天相', '心靈和諧平衡，逢天府增穩定。遇刑忌則猶豫，需堅定信仰。'),
('福德宮', '天梁', '精神追求高尚，逢煞星愛說教。需實踐智慧，適合慈善活動。'),
('福德宮', '七殺', '心靈挑戰性強，逢紫微可昇華。獨坐則防偏激，需正念修練。'),
('福德宮', '破軍', '精神求新求變，逢祿存可積累。遇煞星則消耗，需定期充電。'),

-- 父母宮(11)
('父母宮', '紫微', '父母威嚴，教育嚴格。逢吉星得庇蔭，遇煞星則防代溝。需多溝通。'),
('父母宮', '天機', '父母聰明，教育方式多變。逢化忌防意見不合，需彈性應對。'),
('父母宮', '太陽', '父親影響大，白天生人緣深。遇煞星防強勢，需互相尊重。'),
('父母宮', '武曲', '父母務實，重紀律教育。逢化祿關係佳，遇煞星則防冷漠。'),
('父母宮', '天同', '父母慈愛，家庭和樂。逢吉星福氣厚，遇煞星則防過度保護。'),
('父母宮', '廉貞', '父母緣特殊，可能有繼親。逢桃花星防複雜，化忌時防衝突。'),
('父母宮', '天府', '父母穩重，家庭經濟穩。逢祿存家運佳，遇煞星則防保守。'),
('父母宮', '太陰', '母親影響深，夜晚生人緣厚。化忌時防情緒困擾，需多關懷。'),
('父母宮', '貪狼', '父母多才多藝，教育開放。逢火鈴活力強，遇桃花星防干涉。'),
('父母宮', '巨門', '父母口才好，防言語衝突。化祿時溝通佳，化忌則防誤解。'),
('父母宮', '天相', '父母端莊，教育和諧。逢天府增穩定，遇刑忌則防優柔。'),
('父母宮', '天梁', '父母如師長，逢煞星愛說教。需耐心傾聽，適合請益。'),
('父母宮', '七殺', '父母嚴格，教育獨立。逢紫微可成模範，獨坐則防衝突。'),
('父母宮', '破軍', '父母變動大，可能再婚。逢祿存可獲支持，遇煞星則疏離。'),

-- 身宮(12)
('身宮', '紫微', '一生重地位成就，需培養領導力。逢吉星可成大業，遇煞星則防孤獨。'),
('身宮', '天機', '一生多思多變，需專注目標。逢化忌防猶豫，適合靈活職業。'),
('身宮', '太陽', '一生重名譽影響力，白天生人運強。遇煞星防過度張揚，需務實。'),
('身宮', '武曲', '一生重實際成就，逢化祿財運佳。遇煞星則勞碌，需平衡生活。'),
('身宮', '天同', '一生重享受福氣，逢吉星平順。遇煞星則防懶散，需激發鬥志。'),
('身宮', '廉貞', '一生感情豐富，逢桃花星防糾葛。化忌時防官非，需謹言慎行。'),
('身宮', '天府', '一生穩重積累，逢祿存富足。遇煞星則防吝嗇，需適度分享。'),
('身宮', '太陰', '一生重內心感受，夜晚生人靈感強。化忌時防憂鬱，需情緒出口。'),
('身宮', '貪狼', '一生多才多藝，逢火鈴成就非凡。遇桃花星防分心，需專注。'),
('身宮', '巨門', '一生靠口才智慧，化祿時辯才佳。化忌則防是非，需謹慎言論。'),
('身宮', '天相', '一生重合作形象，逢天府增穩定。遇刑忌則猶豫，需果斷決策。'),
('身宮', '天梁', '一生重智慧傳承，逢煞星愛說教。需實踐所學，適合教育。'),
('身宮', '七殺', '一生開創性強，逢紫微可掌權。獨坐則防衝突，需包容。'),
('身宮', '破軍', '一生變革創新，逢祿存可積累。遇煞星則消耗，需定期充電。');

-- 創建索引以優化查詢性能
CREATE INDEX idx_star_analysis_palace ON star_analysis(palace);
CREATE INDEX idx_star_analysis_star ON star_analysis(star);
CREATE INDEX idx_star_analysis_combo ON star_analysis(palace, star);
-- 更新所有星曜名稱後面加上「星」字
UPDATE star_analysis
SET star = star || '星'
WHERE star NOT LIKE '%星';