var mainTableWidth = 750;
var browserName = navigator.appName;

if (browserName == "Netscape") {
v  = ".top";
l  = ".left";
dS = "document.";
sD = "";
y  = "window.pageYOffset";
iW = "window.innerWidth";
iH = "window.innerHeight";
oW = -8;
}
else {
v  = ".pixelTop";
l  = ".pixelLeft";
dS = "";
sD = ".style";
y  = "document.body.scrollTop";
iW = "document.body.clientWidth";
iH = "document.body.clientHeight";
oW = 0;
}

var dhtml         = null; // Our layer
var isOver        = true;
var myTimer       = setTimeout("HideDHTML()",300);
var intCurrent    = -1;
var intNew        = -2;

var ns4 = (document.layers)? true:false
var ie4 = (document.all)? true:false

if ((ns4) || (ie4)) {
} else {
	PopUp = no_PopUp;
}

function no_PopUp() {
	return true;
}


function PopUp() {
	clearTimeout(myTimer);
	intNew = arguments[0]

	if ( intCurrent != intNew ) {
		intCurrent = intNew;
	
		// Load defaults to runtime.
		var m_frame     = self;
		var m_border    = "1";
		var m_fgcolor   = "BGCOLOR=\"#ffffff\"";
		var m_bgcolor   = "BGCOLOR=\"#f2963f\"";
		var m_height    = "HEIGHT=" + gHeight[intNew];
		var m_width     = "WIDTH=" + gWidth[intNew];
		var m_text      = DHTML_texts[intNew];
		var m_textfont  = "arial,helvetica,verdana";
		var m_textsize  = "1";
		var m_textcolor = "#000000";
	
		var layerhtml = "<TABLE " + m_width + " BORDER=0 CELLPADDING=" + m_border +
								" CELLSPACING=0 " + m_bgcolor + " " + m_height + "><TR><TD>" + 
								"<TABLE WIDTH=100% BORDER=0 CELLPADDING=2 CELLSPACING=0 " + m_fgcolor + 
								" " + m_height + "><TR><TD VALIGN=TOP><FONT FACE=\"" + m_textfont + "\"" +
								" COLOR=\"" + m_textcolor + "\" SIZE=\"" + m_textsize + "\">" + 
								m_text + "</FONT></TD></TR></TABLE></TD></TR></TABLE>";	
			
		if (ns4) { dhtml = m_frame.document.DHTLMenu; }
		if (ie4) { dhtml = m_frame.DHTLMenu.style; }
		
		SetPosition(intNew);
		dhtml.onmouseover = OverDHTML;
		dhtml.onmouseout = OutDHTML;
		OverDHTML();
		
	  if (ns4) {
		  var lyr = dhtml.document

		  lyr.write(layerhtml);
		  lyr.close();
		  dhtml.visibility = "show";
		}
		else if (ie4) {
			m_frame.document.all["DHTLMenu"].innerHTML = layerhtml;
			dhtml.visibility = "visible";
		}
		
		return true;
	}
}

function SetPosition(id) {
	var j = eval(iW);
	var posX = 0;
	var posY = 0;
	
	if (j <= mainTableWidth) { j = 2 }
	else { j = ((j - mainTableWidth) / 2) + oW; }
	
	if (j < 2 ) { j = 2; }
	posX = gposX[id] + j;
	
	
	var j1 = eval(iH);
	var j2 = eval(y);
	var j3 = j1 + j2;
	var j4 = gposY[id];
	var j5 = j1 + j2 - j4;
	var j6 = gHeight[id];
	var j7 = j4 - j2;
  var j8 = j4;
	
	if ((j5 < j6) && (j5 < j7)) { j8 = j4 - j6 - 30; }
	if (j8 < 0) { j8 = 0 }
	
	posY = j8;
	
	dhtml.left = posX
  dhtml.top = posY
}

function HideDHTML() {
	if (!isOver) { 
		intCurrent = -2;
		if (ns4) { dhtml.visibility = "hide" }
		else if (ie4) { dhtml.visibility = "hidden" }
	}
}

function OverDHTML() { 
	clearTimeout(myTimer); 
	isOver = true; 
}

function OutDHTML() { 
	clearTimeout(myTimer);
	isOver = false; 
	myTimer = setTimeout("HideDHTML()",300);
}