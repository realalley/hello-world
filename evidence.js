// Destination evidence edition: 2026-09-12. Inference is not a calibrated forecast.
import destinations from './destination-evidence.js';
export const evidenceSources={
wb:{name:'惠斯勒官方 · Mountain Statistics',url:'https://www.whistlerblackcomb.com/the-mountain/about-the-mountain/mountain-info.aspx',date:'核查 2026-09-11'},
niseko:{name:'Niseko United · 2022/23 雪季回顾',url:'https://www.niseko.ne.jp/ja/news/how-much-did-it-snow-in-niseko-winter-2022-23/',date:'发布 2023-05-23'},
hakuba:{name:'Hakuba Valley · 雪场资料',url:'https://www.hakubavalley.com/en/ski_resort_info_en/',date:'核查 2026-09-11'},
songhua:{name:'吉林省文旅厅 · 吉林区域旅游线路',url:'https://whhlyt.jl.gov.cn/ztzl/jlslyxlhxj/gdxl/jls/jls_424340/202507/t20250704_9273085.html',date:'发布 2025-07-04'},
zermatt:{name:'瓦莱州旅游局 · Zermatt-Matterhorn',url:'https://www.valais.ch/en/explore/activities/ski-snowboard/ski-areas/zermatt-matterhorn',date:'核查 2026-09-11'},
zermattLive:{name:'采尔马特缆车公司 · 雪况与开放',url:'https://www.matterhornparadise.ch/en/information/snow-report',date:'动态页面，出行前查看'},
noaa:{name:'NOAA · ENSO 诊断',url:'https://www.cpc.ncep.noaa.gov/products/analysis_monitoring/enso_advisory/ensodisc.html',date:'引用 2026-09-10 版，页面会更新'},
jma:{name:'日本气象厅 · 厄尔尼诺与日本冬季',url:'https://www.jma.go.jp/jma/press/2606/10b/elnino202606.html',date:'发布 2026-06-10'},
met:{name:'Met Office · ENSO 与欧洲气候',url:'https://www.metoffice.gov.uk/blog/2026/el-nio-declared-for-2026-as-pacific-warms',date:'2026年专题，核查 2026-09-11'},
skill:{name:'ECMWF · 季节预测的能力与限制',url:'https://confluence.ecmwf.int/spaces/FUG/pages/673551534/Section+8.3+Seasonal+Output',date:'核查 2026-09-11'}
};
export const studies={
'601da07eb6ed67d4':{
name:'惠斯勒',claim:'高低海拔分开判断，比押注整月粉雪更有依据。',
facts:[['675 m','山脚海拔','wb'],['2,284 m','最高缆车到达海拔，非山峰高度','wb'],['1,072 cm','官方年平均降雪；未注明统计年段与观测位置','wb']],
baseline:'官方年平均值只能说明总体积雪背景，不能分摊成五个月的预报，也不能表示每条雪道的雪量。尚未接入同一观测站的长期月度序列。',
chain:[['机构预测','NOAA 9月展望指出厄尔尼诺增强。这确认了大尺度背景，没有给惠斯勒逐月雪量。','noaa'],['雪场事实','山脚与最高缆车到达位置相差1,609米。仅看山脚天气可能漏掉高处不同的雨雪相态。','wb'],['本站推断','若暖湿过程的雨雪分界线上升，低处可能先受雨和湿雪影响；高处能否下雪仍取决于实际温度结构。',null],['出行判断','把“冻结高度、降水时段、高山风和开放状态”作为预订后复核的四项条件。',null]],
metrics:['新雪取决于风暴与冷空气是否重合，不能从年平均值推算。','较高处通常有温度优势，但风和日照会改变雪面。','关注暖雨后再冻结；山脚与高处的风险不能合并。','即便有新雪，强风也可能影响高山缆车。'],
good:'降水发生时冻结高度下降，高处气温维持低温且风力允许开放',bad:'暖雨进入主要滑行区域，随后快速降温形成硬壳，或高山持续强风',watch:'冻结高度是否进入计划滑行海拔；高处缆车是否开放',
monthly:['十二月尚需建立雪底，高处下雪也不等于自然地形已可滑。','一月按常年季节性更利于保雪，核心仍是避开暖雨过程。','二月关注雪底成熟度，同时防范新雪后暖湿气流接替。','三月低处冻融增多，较高处仍可能在冷风暴中获得新雪。','四月以已开放高处和春雪时段为前提，不能提前保证回村雪道。']},
'f99c5eb6b99fffd2':{
name:'二世古',claim:'历史雪多是背景，本季追粉仍要看冷空气是否持续。',
facts:[['3 个雪季','同一官方回顾列出的季节累计记录，非长期气候平均','niseko'],['中山观测点','Grand Hirafu 巡逻队资料，不代表四个雪区全域','niseko']],
baseline:'官方回顾列出2020/21、2021/22、2022/23三个雪季累计降雪。这里展示全部三个连续记录，不按ENSO筛选；样本不足以估计厄尔尼诺影响或粉雪概率。未提供观测点准确海拔、完整测量规程及长期月度序列。',
history:[['2020/21',1589],['2021/22',1450],['2022/23',1400]],
chain:[['机构说明','日本气象厅说明，厄尔尼诺期间日本冬季易偏暖；这是全国层面的倾向，不是北海道当地降雪幅度。','jma'],['历史观测','官方中山观测点三个雪季累计为1,589、1,450、1,400厘米，表明雪量可随年份变化。累计新雪并非同时留在地面的雪深。','niseko'],['本站推断','充足水汽必须与合适冷空气配合才能形成有利雪面；偏暖背景不能直接推出每次降雪都会变差。',null],['出行判断','关注降水期间温度与风向的配合，既看低处雪面，也看上部连接缆车状态。',null]],
metrics:['历史累计很大不等于行程每天有新雪。','降雪后的气温、风与日照决定粉雪能保持多久。','暖过程可增加湿雪与冻融，不能只看降水图。','全山连滑需要连接缆车开放，风况会影响路线。'],
good:'冷空气与降水过程连续配合，降雪后没有立即转暖且缆车正常开放',bad:'暖过程打断降雪，或上部风大导致雪区连接受限',watch:'降水期间气温、风向及全山连接缆车状态',
monthly:['十二月看雪底与实际开场进度，不将往年累计降雪视为准时开场保证。','一月以冷空气持续性判断新雪保存，不引用历史高雪量作保证。','二月需观察暖过程是否打断冷空气，粉雪窗口可能短于行程。','三月将新雪机会与晴天日照、冻融一起评估。','四月以春雪和实际开放范围安排，不能把冬季回顾外推至月底。']},
'2de170090f678a76':{
name:'白马',claim:'联合雪区不能只给一个雪质结论，先按海拔与开放区选场。',
facts:[['760—1,831 m','官方八方尾根雪场海拔；仅为白马成员雪场示例','hakuba'],['1,071 m','八方尾根高差，不能代表白马十场整体','hakuba']],
baseline:'白马由多个雪场构成。本页以官方八方尾根资料展示内部海拔差异，不将其数值当作白马全域海拔或雪量。尚未取得统一口径的长期月度降雪序列。',
chain:[['机构说明','日本气象厅提示厄尔尼诺冬季日本易偏暖，但本州内部差异不能由全国倾向直接确定。','jma'],['雪场事实','八方尾根官方海拔范围760—1,831米；这是联合目的地中的一个成员雪场。','hakuba'],['本站推断','同一暖湿过程可能在高低雪区形成不同雪面。整体“白马好雪”标签会掩盖局部冻融和开放差异。',null],['出行判断','按住处可达性、当日风与各成员雪场开放范围选择，避免只固定一个低处雪区。',null]],
metrics:['降雪需要冷空气与水汽配合，不能从全国偏暖推算降雪减少量。','较高处与背阴区可能保雪更好，需用当日雪况验证。','暖雨与回冷可能造成高低处截然不同的雪面。','联合通票的选择空间不等于所有雪区均开放。'],
good:'冷风暴覆盖目标雪场且高处缆车开放，低处也有足够雪底',bad:'雨雪分界线上升覆盖低处，回冷后结硬；高处又因风停运',watch:'成员雪场的分海拔天气、开放报告与交通时间',
monthly:['十二月逐场看开放范围，不能用某一成员的雪况代替整个白马。','一月优先观察冷风暴窗口，再决定当天去哪个成员雪场。','二月在雪底和冻融之间权衡，温暖插曲可能改变低处雪质。','三月按坡向、海拔和日照时段调整，而非全谷同一天同一种雪面。','四月先看各成员的关场公告；高处有雪也不意味着联合交通正常。']},
'44b787b6cfc4886d':{
name:'松花湖',claim:'滑道稳定性与自然粉雪机会，应当分开判断。',
facts:[['吉林市 · 大青山','省文旅厅介绍的目的地区位','songhua'],['资料口径待统一','公开介绍有旧设施与高差口径；本版不用于计算全场海拔','songhua']],
baseline:'公开文旅介绍不能替代气象站实测。宣传中的“雪厚”“积雪期”与累计降雪量不是同一指标。本页暂缺同一雪场测点的长期月度气温、自然降雪与造雪记录，不制作数量图。',
chain:[['证据边界','尚未接入能支持松花湖逐月异常判断的季节模型，因此不给“厄尔尼诺必然减雪”的结论。',null],['目的地事实','省文旅厅资料将目的地定位于吉林市大青山区域。当前公开资料不足以量化各雪道自然雪与造雪比例。','songhua'],['本站推断','低温有助于保雪和造雪窗口，但新鲜自然粉雪还需要降水；整备滑道良好不等于降雪频繁。',null],['出行判断','练习滑道优先看开放与整备，追自然粉雪则等临近降雪预报；不要用同一评分代替两个目标。',null]],
metrics:['目前不能量化自然新雪频率，需临近降水预报。','气温与整备影响雪面，低温也可能带来偏硬滑感。','关注升温后再次冻结；不能只凭空气温度判断脚下雪。','运营开放、造雪与压雪资料比自然降雪总量更直接。'],
good:'温度允许维护雪面，主要雪道正常开放，且另有自然降雪补充',bad:'升温后回冷导致雪面偏硬，或开放范围未满足滑行需求',watch:'雪道开放率、整备报告、昼夜温度和近期自然降雪',
monthly:['十二月重点看造雪与开道进度，不以“冬季到了”推断全场开放。','一月按保暖、风与整备选择滑行时段；低温不等于自然粉雪多。','二月看昼夜变化与整备质量，区别滑道练习与追粉目标。','三月关注日间升温与夜间回冻，雪面可能在一天内明显变化。','四月必须先核实当季关场安排，不预设还可常规滑雪。']},
'4fe0a35f77334fb7':{
name:'采尔马特',claim:'高海拔提供选雪空间，却不能保证粉雪或跨境连滑。',
facts:[['3,883 m','瓦莱州旅游局列出的雪道海拔上限；非全场平均','zermatt'],['分区与跨境开放','缆车公司提供实时雪况与开放查询','zermattLive']],
baseline:'海拔上限有助于理解地形，不等于所有雪道都位于高处。尚未取得覆盖本目的地且口径一致的长期月度雪量序列；不将冰川、高处雪深与山村降雪合并。',
chain:[['机构说明','Met Office指出ENSO是欧洲气候驱动之一。英国或西北欧的信号不能直接套到瓦莱州。','met'],['雪场事实','区域旅游局公布雪道海拔上限3,883米；缆车公司另行发布雪况与开放状态。','zermatt'],['本站推断','高处可提供不同温度条件，但仍需降水才有新雪；风、能见度和连接缆车决定能否利用这份海拔优势。',null],['出行判断','把高处保雪与跨境开放分开评估，出发前逐区查开放而不是只看“冰川雪场”标签。',null]],
metrics:['高海拔不创造降水，仍需看风暴能否抵达。','高处可能更利于低温保雪，日照与风仍影响雪面。','低处与高处分别核实，不能用顶部气温代替回程雪道。','强风可能限制高处和跨境连接，即使雪量足够。'],
good:'冷风暴带来补雪，随后风减弱，高处与连接缆车正常开放',bad:'长时间少雪或强风限制高处，低处同时出现明显冻融',watch:'分区雪况、高处风速、跨境连接与回程雪道开放',
monthly:['十二月确认预期滑行区域雪底和开放，冰川存在不等于所有线路开放。','一月同时看低温和风，保雪条件与可利用地形可能不同步。','二月关注风暴补雪与风后开放，不承诺跨境连滑。','三月利用不同海拔与坡向择时滑行，午后雪面可能明显变化。','四月以实际开放的高处和春雪窗口为主，勿将顶部雪况代表回程低处。']}
};
const northMonths=[
'十二月｜建立雪底：先核实目标线路是否正式开放；设施、地图和历史开场日期都不等于本季全开。',
'一月｜观察冷暖过程：隆冬只是季节背景，低温与降水是否重合、雪后是否回暖仍需临近预报。',
'二月｜区分雪底与新雪：已经形成覆盖不代表持续有粉雪；暖雨、风和整备可能改变表面。',
'三月｜按日照择时：昼夜冻融影响增大，比较早间硬面与日间软化，具体取决于当地温度。',
'四月｜先核实运营：即使高处仍有残雪或新雪，也不等于全场、连接道或缆车持续开放。'
];
const southMonths=[
'十二月｜当地初夏：不将北半球开季逻辑套用这里；先查是否存在官方明确的特殊滑雪运营。',
'一月｜当地夏季：观光缆车开放和山顶残雪不能证明常规滑雪开放。',
'二月｜当地夏末：本页不据此预测粉雪窗口；冬季地形优势不能当作夏季可滑证据。',
'三月｜当地入秋：偶发降雪不能替代连续雪底与正式开季公告。',
'四月｜当地秋季：关注接下来南半球冬季的开季准备，不预设四月已有常规滑雪服务。'
];
for(const d of destinations){
 const key='destination_'+d.id;
 if(studies[d.id])throw new Error('Duplicate destination evidence: '+d.id);
 evidenceSources[key]={name:d.zh+' · '+d.sourceTitle,url:d.url,date:d.sourceBasis+'；内容复核 '+d.reviewed};
 const seasonal=d.south?southMonths:northMonths;
 studies[d.id]={name:d.zh,local:d,south:d.south,reviewed:d.reviewed,claim:d.implication,
 facts:[['目的地事实',d.fact,key]],
 baseline:'本条证据支持地形、观测或运营条件的判断；它不是该雪场2026/27逐月降雪量的测算。尚未接入统一测点的长期月度序列，也未完成历史回测。历史公告只用于说明机制，规划项目须以投运公告复核。',
 chain:[['核查来源',d.fact,key],['事实意味着什么',d.implication,null],['适用边界',d.south?'十二月至四月对应当地夏秋；以上冬季地形或设施信息不能作为本时间范围可滑的证明。':'地形与设施不能确定未来风暴出现日期，也不能从区域ENSO倾向推导出这里每月增雪或减雪的幅度。',null],['出行复核',d.watch+'。将观测日期、目标雪区和正式开放状态一起核对。',null]],
 monthly:seasonal.map(t=>t+' 本场重点：'+d.watch+'。'),
 good:d.south?'官方明确公布特殊滑雪运营，且目标区域有连续覆盖并正式开放':'目标区域有足够覆盖，近期补雪或整备改善雪面，且所需设施正常开放',
 bad:d.south?'仅有观光开放或短暂残雪，没有常规滑雪服务':'目标区域覆盖不足，暖雨回冻或风影响雪面，或关键入口与设施关闭',
 watch:d.watch};
}
export const evidenceCoverage={total:Object.keys(studies).length,destinationRecords:destinations.length,historicalSeries:Object.values(studies).filter(s=>s.history).length,reviewed:'2026-09-12'};
const stages=['雪底尚在建立，先确认开放。','隆冬有利保雪只是季节背景，仍需降水配合。','雪底与暖过程共同影响体验。','日照和冻融让时段选择更重要。','运营日历优先于任何雪量判断。'];
export function monthEvidence(id,i){const s=studies[id];if(!s||!Number.isInteger(i)||i<0||i>4)return null;const stage=s.south?southMonths[i]:stages[i];return {base:s.monthly[i],good:`如果${s.good}，${s.south?'才有依据进一步核实特殊滑雪行程。':'可再结合当日雪报调整滑行区域与时段。'}`,bad:`如果${s.bad}，则应调整行程预期。`,trigger:s.watch,reason:stage};}
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function source(key){const s=evidenceSources[key];return s?`<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)} ↗</a><small>${esc(s.date)}</small>`:'';}
export function studyHTML(id){const s=studies[id];if(!s)return '';if(s.local)return localStudyHTML(s);return `<section class="evidence" aria-labelledby="evidence-title"><span class="kicker">EVIDENCE / 目的地分析 · 证据版</span><h2 id="evidence-title">为什么这样判断？</h2><p class="evidence-claim">${esc(s.claim)}</p><div class="evidence-status">已核查资料与推理链 · 未完成历史回测 · 不代表预测准确率更高</div><details open><summary>事实与历史基线</summary><div class="fact-grid">${s.facts.map(f=>`<article><strong>${esc(f[0])}</strong><p>${esc(f[1])}</p>${source(f[2])}</article>`).join('')}</div>${s.history?`<figure class="history-chart"><figcaption>历史累计降雪 · Grand Hirafu 中山观测点（cm）</figcaption>${s.history.map(([y,v])=>`<div class="history-row"><span>${y}</span><div><i style="width:${v/1800*100}%"></i></div><b>${v.toLocaleString()}</b></div>`).join('')}<p>统一零起点，图轴上限1,800 cm；不是雪深，不是2026/27预测。</p>${source('niseko')}</figure>`:''}<p class="caption">${esc(s.baseline)}</p></details><details><summary>四步判断：从证据到出行建议</summary><ol class="reason-chain">${s.chain.map(x=>`<li><span>${esc(x[0])}</span><p>${esc(x[1])}</p>${x[2]?source(x[2]):'<small>本站物理机制推断或出行建议，未赋予统计概率。</small>'}</li>`).join('')}</ol></details><details><summary>把雪质拆开看：四个维度</summary><div class="metric-grid">${['新雪机会','保雪条件','暖雨与冻融','可滑稳定性'].map((n,i)=>`<article><h3>${n}</h3><p>${esc(s.metrics[i])}</p></article>`).join('')}</div></details><details><summary>可信度与更新规则</summary><p>“目的地分析”表示补充了目的地证据，不是高准确率评级。当前未接入雪场级校准模型，未完成对照常年气候基线的历史回测，不发布数字概率或综合分数。</p><p>如后续出现相反的区域展望、暖雨或缆车开放变化，应调整判断。月份越远，越应以季节与运营核查为主。本站内容仍需人工更新，暂不自动监控天气。</p>${source('skill')}</details></section>`;}
export function scenarioHTML(id,i){const m=monthEvidence(id,i);return m?`<section class="scenarios" aria-label="所选月份的判断情景"><div class="section-head"><div><span class="kicker">IF / THEN</span><h2>什么情况会改变判断？</h2></div><span class="confidence">条件情景 · 未赋予概率</span></div><div class="scenario-grid"><article><h3>主要判断</h3><p>${esc(m.base)}</p></article><article><h3>偏好情景</h3><p>${esc(m.good)}</p></article><article><h3>不利情景</h3><p>${esc(m.bad)}</p></article></div><p class="watch-trigger"><strong>出发前复核：</strong>${esc(m.trigger)}。本页没有实时获取这些指标。</p></section>`:'';}

