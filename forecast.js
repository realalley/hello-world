export const dates=['2026-12','2027-01','2027-02','2027-03','2027-04'];
export const sources={
noaa:{name:'NOAA · ENSO Diagnostic Discussion',url:'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.html',note:'2026年9月10日展望；原链接随月度更新。提供ENSO背景，不提供雪场逐月预报。'},
na:{name:'NOAA · ENSO 常见问题',url:'https://www.climate.gov/news-features/understanding-climate/el-nino-and-la-nina-frequently-asked-questions',note:'北美典型气候影响及其概率性；不能直接换算成当地降雪量。'},
japan:{name:'日本气象厅 · 厄尔尼诺与日本冬季',url:'https://www.jma.go.jp/jma/press/2606/10b/elnino202606.html',note:'2026年6月10日说明：厄尔尼诺期间日本冬季易偏暖，并非各雪场降雪预报。'},
europe:{name:'英国气象局 · ENSO 与欧洲气候',url:'https://www.metoffice.gov.uk/blog/2026/el-nio-declared-for-2026-as-pacific-warms',note:'ENSO只是欧洲气候驱动因子之一；不能将英国信号直接外推至阿尔卑斯雪场。'},
korea:{name:'韩国气象厅 · 气候预测',url:'https://www.weather.go.kr/w/climate/prediction.do',note:'临行前复核当地季节展望的机构入口，非本页月度结论的背书。'},
china:{name:'中国气象局 · 中国气候公报',url:'https://www.cma.gov.cn/zfxxgk/gknr/qxbg/202402/W020240223586744867426.pdf',note:'历史气候及ENSO监测资料；不是2026/27雪场预测。中国各地暂不赋予ENSO降雪增减结论。'},
australia:{name:'澳大利亚气象局 · 雪季变化',url:'https://www.bom.gov.au/news-and-media/where-is-the-snow',note:'澳大利亚高山积雪的季节性与雪季波动。'},
nz:{name:'新西兰旅游局 · Skiing',url:'https://www.newzealand.com/us/skiing/',note:'常规滑雪季约6月中旬至10月中旬；具体开放日期由雪场决定。'},
chile:{name:'智利旅游局 · 秋冬出游',url:'https://chile.travel/en/blog/low-season-the-advantages-of-traveling-to-chile-in-autumn-and-winter/',note:'介绍当地南半球冬季滑雪时间，不是远期雪量预报。'},
argentina:{name:'阿根廷旅游局 · 雪季介绍',url:'https://www.argentina.travel/en/news/cuando-nieva-en-argentina-empieza-la-temporada-de-ski-en-patagonia-y-mendoza',note:'常规雪季约6月至9月或10月，取决于天气。'},
whistler:{name:'Whistler Blackcomb · 官方山地资料',url:'https://www.whistlerblackcomb.com/the-mountain/about-the-mountain/mountain-info.aspx',note:'山脚675米、最高缆车到达2284米。海拔资料，不是未来雪质预报。'}
};
const p=(name,signal,focus,advice,source,cold=false)=>({name,signal,focus,advice,source,cold});
export const profiles={
coastal:p('北美太平洋沿岸','厄尔尼诺常使北美西北部冬季偏暖；这一概率信号不能决定单次风暴的雨雪相态。','海洋暖湿气流下，冻结高度和雨雪转换比总降水量更值得关注。','跟随冷空气与风暴交汇的窗口，优先确认较高雪区的实际开放。','na'),
rockies:p('北美内陆山地','ENSO对北美冬季的影响有明显地域差异；内陆各雪场不宜统一判断增雪或减雪。','关注具体风暴路径、风吹雪与雪底厚度，气温低不等于降雪多。','预留多天滑行窗口，按已开放地形选择线路，不能只凭新雪深度判断。','na',true),
sierra:p('北美西南与内华达山脉','厄尔尼诺可能改变南部风暴活动，但不能据此承诺加州或西南每一座雪场的降雪增加。','降雪常随风暴集中到来，暖湿风暴也可能抬高雨雪分界线。','兼顾暴雪后的交通与缆车开放，不把单次强风暴当成整月好雪保证。','na'),
east:p('北美东部与中部','区域温度和风暴路径都存在较大波动，ENSO不足以单独解释本地雪质。','自然雪、造雪与压雪共同影响滑行；升温、降雨和再次冻结可能交替发生。','优先看雪道开放率和整备报告，选择可以调整日期的短途或多日安排。','na'),
hokkaido:p('日本北海道','日本气象厅指出厄尔尼诺冬季日本易偏暖；北海道具体降雪仍取决于冷空气和风向。','关注冷空气南下与海上水汽配合，低温背景不能保证每一天都有新雪。','按临近天气和实际开放选择滑行区域，强风天为交通与缆车调整留余地。','japan',true),
honshu:p('日本本州','日本气象厅指出厄尔尼诺冬季日本易偏暖，但这不是本州各雪场逐月雪量预报。','冷空气强度、迎风坡和海拔差异决定雪况，暖过程可能带来湿雪与雨。','优先查雨雪分界线及高处开放状态，不把整个联合雪区视为同一种雪面。','japan'),
alps:p('欧洲阿尔卑斯山地','ENSO只是欧洲气候因子之一，本页不将厄尔尼诺直接解释为阿尔卑斯增雪或减雪。','大西洋环流、风暴路径和冻结高度更直接影响雪面，山谷与高处可明显不同。','出发前比较不同海拔和坡向的开放范围，春季优先根据雪面软化时间安排。','europe'),
pyrenees:p('比利牛斯山地','欧洲的ENSO联系复杂，暂不足以给当地雪场赋予可信的逐月降雪异常结论。','风暴方向、冻结高度和自然雪底决定可滑范围，日照下的雪面变化也需关注。','将整备雪道与自然地形分开评估，提前订票时保留天气变化的余地。','europe'),
chinaNorth:p('中国东北与内蒙古','本页未获得足以支持该雪场逐月异常判断的季节模型，不以厄尔尼诺直接断言雪多雪少。','滑行质量还取决于造雪、整备、自然降雪和风，低温并不自动代表粉雪。','隆冬关注体感温度和风况，出发前核对雪道开放与整备信息。','china',true),
xinjiang:p('中国新疆山地','本页未采用雪场级季节模型；厄尔尼诺与本地降雪不能简单一一对应。','区域范围大，具体海拔、地形与风暴路径很重要；同属新疆也不能等同雪况。','看当地实测雪况和道路信息，为降雪、风及低温造成的行程调整留余地。','china',true),
chinaOther:p('中国华北与其他山地','暂不对当地给出ENSO增雪或减雪判断；月度提示以常年季节变化和运营核查为主。','造雪窗口、日间升温与压雪维护影响明显，高处与山脚的雪况需要分别核实。','预订前查看开放雪道和雪面情况，不能把自然降雪预期当作运营承诺。','china'),
korea:p('韩国江原道','暂不将ENSO直接换算为本地雪质；需要结合韩国气象厅临近季节展望更新判断。','造雪、压雪和冷暖波动共同影响滑行，暖过程后关注雪面再次冻结。','重点核实雪道开放与整备，按气温变化选择合适滑行时段。','korea')
};
const southern={'澳大利亚':'australia','新西兰':'nz','智利':'chile','阿根廷':'argentina'};
export function profileFor(r){const c=r.country,g=r.region;
if(southern[c])return {name:'南半球 · 非常规雪季',source:southern[c],south:true};
if(c==='中国')return profiles[/新疆/.test(g)?'xinjiang':/吉林|黑龙江|内蒙古/.test(g)?'chinaNorth':'chinaOther'];
if(c==='日本')return profiles[g==='北海道'?'hokkaido':'honshu'];if(c==='韩国')return profiles.korea;
if(c==='加拿大')return profiles[/安大略|魁北克/.test(g)?'east':/Whistler|Cypress|Grouse|Mount Washington/.test(r.en)?'coastal':'rockies'];
if(c==='美国'&&g==='阿拉斯加州')return {...profiles.rockies,name:'阿拉斯加山地',focus:'当地地形、风暴路径和气温共同影响雪质，不直接套用美国西北部的偏暖信号。'};
if(c==='美国')return profiles[/加利福尼亚|内华达|新墨西哥/.test(g)?'sierra':/华盛顿|俄勒冈|阿拉斯加/.test(g)?'coastal':/犹他|科罗拉多|蒙大拿|爱达荷|怀俄明/.test(g)?'rockies':'east'];
if(/安道尔|西班牙/.test(c))return profiles.pyrenees;return profiles.alps;}
const stages=[
['雪底积累期','先核实雪底与开放范围','初冬积雪仍在建立；冷暖过程可使雪面在新雪、湿雪与硬雪间转换。','有新雪机会，但自然地形是否开放取决于雪底与运营。','注意造雪窗口和暖过程后的雨雪转换。','预订前核实开放范围，保留改期空间。'],
['优先观察期','寻找冷空气与降雪配合的窗口','常年季节变化上处于隆冬，更有利于保雪，但不能据此保证降雪频率。','关注近期风暴和风吹雪，实际雪况比月份标签更重要。','暖过程仍可带来冻融；查看当日整备报告。','留出连续数天窗口，临行根据预报调整。'],
['优先观察期','兼顾雪底与雪面变化','按季节规律雪底可能比初冬成熟，是否出现粉雪仍取决于具体天气过程。','选择已开放地形，注意降雪后的风与能见度。','关注昼间升温和降雨后再次冻结。','将灵活住宿与雪场实况结合，不提前押注粉雪。'],
['冬春交替','按海拔和时段安排滑行','日照增强，昼夜冻融影响逐渐增大；冷风暴期间仍可能回到冬季雪况。','新雪与春雪可能交替，注意坡向与日照。','早间偏硬、午后变软的情况更值得关注。','根据雪面软化时间调整线路，并核实春季开放安排。'],
['春季核查期','先确认营业，再安排春雪行程','远期判断可信度低；不能把四月仍有降雪等同于雪场仍正常开放。','是否可滑以运营公告为准，偶发新雪不代表稳定雪底。','融雪和冻融更明显，低处雪道可能缩减或关闭。','先查关场日期，以实际开放地形为前提规划。']
];
export function forecastFor(r){const p=profileFor(r);if(p.south){return {profile:p,headline:'换一个季节，再出发。',subtitle:'12月至次年4月通常不是当地常规滑雪季',sources:['noaa',p.source],months:dates.map((date,i)=>({date,label:i<3?'当地夏季':'当地秋季',title:i<3?'夏季出游，不按冬季雪况预订':'等待冬季，偶发降雪不等于开场',copy:'这段时间通常不属于常规缆车滑雪季；具体雪场若有特殊运营，需以官方公告为准。',alpine:'残雪、冰川或偶发降雪不能作为开放滑雪的依据。',lower:'不提供冬季粉雪预期，也不对可滑雪道作出承诺。',travel:'考虑当地冬季再来；出发前确认雪场正式开放日期。'})),report:[`${r.zh}（${r.en}）位于${r.country}${r.region}。本应用展示的2026年12月至2027年4月对应南半球夏季至秋季，通常不属于当地常规滑雪季。因此，这五个月不提供粉雪评分或冬季降雪预期，也不将偶发降雪理解为雪场已开放。高处残雪、冰川活动与面向公众的缆车滑雪运营是不同的事情。`,`如果此行主要为了滑雪，建议改查当地冬季开放日历，而不是照搬北半球的一至二月建议。预订前确认营业日期、可滑区域、设备租赁和交通安排；若计划夏秋季观光，也应按当季活动重新核实天气与设施。厄尔尼诺背景不能替代这些运营信息，更不能从本次展望直接推断2027年当地冬季的雪量。请保留行程弹性，待相应季节的气候展望和雪场公告发布后再作决定。`]};}
return {profile:p,headline:p.cold?'先看冷暖，再等新雪。':'按雪况出发，让行程更灵活。',subtitle:'逐月情景展望 · 优先参考当地临近预报',sources:['noaa',p.source],months:stages.map((s,i)=>({date:dates[i],label:s[0],title:s[1],copy:s[2]+' '+p.focus,alpine:s[3],lower:s[4],travel:i===1||i===2?p.advice:s[5]})),report:[`${r.zh}（${r.en}）位于${r.country}${r.region}，本页使用${p.name}的区域情景框架。${p.signal}${p.focus}这些判断用于提前理解风险，不是雪场逐月降雪量预报，也不代表区域内每个目的地会出现相同雪况。`,`十二月先看雪底和开放范围；一至二月重点寻找冷空气与降水配合的窗口；三月开始关注冻融和坡向差异；四月必须先确认运营日期，再安排春季滑行。${p.advice}建议出发前一至两周复核当地预报，上山当天查看风况、能见度和缆车公告。雪道是否开放与新雪多少并不等同，不宜仅凭月份或厄尔尼诺标签锁定不可退改的行程。`]};}
export function normalize(s){return s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[\s·・’'—–\-()（）]/g,'');}
function distance(a,b){let row=Array.from({length:b.length+1},(_,i)=>i);for(let i=1;i<=a.length;i++){let next=[i];for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+(a[i-1]===b[j-1]?0:1));row=next;}return row[b.length];}
export function searchResorts(list,q,country=''){const query=normalize(q.trim());return list.filter(r=>!country||r.country.split('/').includes(country)).map(r=>{const values=[r.zh,r.en,...r.aliases];if(r.id==='601da07eb6ed67d4')values.push('惠斯勒','威士拿');if(r.en==='Niseko United')values.push('二世谷');const norm=values.map(normalize);let score=query?0:1;if(query&&norm.some(s=>s===query))score=100;else if(query&&norm.some(s=>s.includes(query)))score=80;else if(query&&/^[a-z]{4,}$/.test(query)&&values.some(s=>s.split(/\s+/).some(w=>distance(query,normalize(w))<=(query.length>7?2:1))))score=40;return {r,score};}).filter(x=>x.score).sort((a,b)=>b.score-a.score).map(x=>x.r);}
