export function timeFormat(time){
	if (!time) {return false;}
	var iHours = new Date(time).getHours(),
		iMins = new Date(time).getMinutes(),
		iSeconds = new Date(time).getSeconds(),
		iYears = new Date(time).getFullYear(),
		iMonths = new Date(time).getMonth(),
		iDays = new Date(time).getDate();
		return iYears + '-' + (iMonths < 9 ? '0' + (iMonths + 1) : iMonths + 1) + '-' + (iDays < 10 ? '0' + iDays : iDays) + ' ' + (iHours < 10 ? '0' + iHours : iHours) + ':' + (iMins < 10 ? '0' + iMins : iMins) + ':' + (iSeconds < 10 ? '0' + iSeconds : iSeconds); 
};

export function timeFormatOther(time,type){
	if (!time) {return false;}
	var iHours = new Date(time).getHours(),
		iMins = new Date(time).getMinutes(),
		iSeconds = new Date(time).getSeconds(),
		iYears = new Date(time).getFullYear(),
		iMonths = new Date(time).getMonth(),
		iDays = new Date(time).getDate();
		switch (type) {
			case 'DAY':
				return iYears + '-' + (iMonths < 9 ? '0' + (iMonths + 1) : iMonths + 1) + '-' + (iDays < 10 ? '0' + iDays : iDays) ; 
				break;
			case 'MONTH':
				return iYears + '-' + (iMonths < 9 ? '0' + (iMonths + 1) : iMonths + 1) ; 
			default:
				return iYears + '-' + (iMonths < 9 ? '0' + (iMonths + 1) : iMonths + 1) + '-' + (iDays < 10 ? '0' + iDays : iDays) + ' ' + (iHours < 10 ? '0' + iHours : iHours) + ':' + (iMins < 10 ? '0' + iMins : iMins) + ':' + (iSeconds < 10 ? '0' + iSeconds : iSeconds); 
				break;
		}
};

export function judgeType(start,end){
	if (start && end) {
		var distant = end - start;
		var step = '';
		if (0 <= distant && distant <= 1000 * 60 * 60) {
			step = 'MINUTE'
		} else if ( 1000 * 60 *60 < distant  && distant <= 1000 * 60 *60 * 24) {
			step = 'HOUR'
		} else if ( 1000 * 60 * 60 * 24 < distant  && distant <= 1000 * 60 *60 * 24 * 30) {
			step = 'DAY'
		} else if ( 1000 * 60 * 60 * 24 * 30 < distant ) {
			step = 'MONTH'
		}
		return step
	}
};

export function getAxis(start,end){
	var type = judgeType(start, end);
	var train = start;
	var arr = [];
	switch (type) {
		case 'MINUTE':
			while (train < end) {
				var time = timeFormat(train);
				arr.push(time);
				train = train + 1000 * 60;
			}
			break;
		case 'HOUR':
			while (train < end) {
				var time = timeFormat(train);
				arr.push(time);
				train = train + 1000 * 60 *60;
			}
			break;
		case 'DAY':
			while (train < end) {
				var time = timeFormatOther(train,'DAY');
				arr.push(time);
				train = train + 1000 * 60 * 60 * 24;
			}
			break;
		case 'MONTH':
			while (train < end) {
				var time = timeFormatOther(train,'MONTH');
				arr.push(time);
				train = train + 1000 * 60 * 60 * 24 * 30;
			}
			break;
		default:
			break;
	}
	return arr;
};

