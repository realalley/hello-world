#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成全球滑雪场对比Excel表格
包含：IKON Pass雪场、Epic Pass雪场、不支持任一Pass的Top50雪场、中国Top30雪场
按可滑面积从大到小排序
"""

import subprocess
import sys

# 安装openpyxl
try:
    import openpyxl
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "openpyxl", "-q"])
    import openpyxl

from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# ============================================================
# 数据定义
# 格式: (英文名, 中文名, 国家/州或省, Pass类型, 可滑面积_英亩, 官方链接)
# 面积统一用英亩(acres)进行比较排序，无数据的用0表示
# ============================================================

all_resorts = [
    # ==================== IKON PASS 主目的地 ====================
    ("Alyeska Resort", "阿列斯卡", "美国/阿拉斯加州", "Ikon Pass", 0, "https://www.alyeskaresort.com"),
    ("Palisades Tahoe", "帕利塞兹塔霍", "美国/加利福尼亚州", "Ikon Pass", 6000, "https://www.palisadestahoe.com"),
    ("Sierra-at-Tahoe", "塔霍山西侧", "美国/加利福尼亚州", "Ikon Pass", 2000, "https://www.sierraattahoe.com"),
    ("Mammoth Mountain", "猛犸山", "美国/加利福尼亚州", "Ikon Pass", 3500, "https://www.mammothmountain.com"),
    ("June Mountain", "六月山", "美国/加利福尼亚州", "Ikon Pass", 500, "https://www.junemountain.com"),
    ("Big Bear Mountain Resort", "大熊山", "美国/加利福尼亚州", "Ikon Pass", 800, "https://www.bigbearmountainresort.com"),
    ("Snow Valley", "雪谷", "美国/加利福尼亚州", "Ikon Pass", 240, "https://www.snowvalley.com"),
    ("Aspen Snowmass", "阿斯彭雪花山", "美国/科罗拉多州", "Ikon Pass", 5517, "https://www.aspensnowmass.com"),
    ("Steamboat", "蒸汽船", "美国/科罗拉多州", "Ikon Pass", 2965, "https://www.steamboat.com"),
    ("Winter Park Resort", "冬季公园", "美国/科罗拉多州", "Ikon Pass", 3110, "https://www.winterparkresort.com"),
    ("Copper Mountain Resort", "铜山", "美国/科罗拉多州", "Ikon Pass", 2538, "https://www.coppercolorado.com"),
    ("Arapahoe Basin", "阿拉帕霍盆地", "美国/科罗拉多州", "Ikon Pass", 1428, "https://www.arapahoebasin.com"),
    ("Eldora Mountain Resort", "埃尔多拉山", "美国/科罗拉多州", "Ikon Pass", 680, "https://www.eldora.com"),
    ("Sun Valley", "太阳谷", "美国/爱达荷州", "Ikon Pass", 2400, "https://www.sunvalley.com"),
    ("Schweitzer", "施魏策", "美国/爱达荷州", "Ikon Pass", 2900, "https://www.schweitzer.com"),
    ("Sugarloaf", "糖块山", "美国/缅因州", "Ikon Pass", 1360, "https://www.sugarloaf.com"),
    ("Sunday River", "周日河", "美国/缅因州", "Ikon Pass", 870, "https://www.sundayriver.com"),
    ("Boyne Mountain", "波因特山", "美国/密歇根州", "Ikon Pass", 415, "https://www.boynemountain.com"),
    ("The Highlands", "高地", "美国/密歇根州", "Ikon Pass", 405, "https://www.thehighlands.com"),
    ("Snowriver Mountain Resort", "雪河山", "美国/密歇根州", "Ikon Pass", 500, "https://www.snowriver.com"),
    ("Lutsen Mountains", "卢岑山", "美国/明尼苏达州", "Ikon Pass", 590),
    ("Big Sky Resort", "大天空", "美国/蒙大拿州", "Ikon Pass", 5850),
    ("Loon Mountain", "猫头鹰山", "美国/新罕布什尔州", "Ikon Pass", 480),
    ("Taos Ski Valley", "陶斯滑雪谷", "美国/新墨西哥州", "Ikon Pass", 1294),
    ("Mt. Bachelor", "巴切尔山", "美国/俄勒冈州", "Ikon Pass", 4360),
    ("Camelback Resort", "骆驼背", "美国/宾夕法尼亚州", "Ikon Pass", 166),
    ("Blue Mountain Resort", "蓝山", "美国/宾夕法尼亚州", "Ikon Pass", 110),
    ("Deer Valley Resort", "鹿谷", "美国/犹他州", "Ikon Pass", 2126),
    ("Solitude Mountain Resort", "孤峰山", "美国/犹他州", "Ikon Pass", 1200),
    ("Alta Ski Area", "阿尔塔", "美国/犹他州", "Ikon Pass", 2200),
    ("Snowbird", "雪鸟", "美国/犹他州", "Ikon Pass", 2500),
    ("Brighton Resort", "布莱顿", "美国/犹他州", "Ikon Pass", 1050),
    ("Snowbasin", "雪山盆地", "美国/犹他州", "Ikon Pass", 3000),
    ("Stratton", "斯特拉顿", "美国/佛蒙特州", "Ikon Pass", 670),
    ("Sugarbush Resort", "糖树", "美国/佛蒙特州", "Ikon Pass", 578),
    ("Killington-Pico", "基灵顿-皮科", "美国/佛蒙特州", "Ikon Pass", 1977),
    ("Crystal Mountain", "水晶山", "美国/华盛顿州", "Ikon Pass", 2600),
    ("The Summit at Snoqualmie", "斯诺夸尔米之巅", "美国/华盛顿州", "Ikon Pass", 2015),
    ("Snowshoe", "雪鞋山", "美国/西弗吉尼亚州", "Ikon Pass", 257),
    ("Granite Peak Resort", "花岗岩峰", "美国/威斯康星州", "Ikon Pass", 400),
    ("Jackson Hole Mountain Resort", "杰克逊霍尔", "美国/怀俄明州", "Ikon Pass", 2600),
    ("SkiBig3", "滑雪大三(Banff)", "加拿大/艾伯塔省", "Ikon Pass", 3000),
    ("Blue Mountain", "蓝山", "加拿大/安大略省", "Ikon Pass", 864),
    ("Tremblant", "翠波朗", "加拿大/魁北克省", "Ikon Pass", 1200),
    ("Le Massif de Charlevoix", "夏尔博瓦山", "加拿大/魁北克省", "Ikon Pass", 545),
    ("Revelstoke Mountain Resort", "雷维斯托克", "加拿大/不列颠哥伦比亚省", "Ikon Pass", 3121),
    ("RED Mountain", "RED山", "加拿大/不列颠哥伦比亚省", "Ikon Pass", 3000),
    ("Cypress Mountain", "柏树山", "加拿大/不列颠哥伦比亚省", "Ikon Pass", 640),
    ("Panorama Mountain Resort", "全景山", "加拿大/不列颠哥伦比亚省", "Ikon Pass", 2847),
    ("Sun Peaks Resort", "阳光峰", "加拿大/不列颠哥伦比亚省", "Ikon Pass", 4578),
    ("SilverStar Mountain", "银星山", "加拿大/不列颠哥伦比亚省", "Ikon Pass", 3305),
    ("Kitzbühel", "基茨比厄尔", "奥地利/蒂罗尔州", "Ikon Pass", 5600),
    ("Ischgl", "伊施格尔", "奥地利/蒂罗尔州", "Ikon Pass", 5500),
    ("Grandvalira Resorts Andorra", "格兰德维拉", "安道尔", "Ikon Pass", 5000),
    ("Chamonix Mont-Blanc Valley", "霞慕尼勃朗峰", "法国/上萨瓦省", "Ikon Pass", 5289),
    ("Megève Ski Area", "梅热夫", "法国/上萨瓦省", "Ikon Pass", 4000),
    ("Dolomiti Superski", "多洛米蒂超级滑雪", "意大利/特伦蒂诺-上阿迪杰", "Ikon Pass", 29000),
    ("Valle d'Aosta", "瓦莱达奥斯塔", "意大利/瓦莱达奥斯塔", "Ikon Pass", 4000),
    ("Zermatt Matterhorn", "采尔马特马特洪", "瑞士/瓦莱州", "Ikon Pass", 14000),
    ("St. Moritz", "圣莫里茨", "瑞士/格劳宾登州", "Ikon Pass", 3500),
    ("Thredbo", "瑟德博", "澳大利亚/新南威尔士州", "Ikon Pass", 480),
    ("Mt Buller", "布尔勒山", "澳大利亚/维多利亚州", "Ikon Pass", 740),
    ("Coronet Peak", "科罗内特峰", "新西兰/坎特伯雷", "Ikon Pass", 400),
    ("The Remarkables", "壮观山脉", "新西兰/奥塔哥", "Ikon Pass", 385),
    ("Mt Hutt", "哈特山", "新西兰/坎特伯雷", "Ikon Pass", 930),
    ("Yunding Snow Park", "云顶滑雪公园", "中国/吉林省", "Ikon Pass", 0),
    ("Beidahu Ski Resort", "北大湖", "中国/吉林省", "Ikon Pass", 680),
    ("Lake Songhua Resort", "万科松花湖", "中国/吉林省", "Ikon Pass", 543),
    ("Niseko United", "新雪谷联合", "日本/北海道", "Ikon Pass", 2192),
    ("Arai Mountain Resort", "新井山", "日本/长野县", "Ikon Pass", 988),
    ("Shiga Kogen Mountain Resort", "志贺高原", "日本/长野县", "Ikon Pass", 988),
    ("Mt.T", "Mt.T", "日本/长野县", "Ikon Pass", 400),
    ("Myoko Suginohara Ski Resort", "妙高杉之原", "日本/新潟县", "Ikon Pass", 222),
    ("APPI Resort", "安比度假村", "日本/岩手县", "Ikon Pass", 620),
    ("Furano Ski Resort", "富良野", "日本/北海道", "Ikon Pass", 500),
    ("NEKOMA Mountain", "猫魔山", "日本/北海道", "Ikon Pass", 300),
    ("Zao Onsen Ski Resort", "藏王温泉", "日本/宫城县", "Ikon Pass", 1260),
    ("Madarao Mountain Resort", "斑尾山", "日本/长野县", "Ikon Pass", 223),
    ("Mona Yongpyong", "龙平", "韩国/江原道", "Ikon Pass", 0),
    ("Valle Nevado", "内瓦多山", "智利/圣地亚哥", "Ikon Pass", 1800),

    # ==================== IKON PASS Bonus Mountains ====================
    ("Cranmore Mountain Resort", "克兰莫山", "美国/新罕布什尔州", "Ikon Pass Bonus", 200),
    ("Ski Butternut", "滑雪琴书", "美国/马萨诸塞州", "Ikon Pass Bonus", 110),
    ("Jiminy Peak", "吉米尼峰", "美国/马萨诸塞州", "Ikon Pass Bonus", 167),
    ("Buck Hill", "巴克山", "美国/明尼苏达州", "Ikon Pass Bonus", 45),
    ("Caberfae Peaks", "卡伯菲峰", "美国/密歇根州", "Ikon Pass Bonus", 500),
    ("Devil's Head Resort", "魔鬼头", "美国/威斯康星州", "Ikon Pass Bonus", 300),
    ("Wild Mountain", "野山", "美国/明尼苏达州", "Ikon Pass Bonus", 230),
    ("Giants Ridge Recreation Area", "巨人岭", "美国/明尼苏达州", "Ikon Pass Bonus", 600),
    ("Snowy Range Ski Area", "雪景", "美国/怀俄明州", "Ikon Pass Bonus", 200),
    ("Tamarack Resort", "塔马克", "美国/爱达荷州", "Ikon Pass Bonus", 500),
    ("Grouse Mountain", "松鸡山", "加拿大/不列颠哥伦比亚省", "Ikon Pass Bonus", 500),

    # ==================== EPIC PASS 雪场 ====================
    ("Vail", "韦尔", "美国/科罗拉多州", "Epic Pass", 5317),
    ("Beaver Creek", "比弗溪", "美国/科罗拉多州", "Epic Pass", 1832),
    ("Breckenridge", "布雷肯里奇", "美国/科罗拉多州", "Epic Pass", 2908),
    ("Keystone", "基斯通", "美国/科罗拉多州", "Epic Pass", 3148),
    ("Crested Butte", "克雷斯特德比特", "美国/科罗拉多州", "Epic Pass", 1547),
    ("Park City", "帕克城", "美国/犹他州", "Epic Pass", 7300),
    ("Heavenly", "天堂", "美国/加利福尼亚州&内华达州", "Epic Pass", 4800),
    ("Northstar", "北星", "美国/加利福尼亚州", "Epic Pass", 3170),
    ("Kirkwood", "柯克伍德", "美国/加利福尼亚州", "Epic Pass", 2300),
    ("Stevens Pass", "史蒂文斯山口", "美国/华盛顿州", "Epic Pass", 1125),
    ("Whistler Blackcomb", "惠斯勒黑梳山", "加拿大/不列颠哥伦比亚省", "Epic Pass", 8171),
    ("Stowe", "斯托", "美国/佛蒙特州", "Epic Pass", 485),
    ("Okemo", "奥克莫", "美国/佛蒙特州", "Epic Pass", 632),
    ("Mount Snow", "斯诺山", "美国/佛蒙特州", "Epic Pass", 601),
    ("Attitash Mountain", "阿提塔什", "美国/新罕布什尔州", "Epic Pass", 310),
    ("Crotched Mountain", "克劳奇山", "美国/新罕布什尔州", "Epic Pass", 100),
    ("Wildcat Mountain", "野猫山", "美国/新罕布什尔州", "Epic Pass", 225),
    ("Mount Sunapee", "苏纳皮山", "美国/新罕布什尔州", "Epic Pass", 233),
    ("Hunter Mountain", "猎人山", "美国/纽约州", "Epic Pass", 320),
    ("Afton Alps", "阿夫顿阿尔卑斯", "美国/明尼苏达州", "Epic Pass", 300),
    ("Mt. Brighton", "布莱顿山", "美国/密歇根州", "Epic Pass", 130),
    ("Wilmot Mountain", "威尔莫特山", "美国/威斯康星州", "Epic Pass", 120),
    ("Seven Springs", "七泉", "美国/宾夕法尼亚州", "Epic Pass", 285),
    ("Liberty Mountain", "自由山", "美国/宾夕法尼亚州", "Epic Pass", 100),
    ("Roundtop Mountain Resort", "朗德托普山", "美国/宾夕法尼亚州", "Epic Pass", 103),
    ("Whitetail Resort", "白尾", "美国/宾夕法尼亚州", "Epic Pass", 119),
    ("Jack Frost", "杰克弗罗斯特", "美国/宾夕法尼亚州", "Epic Pass", 99),
    ("Big Boulder", "大圆石", "美国/宾夕法尼亚州", "Epic Pass", 55),
    ("Hidden Valley (PA)", "隐秘谷", "美国/宾夕法尼亚州", "Epic Pass", 110),
    ("Laurel Mountain Ski Area", "劳雷尔山", "美国/宾夕法尼亚州", "Epic Pass", 70),
    ("Boston Mills/Brandywine", "波士顿磨坊/白兰地", "美国/俄亥俄州", "Epic Pass", 88),
    ("Mad River Mountain", "疯山河", "美国/俄亥俄州", "Epic Pass", 144),
    ("Alpine Valley", "阿尔派恩谷", "美国/俄亥俄州", "Epic Pass", 72),
    ("Paoli Peaks", "保利峰", "美国/印第安纳州", "Epic Pass", 65),
    ("Snow Creek", "雪溪", "美国/密苏里州", "Epic Pass", 50),
    ("Hidden Valley (MO)", "隐秘谷", "美国/密苏里州", "Epic Pass", 30),
    ("Telluride", "特柳赖德", "美国/科罗拉多州", "Epic Pass", 2000),
    ("Fernie Alpine Resort", "弗尼", "加拿大/不列颠哥伦比亚省", "Epic Pass", 2500),
    ("Kicking Horse Mountain Resort", "踢马山", "加拿大/不列颠哥伦比亚省", "Epic Pass", 2825),
    ("Kimberley Alpine Resort", "金伯利", "加拿大/不列颠哥伦比亚省", "Epic Pass", 1800),
    ("Mont Sainte Anne", "圣安妮山", "加拿大/魁北克省", "Epic Pass", 547),
    ("Nakiska", "纳基斯卡", "加拿大/艾伯塔省", "Epic Pass", 750),
    ("Stoneham", "斯通汉姆", "加拿大/魁北克省", "Epic Pass", 330),
    ("Zillertal", "齐勒河谷", "奥地利/蒂罗尔州", "Epic Pass", 3500),
    ("Saalbach & Zell am See-Kaprun", "萨尔巴赫&采尔湖", "奥地利/萨尔茨堡州", "Epic Pass", 4000),
    ("Silvretta Montafon", "西尔弗雷塔蒙塔丰", "奥地利/福拉尔贝格州", "Epic Pass", 1000),
    ("Ski Arlberg", "阿尔贝格滑雪区", "奥地利/福拉尔贝格州", "Epic Pass", 11000),
    ("Sölden", "索尔登", "奥地利/蒂罗尔州", "Epic Pass", 1200),
    ("Verbier 4 Vallées", "维尔比耶四山谷", "瑞士/瓦莱州", "Epic Pass", 19000),
    ("Les 3 Vallées", "三山谷", "法国/萨瓦省", "Epic Pass", 25000),
    ("Skirama Dolomiti", "斯基拉马多洛米蒂", "意大利/特伦蒂诺", "Epic Pass", 6000),
    ("Rusutsu Resort", "留寿都", "日本/北海道", "Epic Pass", 1378),
    ("Hakuba Valley", "白马谷", "日本/长野县", "Epic Pass", 2300),

    # ==================== 不支持IKON/Epic的全球Top雪场 ====================
    ("Portes du Soleil", "太阳之门", "法国/瑞士", "无", 30000),
    ("Espace Killy (Val d'Isère/Tignes)", "基利空间(瓦尔德伊泽尔/塔因斯)", "法国/萨瓦省", "无", 11600),
    ("Les Sybelles", "塞贝尔斯", "法国/萨瓦省", "无", 15000),
    ("Via Lattea", "银河大道", "意大利/法国", "无", 16000),
    ("SkiWelt Wilder Kaiser-Brixental", "滑雪世界维尔德凯撒", "奥地利/蒂罗尔州", "无", 7100),
    ("Sella Ronda (Dolomiti)", "塞拉龙达(多洛米蒂)", "意大利/威尼托", "无", 12000),
    ("Whitefish Mountain Resort", "白鱼山", "美国/蒙大拿州", "无", 3000),
    ("Mt Hood Meadows", "胡德山草甸", "美国/俄勒冈州", "无", 2150),
    ("Grand Targhee", "格兰德塔吉", "美国/怀俄明州", "无", 2000),
    ("Bridger Bowl", "布里杰碗", "美国/蒙大拿州", "无", 2000),
    ("Silverton Mountain", "银山", "美国/科罗拉多州", "无", 1818),
    ("Loveland", "洛弗兰", "美国/科罗拉多州", "无", 1800),
    ("Bear Valley", "熊谷", "美国/加利福尼亚州", "无", 1680),
    ("Powder Mountain", "粉雪山", "美国/犹他州", "无", 7000),
    ("Davos Klosters", "达沃斯克洛斯特", "瑞士/格劳宾登州", "无", 3000),
    ("Madriver Glen", "疯河谷", "美国/佛蒙特州", "无", 600),
    ("Jay Peak", "杰峰", "美国/佛蒙特州", "无", 385),
    ("Smugglers' Notch", "走私者峡", "美国/佛蒙特州", "无", 1000),
    ("Saddleback", "马鞍山", "美国/缅因州", "无", 600),
    ("Bretton Woods", "布雷顿森林", "美国/新罕布什尔州", "无", 464),
    ("Waterville Valley", "沃特维尔谷", "美国/新罕布什尔州", "无", 266),
    ("Cannon Mountain", "炮台山", "美国/新罕布什尔州", "无", 200),
    ("Magic Mountain", "魔法山", "美国/佛蒙特州", "无", 240),
    ("Pico Mountain", "皮科山", "美国/佛蒙特州", "无", 468),
    ("Bolton Valley", "博尔顿谷", "美国/佛蒙特州", "无", 300),
    ("Burke Mountain", "伯克山", "美国/佛蒙特州", "无", 200),
    ("Mad River Mountain (OH)", "疯山河(俄亥俄)", "美国/俄亥俄州", "无", 144),
    ("Brundage Mountain", "布伦戴奇山", "美国/爱达荷州", "无", 1920),
    ("Anthony Lakes", "安东尼湖", "美国/俄勒冈州", "无", 1100),
    ("Willamette Pass", "威拉米特山口", "美国/俄勒冈州", "无", 555),
    ("Hoodoo", "巫毒", "美国/俄勒冈州", "无", 800),
    ("Mt. Ashland", "阿什兰山", "美国/俄勒冈州", "无", 200),
    ("49 Degrees North", "49度北", "美国/华盛顿州", "无", 2325),
    ("Mission Ridge", "使命岭", "美国/华盛顿州", "无", 670),
    ("Stevens Pass (HC)", "史蒂文斯山口(HC)", "美国/华盛顿州", "无", 1125),
    ("Snoqualmie East", "斯诺夸尔米东", "美国/华盛顿州", "无", 815),
    ("Crystal Mountain (HC)", "水晶山(HC)", "美国/华盛顿州", "无", 2600),
    ("Mt. Baker", "贝克山", "美国/华盛顿州", "无", 1000),
    ("Lee Canyon", "李峡谷", "美国/内华达州", "无", 195),
    ("Purgatory Resort", "炼狱度假村", "美国/科罗拉多州", "无", 1500),
    ("Wolf Creek", "狼溪", "美国/科罗拉多州", "无", 1600),
    ("Sunlight Mountain", "阳光山", "美国/科罗拉多州", "无", 670),
    ("Ski Sunlight", "阳光滑雪", "美国/科罗拉多州", "无", 670),
    ("Cooper", "库珀", "美国/科罗拉多州", "无", 400),
    ("Sunshine Village", "阳光村", "加拿大/艾伯塔省", "无", 3357),
    ("Lake Louise", "路易斯湖", "加拿大/艾伯塔省", "无", 4170),
    ("Banff Norquay", "班夫诺奎", "加拿大/艾伯塔省", "无", 190),
    ("Marmot Basin", "旱獭盆地", "加拿大/艾伯塔省", "无", 2950),
    ("Hakuba 47", "白马47", "日本/长野县", "无", 500),
    ("Rusutsu (HC)", "留寿都(HC)", "日本/北海道", "无", 1378),

    # ==================== 中国Top30雪场 ====================
    ("Keketuohai Ski Resort", "可可托海", "中国/新疆阿勒泰", "无", 43),
    ("Hemu Jikepulin Ski Resort", "禾木吉克普林", "中国/新疆阿勒泰", "无", 964),
    ("Beidahu Ski Resort (CN)", "北大湖", "中国/吉林市", "Ikon Pass", 680),
    ("Vanke Songhua Lake Resort", "万科松花湖", "中国/吉林市", "Ikon Pass", 543),
    ("Silk Road International Ski Resort", "丝绸之路国际滑雪场", "中国/新疆乌鲁木齐", "无", 426),
    ("Wanlong Ski Resort", "万龙滑雪场", "中国/河北张家口崇礼", "无", 222),
    ("Wanda Changbaishan Ski Resort", "万达长白山", "中国/吉林长白山", "无", 247),
    ("Jiangjunshan Ski Resort", "将军山", "中国/新疆阿勒泰", "无", 148),
    ("Yabuli Windmill Mountain", "亚布力风车山", "中国/黑龙江哈尔滨", "无", 124),
    ("Nanshan Ski Resort", "南山滑雪场", "中国/北京延庆", "无", 0),
    ("Bayi Ski Resort", "八一滑雪场", "中国/黑龙江哈尔滨", "无", 0),
    ("Thaiwoo Ski Town", "太舞滑雪小镇", "中国/河北张家口崇礼", "无", 988),
    ("Fulong Ski Resort", "富龙滑雪场", "中国/河北张家口崇礼", "无", 0),
    ("Genting Secret Garden", "云顶滑雪公园", "中国/河北张家口崇礼", "Ikon Pass", 0),
    ("Wanfeng Tonghua Ski Resort", "万峰通化", "中国/吉林通化", "无", 0),
    ("Vanke Shijinglong Ski Resort", "万科石京龙", "中国/北京延庆", "无", 0),
    ("Thousand Island Lake Ski", "千岛湖万豪", "中国/浙江杭州", "无", 0),
    ("Damingshan Ski Resort", "大明山", "中国/浙江杭州", "无", 0),
    ("Shanghai Yaoxue Ice World", "上海耀雪冰雪世界", "中国/上海浦东", "无", 24),
    ("Guangzhou Hot Snow Miracle", "广州热雪奇迹", "中国/广东广州", "无", 14),
    ("Chengdu Hot Snow Miracle", "成都热雪奇迹", "中国/四川成都", "无", 14),
    ("Wuhan Ganlushan Ice World", "武汉甘露山", "中国/湖北武汉", "无", 15),
    ("Shanghai L+SNOW", "上海L+SNOW", "中国/上海浦东", "无", 16),
    ("Harbin VOCO Hot Snow Miracle", "哈尔滨VOCO热雪奇迹", "中国/黑龙江哈尔滨", "无", 16),
    ("Suzhou Taihu Dragon Dream", "苏州太湖龙之梦", "中国/江苏苏州", "无", 8),
    ("Songhua Lake (Beidahu Area)", "松花湖区域", "中国/吉林市", "无", 543),
    ("Changbaishan International", "长白山国际", "中国/吉林长白山", "无", 200),
    ("Jining Ski Resort", "集宁滑雪场", "中国/内蒙古乌兰察布", "无", 0),
    ("Duolemeng Ski Resort", "多伦梦滑雪场", "中国/内蒙古锡林郭勒", "无", 0),
]

# ============================================================
# 去重：同名雪场（跨Pass）合并Pass类型
# ============================================================
resort_dict = {}
for name_en, name_cn, location, pass_type, area in all_resorts:
    key = name_en.lower().strip()
    if key in resort_dict:
        existing = resort_dict[key]
        # 如果新数据有面积而旧数据没有，用新的
        if area > existing[4]:
            resort_dict[key] = (name_en, name_cn, location, pass_type, area)
        # 合并Pass类型
        if pass_type != existing[3]:
            merged_pass = f"{existing[3]} + {pass_type}"
            resort_dict[key] = (existing[0], existing[1], existing[2], merged_pass, resort_dict[key][4])
    else:
        resort_dict[key] = (name_en, name_cn, location, pass_type, area)

# 转为列表
resorts = list(resort_dict.values())

# 按可滑面积从大到小排序（面积相同的按英文名排序）
resorts.sort(key=lambda x: (-x[4], x[0]))

# ============================================================
# 创建Excel
# ============================================================
wb = Workbook()

# --- Sheet 1: 全部雪场（按面积排序） ---
ws1 = wb.active
ws1.title = "全部雪场(按面积排序)"

headers = ["排名", "雪场英文名", "雪场中文名", "国家/州或省", "支持的PASS种类", "可滑面积(英亩)", "可滑面积(公顷)"]

# 标题行样式
header_font = Font(name="微软雅黑", size=11, bold=True, color="FFFFFF")
header_fill = PatternFill(start_color="2B579A", end_color="2B579A", fill_type="solid")
header_align = Alignment(horizontal="center", vertical="center", wrap_text=True)
thin_border = Border(
    left=Side(style="thin", color="D9D9D9"),
    right=Side(style="thin", color="D9D9D9"),
    top=Side(style="thin", color="D9D9D9"),
    bottom=Side(style="thin", color="D9D9D9"),
)

for col, header in enumerate(headers, 1):
    cell = ws1.cell(row=1, column=col, value=header)
    cell.font = header_font
    cell.fill = header_fill
    cell.alignment = header_align
    cell.border = thin_border

# 数据行
data_font = Font(name="微软雅黑", size=10)
data_align = Alignment(horizontal="left", vertical="center", wrap_text=True)
center_align = Alignment(horizontal="center", vertical="center")

# Pass颜色映射
pass_colors = {
    "Ikon Pass": "E8F5E9",
    "Ikon Pass Bonus": "FFF3E0",
    "Epic Pass": "E3F2FD",
    "无": "FFEBEE",
}
default_color = "FFFFFF"

for idx, (name_en, name_cn, location, pass_type, area) in enumerate(resorts, 1):
    row = idx + 1
    area_hectares = round(area * 0.4047, 1) if area > 0 else 0
    
    ws1.cell(row=row, column=1, value=idx).alignment = center_align
    ws1.cell(row=row, column=2, value=name_en).alignment = data_align
    ws1.cell(row=row, column=3, value=name_cn).alignment = data_align
    ws1.cell(row=row, column=4, value=location).alignment = data_align
    
    pass_cell = ws1.cell(row=row, column=5, value=pass_type)
    pass_cell.alignment = center_align
    fill_color = pass_colors.get(pass_type, default_color)
    if "+" in pass_type:
        fill_color = "F3E5F5"
    pass_cell.fill = PatternFill(start_color=fill_color, end_color=fill_color, fill_type="solid")
    
    ws1.cell(row=row, column=6, value=area if area > 0 else "无数据").alignment = center_align
    ws1.cell(row=row, column=7, value=area_hectares if area > 0 else "无数据").alignment = center_align
    
    for col in range(1, 8):
        ws1.cell(row=row, column=col).font = data_font
        ws1.cell(row=row, column=col).border = thin_border

# 列宽
ws1.column_dimensions["A"].width = 6
ws1.column_dimensions["B"].width = 38
ws1.column_dimensions["C"].width = 22
ws1.column_dimensions["D"].width = 28
ws1.column_dimensions["E"].width = 18
ws1.column_dimensions["F"].width = 16
ws1.column_dimensions["G"].width = 16
ws1.freeze_panes = "A2"

# --- Sheet 2: IKON Pass雪场 ---
ws2 = wb.create_sheet("IKON Pass雪场")
ikon_resorts = [r for r in resorts if "Ikon" in r[3]]
ikon_resorts.sort(key=lambda x: -x[4])

for col, header in enumerate(headers, 1):
    cell = ws2.cell(row=1, column=col, value=header)
    cell.font = header_font
    cell.fill = PatternFill(start_color="2E7D32", end_color="2E7D32", fill_type="solid")
    cell.alignment = header_align
    cell.border = thin_border

for idx, (name_en, name_cn, location, pass_type, area) in enumerate(ikon_resorts, 1):
    row = idx + 1
    area_hectares = round(area * 0.4047, 1) if area > 0 else 0
    ws2.cell(row=row, column=1, value=idx).alignment = center_align
    ws2.cell(row=row, column=2, value=name_en).alignment = data_align
    ws2.cell(row=row, column=3, value=name_cn).alignment = data_align
    ws2.cell(row=row, column=4, value=location).alignment = data_align
    ws2.cell(row=row, column=5, value=pass_type).alignment = center_align
    ws2.cell(row=row, column=6, value=area if area > 0 else "无数据").alignment = center_align
    ws2.cell(row=row, column=7, value=area_hectares if area > 0 else "无数据").alignment = center_align
    for col in range(1, 8):
        ws2.cell(row=row, column=col).font = data_font
        ws2.cell(row=row, column=col).border = thin_border

ws2.column_dimensions["A"].width = 6
ws2.column_dimensions["B"].width = 38
ws2.column_dimensions["C"].width = 22
ws2.column_dimensions["D"].width = 28
ws2.column_dimensions["E"].width = 18
ws2.column_dimensions["F"].width = 16
ws2.column_dimensions["G"].width = 16
ws2.freeze_panes = "A2"

# --- Sheet 3: Epic Pass雪场 ---
ws3 = wb.create_sheet("Epic Pass雪场")
epic_resorts = [r for r in resorts if "Epic" in r[3]]
epic_resorts.sort(key=lambda x: -x[4])

for col, header in enumerate(headers, 1):
    cell = ws3.cell(row=1, column=col, value=header)
    cell.font = header_font
    cell.fill = PatternFill(start_color="1565C0", end_color="1565C0", fill_type="solid")
    cell.alignment = header_align
    cell.border = thin_border

for idx, (name_en, name_cn, location, pass_type, area) in enumerate(epic_resorts, 1):
    row = idx + 1
    area_hectares = round(area * 0.4047, 1) if area > 0 else 0
    ws3.cell(row=row, column=1, value=idx).alignment = center_align
    ws3.cell(row=row, column=2, value=name_en).alignment = data_align
    ws3.cell(row=row, column=3, value=name_cn).alignment = data_align
    ws3.cell(row=row, column=4, value=location).alignment = data_align
    ws3.cell(row=row, column=5, value=pass_type).alignment = center_align
    ws3.cell(row=row, column=6, value=area if area > 0 else "无数据").alignment = center_align
    ws3.cell(row=row, column=7, value=area_hectares if area > 0 else "无数据").alignment = center_align
    for col in range(1, 8):
        ws3.cell(row=row, column=col).font = data_font
        ws3.cell(row=row, column=col).border = thin_border

ws3.column_dimensions["A"].width = 6
ws3.column_dimensions["B"].width = 38
ws3.column_dimensions["C"].width = 22
ws3.column_dimensions["D"].width = 28
ws3.column_dimensions["E"].width = 18
ws3.column_dimensions["F"].width = 16
ws3.column_dimensions["G"].width = 16
ws3.freeze_panes = "A2"

# --- Sheet 4: 不支持任一Pass的Top 50 ---
ws4 = wb.create_sheet("不支持Pass的Top50")
no_pass_resorts = [r for r in resorts if r[3] == "无"]
no_pass_resorts.sort(key=lambda x: -x[4])
no_pass_top50 = no_pass_resorts[:50]

for col, header in enumerate(headers, 1):
    cell = ws4.cell(row=1, column=col, value=header)
    cell.font = header_font
    cell.fill = PatternFill(start_color="C62828", end_color="C62828", fill_type="solid")
    cell.alignment = header_align
    cell.border = thin_border

for idx, (name_en, name_cn, location, pass_type, area) in enumerate(no_pass_top50, 1):
    row = idx + 1
    area_hectares = round(area * 0.4047, 1) if area > 0 else 0
    ws4.cell(row=row, column=1, value=idx).alignment = center_align
    ws4.cell(row=row, column=2, value=name_en).alignment = data_align
    ws4.cell(row=row, column=3, value=name_cn).alignment = data_align
    ws4.cell(row=row, column=4, value=location).alignment = data_align
    ws4.cell(row=row, column=5, value=pass_type).alignment = center_align
    ws4.cell(row=row, column=6, value=area if area > 0 else "无数据").alignment = center_align
    ws4.cell(row=row, column=7, value=area_hectares if area > 0 else "无数据").alignment = center_align
    for col in range(1, 8):
        ws4.cell(row=row, column=col).font = data_font
        ws4.cell(row=row, column=col).border = thin_border

ws4.column_dimensions["A"].width = 6
ws4.column_dimensions["B"].width = 38
ws4.column_dimensions["C"].width = 22
ws4.column_dimensions["D"].width = 28
ws4.column_dimensions["E"].width = 18
ws4.column_dimensions["F"].width = 16
ws4.column_dimensions["G"].width = 16
ws4.freeze_panes = "A2"

# --- Sheet 5: 中国Top30雪场 ---
ws5 = wb.create_sheet("中国Top30雪场")
china_resorts = [r for r in resorts if "中国" in r[2]]
china_resorts.sort(key=lambda x: -x[4])
china_top30 = china_resorts[:30]

for col, header in enumerate(headers, 1):
    cell = ws5.cell(row=1, column=col, value=header)
    cell.font = header_font
    cell.fill = PatternFill(start_color="D84315", end_color="D84315", fill_type="solid")
    cell.alignment = header_align
    cell.border = thin_border

for idx, (name_en, name_cn, location, pass_type, area) in enumerate(china_top30, 1):
    row = idx + 1
    area_hectares = round(area * 0.4047, 1) if area > 0 else 0
    ws5.cell(row=row, column=1, value=idx).alignment = center_align
    ws5.cell(row=row, column=2, value=name_en).alignment = data_align
    ws5.cell(row=row, column=3, value=name_cn).alignment = data_align
    ws5.cell(row=row, column=4, value=location).alignment = data_align
    ws5.cell(row=row, column=5, value=pass_type).alignment = center_align
    ws5.cell(row=row, column=6, value=area if area > 0 else "无数据").alignment = center_align
    ws5.cell(row=row, column=7, value=area_hectares if area > 0 else "无数据").alignment = center_align
    for col in range(1, 8):
        ws5.cell(row=row, column=col).font = data_font
        ws5.cell(row=row, column=col).border = thin_border

ws5.column_dimensions["A"].width = 6
ws5.column_dimensions["B"].width = 38
ws5.column_dimensions["C"].width = 22
ws5.column_dimensions["D"].width = 28
ws5.column_dimensions["E"].width = 18
ws5.column_dimensions["F"].width = 16
ws5.column_dimensions["G"].width = 16
ws5.freeze_panes = "A2"

# --- Sheet 6: 说明 ---
ws6 = wb.create_sheet("数据说明")
notes = [
    ["全球滑雪场对比表 - 数据说明", ""],
    ["", ""],
    ["数据来源", "Ikon Pass官网、Epic Pass官网、snow-online.com、TheGlobalStatistics、中国滑雪产业白皮书等"],
    ["统计口径", "可滑面积(Skiable Area)以英亩(acres)为主要口径，公顷由英亩换算(1 acre ≈ 0.4047 hectares)"],
    ["排序规则", "按可滑面积从大到小排序，无面积数据的排在最后"],
    ["", ""],
    ["Sheet说明", ""],
    ["全部雪场(按面积排序)", "所有雪场合并去重后按面积排序的总表"],
    ["IKON Pass雪场", "2026/27雪季 Ikon Pass 支持的雪场(含Bonus Mountains)"],
    ["Epic Pass雪场", "2026/27雪季 Epic Pass 支持的雪场"],
    ["不支持Pass的Top50", "不包含在Ikon Pass和Epic Pass中的全球面积最大的50个雪场"],
    ["中国Top30雪场", "中国境内面积最大的30个滑雪场(含室内)"],
    ["", ""],
    ["颜色标识", ""],
    ["绿色", "Ikon Pass"],
    ["橙色", "Ikon Pass Bonus"],
    ["蓝色", "Epic Pass"],
    ["紫色", "同时支持Ikon + Epic"],
    ["红色", "不支持任何Pass"],
    ["", ""],
    ["注意事项", ""],
    ["1", "部分欧洲雪场官方统计口径为雪道长度(km)而非面积，面积数据为第三方换算，仅供参考"],
    ["2", "部分雪场面积数据未能从官方渠道获取，标注为'无数据'"],
    ["3", "中国部分雪场数据来源于《中国滑雪产业白皮书》，室内滑雪场面积单位为平方米"],
    ["4", "Ikon Pass 26/27新增: 斑尾山(日本)、北大湖(中国)、万科松花湖(中国)"],
    ["5", "Epic Pass覆盖90+雪场，本表整理了53个可查到详细信息的雪场"],
    ["6", "Ikon Pass覆盖77个主目的地+11个Bonus Mountains，共88个"],
]

for row_idx, (col1, col2) in enumerate(notes, 1):
    ws6.cell(row=row_idx, column=1, value=col1).font = Font(name="微软雅黑", size=10, bold=(row_idx == 1))
    ws6.cell(row=row_idx, column=2, value=col2).font = Font(name="微软雅黑", size=10)
    ws6.cell(row=row_idx, column=1).alignment = Alignment(vertical="top", wrap_text=True)
    ws6.cell(row=row_idx, column=2).alignment = Alignment(vertical="top", wrap_text=True)

ws6.column_dimensions["A"].width = 28
ws6.column_dimensions["B"].width = 80

# ============================================================
# 保存
# ============================================================
output_path = "/Users/victorjiang/Library/Application Support/TRAE SOLO CN/ModularData/ai-agent/work-mode-projects/6aa36b55dd09402787b43f26/全球滑雪场对比表_26-27雪季.xlsx"
wb.save(output_path)
print(f"Excel文件已保存: {output_path}")
print(f"总雪场数: {len(resorts)}")
print(f"IKON Pass雪场: {len(ikon_resorts)}")
print(f"Epic Pass雪场: {len(epic_resorts)}")
print(f"不支持Pass的Top50: {len(no_pass_top50)}")
print(f"中国Top30: {len(china_top30)}")
