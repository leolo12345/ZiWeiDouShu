/*
 * 紫微斗數數據庫訪問模塊
 * 此模塊負責從數據庫中獲取天干、地支等數據
 */

// 初始化變量，等待從數據庫加載
var HeavenlyStems = [];
var EarthlyBranches = [];
var YinYang = [];
var ZodiacSigns = [];
var Palaces = [];
var FiveElements = [];
var MainStars = [];
var AuxiliaryStars = [];
var TransformationStars = [];
var EvilStars = [];
var OtherStars = [];

// 星曜位置數據
var StarA14Positions = [];
var StarZ06Positions = [];
var StarT08Positions = [];
var StarG07Positions = [];
var StarB06Positions = [];
var StarOS5Positions = [];

// 從數據庫加載天干數據
function loadHeavenlyStems() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/heavenly-stems')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Invalid data received for Heavenly Stems');
                }
                HeavenlyStems = data.map(item => item.name);
                console.log("天干數據加載成功:", HeavenlyStems);
                resolve(HeavenlyStems);
            })
            .catch(error => {
                console.error("天干數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載地支數據
function loadEarthlyBranches() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/earthly-branches')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Invalid data received for Earthly Branches');
                }
                EarthlyBranches = data.map(item => item.name);
                console.log("地支數據加載成功:", EarthlyBranches);
                resolve(EarthlyBranches);
            })
            .catch(error => {
                console.error("地支數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載陰陽數據
function loadYinYang() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/yin-yang')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Invalid data received for Yin Yang');
                }
                YinYang = data.map(item => item.name);
                console.log("陰陽數據加載成功:", YinYang);
                resolve(YinYang);
            })
            .catch(error => {
                console.error("陰陽數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載生肖數據
function loadZodiacSigns() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/zodiac-signs')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('Invalid data received for Zodiac Signs');
                }
                ZodiacSigns = data.map(item => item.name);
                console.log("生肖數據加載成功:", ZodiacSigns);
                resolve(ZodiacSigns);
            })
            .catch(error => {
                console.error("生肖數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載宮位數據
function loadPalaces() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/palaces')
            .then(response => response.json())
            .then(data => {
                Palaces = data;
                console.log("宮位數據加載成功:", Palaces);
                resolve(Palaces);
            })
            .catch(error => {
                console.error("宮位數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載五行局數據
function loadFiveElements() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/five-elements')
            .then(response => response.json())
            .then(data => {
                FiveElements = data;
                console.log("五行局數據加載成功:", FiveElements);
                resolve(FiveElements);
            })
            .catch(error => {
                console.error("五行局數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載主星數據
function loadMainStars() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/main-stars')
            .then(response => response.json())
            .then(data => {
                MainStars = data.map(item => item.name);
                console.log("主星數據加載成功:", MainStars);
                resolve(MainStars);
            })
            .catch(error => {
                console.error("主星數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載輔星數據
function loadAuxiliaryStars() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/auxiliary-stars')
            .then(response => response.json())
            .then(data => {
                AuxiliaryStars = data.map(item => item.name);
                console.log("輔星數據加載成功:", AuxiliaryStars);
                resolve(AuxiliaryStars);
            })
            .catch(error => {
                console.error("輔星數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載四化星數據
function loadTransformationStars() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/transformation-stars')
            .then(response => response.json())
            .then(data => {
                TransformationStars = data.map(item => item.name);
                console.log("四化星數據加載成功:", TransformationStars);
                resolve(TransformationStars);
            })
            .catch(error => {
                console.error("四化星數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載六凶星數據
function loadEvilStars() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/evil-stars')
            .then(response => response.json())
            .then(data => {
                EvilStars = data.map(item => item.name);
                console.log("六凶星數據加載成功:", EvilStars);
                resolve(EvilStars);
            })
            .catch(error => {
                console.error("六凶星數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載雜曜數據
function loadOtherStars() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/other-stars')
            .then(response => response.json())
            .then(data => {
                OtherStars = data.map(item => item.name);
                console.log("雜曜數據加載成功:", OtherStars);
                resolve(OtherStars);
            })
            .catch(error => {
                console.error("雜曜數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載主星位置數據 (Star_A14)
function loadStarA14Positions() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/star-a14-positions')
            .then(response => response.json())
            .then(data => {
                StarA14Positions = data;
                console.log("主星位置數據加載成功:", StarA14Positions);
                resolve(StarA14Positions);
            })
            .catch(error => {
                console.error("主星位置數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載紫微諸星位置數據 (Star_Z06)
function loadStarZ06Positions() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/star-z06-positions')
            .then(response => response.json())
            .then(data => {
                StarZ06Positions = data;
                console.log("紫微諸星位置數據加載成功:", StarZ06Positions);
                resolve(StarZ06Positions);
            })
            .catch(error => {
                console.error("紫微諸星位置數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載天府諸星位置數據 (Star_T08)
function loadStarT08Positions() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/star-t08-positions')
            .then(response => response.json())
            .then(data => {
                StarT08Positions = data;
                console.log("天府諸星位置數據加載成功:", StarT08Positions);
                resolve(StarT08Positions);
            })
            .catch(error => {
                console.error("天府諸星位置數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載六吉星位置數據 (Star_G07)
function loadStarG07Positions() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/star-g07-positions')
            .then(response => response.json())
            .then(data => {
                StarG07Positions = data;
                console.log("六吉星位置數據加載成功:", StarG07Positions);
                resolve(StarG07Positions);
            })
            .catch(error => {
                console.error("六吉星位置數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載六凶星位置數據 (Star_B06)
function loadStarB06Positions() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/star-b06-positions')
            .then(response => response.json())
            .then(data => {
                StarB06Positions = data;
                console.log("六凶星位置數據加載成功:", StarB06Positions);
                resolve(StarB06Positions);
            })
            .catch(error => {
                console.error("六凶星位置數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫加載雜曜位置數據 (Star_OS5)
function loadStarOS5Positions() {
    return new Promise((resolve, reject) => {
        fetch('/ziwei/api/star-os5-positions')
            .then(response => response.json())
            .then(data => {
                StarOS5Positions = data;
                console.log("雜曜位置數據加載成功:", StarOS5Positions);
                resolve(StarOS5Positions);
            })
            .catch(error => {
                console.error("雜曜位置數據加載失敗:", error);
                reject(error);
            });
    });
}

// 從數據庫獲取主星分析
function getStarAnalysis(starName, palaceName) {
    return new Promise((resolve, reject) => {
        fetch(`/ziwei/api/star-analysis?star=${encodeURIComponent(starName)}&palace=${encodeURIComponent(palaceName)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data || !data.analysis) {
                    throw new Error('Invalid analysis data received');
                }
                resolve(data.analysis);
            })
            .catch(error => {
                console.error(`獲取${starName}在${palaceName}的分析失敗:`, error);
                reject(error);
            });
    });
}

// 初始化數據
function initializeData() {
    Promise.all([
        loadHeavenlyStems(),
        loadEarthlyBranches(),
        loadYinYang(),
        loadZodiacSigns(),
        loadPalaces(),
        loadFiveElements(),
        loadMainStars(),
        loadAuxiliaryStars(),
        loadTransformationStars(),
        loadEvilStars(),
        loadOtherStars(),
        loadStarA14Positions(),
        loadStarZ06Positions(),
        loadStarT08Positions(),
        loadStarG07Positions(),
        loadStarB06Positions(),
        loadStarOS5Positions()
    ])
        .then(() => {
            console.log("所有數據初始化完成");
            // 觸發一個自定義事件，通知其他模塊數據已加載完成
            document.dispatchEvent(new CustomEvent('ziwei-data-loaded'));
        })
        .catch(error => {
            console.error("數據初始化失敗:", error);
            // 添加重試邏輯
            console.log("5秒後重試初始化...");
            setTimeout(initializeData, 5000);
        });
}

// 當頁面加載完成後初始化數據
document.addEventListener('DOMContentLoaded', initializeData);