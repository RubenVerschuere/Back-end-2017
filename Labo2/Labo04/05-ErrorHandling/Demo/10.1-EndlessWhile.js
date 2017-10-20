setInterval(function () {
	var teller = 0;
	console.log("Ik blokkeer andere setIntervals met een endless while(true).");
	while (true) {
		console.log(teller++);
	}
}, 1000);


setInterval(function () {
	console.log("Komt nooit aan de beurt");
}, 1000);

