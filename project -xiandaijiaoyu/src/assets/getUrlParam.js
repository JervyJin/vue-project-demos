export function getUrlKey(key) {
	let name, value, str = location.href,
		num = str.indexOf("?"); //取得整个地址栏
	str = str.substr(num + 1); //取得所有参数 stringvar.substr(start [, length ]
	let arr = str.split("&"); //各个参数放到数组里
	window.console.log('1', arr)
	for (let i = 0; i < arr.length; i++) {
		num = arr[i].indexOf("=");
		if (num > 0) {
			name = arr[i].substring(0, num);
			value = arr[i].substr(num + 1);
			if (key == name) { return value; }
			else { return null; }//返回参数值
		//	this[name] = value;
		}
	}
}