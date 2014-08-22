// ==UserScript==
// @name        leo vocab csv
// @namespace   http://ravelite.org
// @description Export a page of leo vocab list in csv
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @include     *dict.leo.org/trainer/manageFolder.php*
// @version     1
// @grant       GM_log
// @grant       GM_setClipboard
// @downloadURL https://github.com/ravelite/leo2csv/raw/master/leo2csv.user.js
// ==/UserScript==

//var targetClient = 'jmem';
var targetClient = 'anki';

var D = document;
var newDoc = D.implementation.createHTMLDocument("");

function cleanContent( inStr ) {
    //remove conjugations and commas
    return inStr.replace(/\|.*\|/,"").replace(/\,/,"");
}

function doAction( aNode ) {
    var rowsDE = aNode.find("[lang=de]");
    var rowsEN = aNode.find("[lang=en]");
    
    var cCol = D.getElementById("centerColumn");
    var strOut = '';
    
    if ( targetClient == 'jmem' ) {
    //put in jMemorize first row
    strOut += '"Frontside","Flipside","Category"\n';
    }
        
    for (var i=0; i<rowsDE.length; i++)
    {
        var cDE = cleanContent( rowsDE[i].textContent );
        var cEN = cleanContent( rowsEN[i].textContent );
        
        var content = cDE + ", " + cEN + ","; //three needed for anki
        strOut += content + "\n";
    }
    
    if ( rowsDE.length>0 ) {
        GM_setClipboard( strOut );
        alert(rowsDE.length + ' words copied to clipboard!');
    }
}

waitForKeyElements( "tbody", doAction );
