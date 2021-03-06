(() => {


	const event = $('h2.title').text();
	const round = $('h2.subTitle').text().replace('Round ', '');
	const result = $('div.score').slice(0, 2).text().split('').reverse().join('')
					.replace(/(.)(.)/g, (str, w, b) => { return w + '-' + b }).replace(/½/g, '1/2');

	let names = [];
	let elos  = [];
	let moves = [];

	$('h2.name').slice(0,2).each(function() {
    	names.push($(this).text().replace(/ /g, ''));
	});

	$('span.elo').slice(0, 2).each(function() {
		elos.push($(this).text());
	});

	(() => {

		let pasteMove = true;
		let moveNum = 1;
		$('span.move').each(function() {
			if (pasteMove) {
				if (moveNum % 6 === 0){
					moves.push('\n' + moveNum.toString() + '.');
				}
				else {
					moves.push(moveNum.toString() + '.');
				}

				pasteMove = false;
				moveNum += 1;
			} else {
				pasteMove = true;
			}
    		moves.push($(this).text().trim());
		});
		moves = moves.join(' ');
	})();


	let pgn = `[Event "${event}"]\n[Round "${round}"]\n[Result "${result}"]\n[White "${names[1]}"]\n[Black "${names[0]}"]\n[WhiteElo "${elos[1]}"]\n[BlackElo "${elos[0]}"]\n\n${moves} ${result}`;

	(() => {
		let filename = names[1] + '-' + names[0] + '.pgn';
		let blob = new Blob([pgn], {type: 'text/plain'}),
	    	e    = document.createEvent('MouseEvents'),
	    	a    = document.createElement('a');

	    a.download = filename;
	    a.href = window.URL.createObjectURL(blob);
	    a.dataset.downloadurl =  ['text/plain', a.download, a.href].join(':');
	    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    a.dispatchEvent(e);
	})();
	
	// copy to clipboard
	(() => {
		const input = document.createElement('input');
		document.body.appendChild(input);
		input.value = pgn;
		input.select();
		document.execCommand('Copy');
		document.body.removeChild(input);
	})();

})();