function localStudyHTML(s){const d=s.local;return `<section class="evidence" aria-labelledby="evidence-title"><span class="kicker">EVIDENCE / 目的地证据分析</span><h2 id="evidence-title">为什么这样判断？</h2><p class="evidence-claim">${esc(d.implication)}</p><div class="evidence-status">已补充目的地资料 · 未完成历史回测 · 不代表预测准确率更高</div><details open><summary>来源确认的事实</summary><p>${esc(d.fact)}</p>${source('destination_'+d.id)}<p class="caption">资料核查记录与分析版本日期分开保留。动态页面可能更新；历史事实不表示本季仍处于同一状态。</p></details><details open><summary>从事实到出行判断</summary><ol class="reason-chain">${s.chain.slice(1).map(x=>`<li><span>${esc(x[0])}</span><p>${esc(x[1])}</p><small>本站分析与建议，非来源机构发布的雪场预报。</small></li>`).join('')}</ol></details><details><summary>证据能说明什么，还缺什么？</summary><p>${esc(s.baseline)}</p><p>以下月份使用${s.south?'南半球夏秋':'北半球冬春'}的共同季节框架，再列出本目的地的复核重点。这不是五次独立的数值模型预测，不提供未经校准的雪量、概率或评分。造雪覆盖不等于自然降雪，地图地形不等于已开放地形。</p>${source('skill')}</details></section>`;}
