export default function(num, type, language, level) {
	let time = 31;
	let baseCountTime = 100;
	let baseCountMoney = 500;
	let money = 0;
	let rate = 0;
	let discount = 0;
	let minMoney = 0;
	let maxMoney = 0;
	//不同类型每多一百字的价格
	let price = 0;
	if (null == num || num == 0) {
		[]
		alert("请输入要配音的字数！")
	}
	//优质主播,知名主播,顶级主播 level:1,2,3
	if (level == 1) {
		money = 10;
		price = 2;
	} else if (level == 2) {
		money = 25;
		price = 5;
	} else {
		money = 50;
		price = 10;
	}
	//稿件类型分为1,2,3,4对应普通类，颁奖类，品牌类，电购类
	if (type == 1) {
		rate = 0;
	} else if (type == 2) {
		rate = 0.2;
	} else if (type == 3) {
		rate = 0.2
	} else {
		rate = 0.3;
	}
	//语言分为普通话,外语,方言对应1,2,3
	if (language == 1) {
		discount = 0;
	} else if (type == 2) {
		discount = 0.2
	} else {
		discount = 0.3;
	}
	if (num <= 100) {
		minMoney = money * (1 - rate) * (1 - discount);
		maxMoney = money * (1 + rate) * (1 + discount);
		console.log(time, minMoney, maxMoney);
	} else if (num > 100 && num < 500) {
		let X = Math.ceil((num - baseCountTime) / 100);
		time = time + price * X;
		minMoney = money * (1 - rate) * (1 - discount);
		maxMoney = money * (1 + rate) * (1 + discount);
		console.log(time, minMoney, maxMoney);
	} else {
		//向上取整
		let X = Math.ceil((num - baseCountTime) / 100);
		time = time + 2 * X;
		let Y = Math.ceil((num - baseCountMoney) / 100);
		money = money + price * Y;
		minMoney = money * (1 - rate) * (1 - discount);
		maxMoney = money * (1 + rate) * (1 + discount);
		console.log(time, minMoney, maxMoney);
	}

	console.log(time, Math.ceil(minMoney), Math.ceil(maxMoney), "time,minMoney,maxMoney")
	return {
		time: time,
		minMoney: Math.ceil(minMoney),
		maxMoney: Math.ceil(maxMoney)
	}
}