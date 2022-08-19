const dayjs = require('dayjs')

var now = dayjs().format('YYYY-MM-DD')

console.log(now)

function timesize(beginDate, endDate) {
    if (beginDate != '' && endDate != '') {
        var aDate, oDate1, oDate2, iDays;
        if (beginDate.length == 8) {
            beginDate = beginDate.substr(0, 4) + '-' + beginDate.substr(4, 2) + '-' + beginDate.substr(6, 2);
        }
        if (endDate.length == 8) {
            endDate = endDate.substr(0, 4) + '-' + endDate.substr(4, 2) + '-' + endDate.substr(6, 2);
        }
        aDate = beginDate.split("-");
        oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]); //转换为12/13/2008格式
        aDate = endDate.split("-");
        oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
        var i = (oDate1 - oDate2) / 1000 / 60 / 60 / 24;

        iDays = i; //把相差的毫秒数转换为天数
        return iDays;
    } else {
        return 0;
    }
}

console.log('d', timesize(now, '2022.10.3'))
// console.log('d', timesize(now, '2022.11.8'))