(function() {
 var normal = window.normal = {
    2016:{
        "MAY":{14:1,21:1,28:1},
        "JUNE":{4:1,12:30},
        "JULY":{1:31},
        "AUGUST":{1:31},
        "SEPTEMBER":{1:30},
        "OCTOBER":{1:10}
    }
 }
 var peak = window.peak = {
     2016:{
        "APRIL":{29:1,30:1},
        "MAY":{1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1},
        "JUNE":{11:1,18:1,25:1},
        "JULY":{2:1,9:1,16:1,17:1,18:1,23:1,30:1},
        "AUGUST":{6:1,13:1,14:1,15:1,16:1,20:1,21:1,27:1},
        "SEPTEMBER":{3:1,10:1,17:1,18:1,19:1,22:1,23:1,24:1,25:1},
        "OCTOBER":{1:1,8:1,9:1,10:1}
     }
 };
 var MONTH = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
 var WEEK = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
 var T_LOW = 0; var T_NORMAL = 1; var T_PEAK = 2;
 var SEASON_TYPE = ["low","normal","peak"];
 
 var util = {
    getMonthEndDay: function(year,month){
        return (new Date(year,month,0)).getDate();
    }
 }
 var calFactory = window.calFactory = {
    init:   function(){
        dt = new Date();
    },
    genAllYear: function(id,year) {
        dt = new Date(year,0,1);
        var strArr = [];
        for (var i=0; i<12; ++i) {
            dt.setDate(1);
            dt.setMonth(i);
            strArr[strArr.length] = this._genOneMonth(dt);
        }
        $(id).replaceWith(strArr.join(''));    
    },
    gen3MonthCal: function(id) {
        dt = new Date();
        dt.setDate(1);
        var strArr = [this._genOneMonth(dt)];
        dt.setDate(1);
        dt.setMonth(dt.getMonth()+1);
        strArr[strArr.length] = this._genOneMonth(dt);
        dt.setDate(1);
        dt.setMonth(dt.getMonth()+1);
        strArr[strArr.length] = this._genOneMonth(dt);
        $(id).replaceWith(strArr.join(''));    
    },
    genCalLink: function(id,text) {
        var strPtn = [
            '<br><a href="./cal.htm#',
            '" class="chkCal" target="_blank">' + text + ' - ',
            '</a>'];
        var strArr = [];        
        var nowYear = (new Date()).getFullYear();
        for (key in peak) {
            if (key < nowYear) continue;
            strArr[strArr.length] = strPtn[0];
            strArr[strArr.length] = key;
            strArr[strArr.length] = strPtn[1];
            strArr[strArr.length] = key;
            strArr[strArr.length] = strPtn[2];
        }
        $(id).replaceWith(strArr.join(''));
    },
    _genOneMonth: function(dt){
        var strArr = ['<table class="cal"><tr><th colspan="7">'];
        strArr[strArr.length] = MONTH[dt.getMonth()];
        strArr[strArr.length] = '</th></tr><tr><td class="weekend">Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td class="weekend">Sat</td></tr><tr>';
        for (var i=0;i<dt.getDay();++i)
            strArr[strArr.length] = '<td></td>';
        var endDate = util.getMonthEndDay(dt.getFullYear(),dt.getMonth()+1);
        var r = 0;
        for (var i = dt.getDay();i<100;++i) {
            if ( i % 7 === 0 && i != 0) {
                strArr[strArr.length] = '</tr><tr>';
                ++r;
            }
            strArr[strArr.length] = '<td class=';

            strArr[strArr.length] = SEASON_TYPE[this._getSeasonType(dt)];
            strArr[strArr.length] = '>';
            strArr[strArr.length] = dt.getDate();
            strArr[strArr.length] = '</td>';
            if (dt.getDate() == endDate) break;
            dt.setDate(dt.getDate()+1);
        }
        var rest = 6 - dt.getDay();
        if (rest > 0) {
            strArr[strArr.length] = '<td colspan="';
            strArr[strArr.length] = rest;
            strArr[strArr.length] = '"></td>';
        }
        strArr[strArr.length] = "</tr>";
        for (;r<5;++r)
            strArr[strArr.length] = '<tr><td colspan="7">&nbsp;</td></tr>';
        strArr[strArr.length] = '</table>';
        return strArr.join('');
    },
    _getSeasonType(dt){
        var normalTable = normal[dt.getFullYear()][MONTH[dt.getMonth()]];
        var peakTable = peak[dt.getFullYear()][MONTH[dt.getMonth()]];
        var day = dt.getDate();
        if (peakTable && this._testHit(peakTable,day)) return T_PEAK;
        if (normalTable && this._testHit(normalTable,day)) return T_NORMAL; 
        return T_LOW;
    },
    _testHit(table,day) {
            for (var key in table) {
                if (day == key) return true;
                if (key < day && day <=table[key])
                    return true;
            }
            return false;
    }
 }
 
 })();
