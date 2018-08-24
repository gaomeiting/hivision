export function wxFnVer() {
	var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
	console.log(ua.match(/MicroMessenger/i) == "micromessenger", 1234)
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false
	}

}
export function lingxiFn() {
	var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
	return (/lingxi/i).test(ua);
}