//Initialize board

var mines = []
var table = document.getElementById("grid");
var board = []

function mkboard(x,y){
	//9x 9 grid	
	for (i = 0; i < y; i++) {
		var row = table.insertRow(i);
		var brow =[];
		for (b = 0; b < x; b++) {
			var cell = row.insertCell(b);
			cell.innerHTML = '&#11035;'
			brow.push({cord: b.toString()+ i.toString(), 'x':b, 'y':i, 'neighbours': 0, 'revealed':0})
		}
		board.push(brow) 
	}  
	let tds = table.querySelectorAll('td');
	tds.forEach(function(td){
  		td.addEventListener('click', updateBoard);
	});

}

function set_mines(num){
	mines =[] //reset mines

	// give me 5 mines 
	for (b = 0; b < num; b++) {
			x = Math.floor(Math.random() * 9);
			y = Math.floor(Math.random() * 9);
			mines.push({'cord': x.toString() + y.toString(),  'x': x, 'y':y})
		} 
}

function updateBoard(evt){
  let x = evt.target.parentElement.rowIndex;
  let y = evt.target.cellIndex;
  recReveal(x,y)

}

function recReveal(x,y){

	if (isMine(x,y)){
		return ''
	}

	if (board[x][y].neighbours == 0){
		table.rows[x].cells[y].innerHTML = '';	
		if (board[x][y].revealed !=1){
			try {if( table.rows[x-1].cells[y+1].innerHTML != ''){ recReveal(x-1,y+1)}}  catch (e) {console.log()}
			try {if( table.rows[x].cells[y+1].innerHTML != ''){ recReveal(x,y+1)}}  catch (e) {console.log()}
			try {if( table.rows[x+1].cells[y+1].innerHTML != ''){ recReveal(x+1,y+1)}}  catch (e) {console.log()}
			try {if( table.rows[x-1].cells[y].innerHTML != ''){ recReveal(x-1,y)}}  catch (e) {console.log()}
			try {if( table.rows[x+1].cells[y].innerHTML != ''){ recReveal(x+1,y)}}  catch (e) {console.log()}
			try {if( table.rows[x-1].cells[y-1].innerHTML != ''){ recReveal(x-1,y-1)}}  catch (e) {console.log()}
			try {if( table.rows[x].cells[y-1].innerHTML != ''){ recReveal(x,y-1)}}  catch (e) {console.log()}
			try {if( table.rows[x+1].cells[y-1].innerHTML != ''){ recReveal(x+1,y-1)}}  catch (e) {console.log()}
			board[x][y].revealed = 1;
		}
	}
	else{
		
		table.rows[x].cells[y].innerHTML = board[x][y].neighbours;
	}
}

function isMine(x,y){
	for (m =0; m < mines.length; m++){
		obj = mines[m]
		if (obj.x ==x && obj.y == y){
			return true
		}
	}
	return false
}

function proc_board(){
	//update counts for board
	for (m =0; m < mines.length; m++){
		obj = mines[m]
		try {board[obj.x-1][obj.y+1].neighbours +=1} catch (e) {continue}
		try {board[obj.x][obj.y+1].neighbours +=1} catch (e) {continue}
		try {board[obj.x+1][obj.y+1].neighbours +=1} catch (e) {continue}
		try {board[obj.x-1][obj.y].neighbours +=1} catch (e) {continue}
		try {board[obj.x+1][obj.y].neighbours +=1} catch (e) {continue}
		try {board[obj.x-1][obj.y-1].neighbours +=1} catch (e) {continue}
		try {board[obj.x][obj.y-1].neighbours +=1} catch (e) {continue}
		try {board[obj.x+1][obj.y-1].neighbours +=1} catch (e) {continue}
	}
}



mkboard(9,9)
set_mines(5)
proc_board()
//rec_reveal('52')