
//var stampValues = [1, 2, 5, 16, 9, 10, 20, 200, 168, 100, 50, 88, 242, 297, 366, 87, 147, 152, 150, 155, 382, 225].sort((a,b) => b-a);
var stampValues = [1, 2, 5, 16, 9, 10, 20, 200, 168, 100, 50, 88, 242, 297, 366, 87, 147, 152, 150, 155, 225].sort((a,b) => b-a);

available = document.getElementById("available");
available.value = stampValues.join( "  " );

target = document.getElementById("target")

maxStamp = document.getElementById("maxStamp");
maxStamp.value = 5;

var bestcombo = {"value":10000000, "kontent":[]};

function getValues(stampcount) {
    if (stampcount <= 0) return [{"value":0, "kontent":[]}];

    let values = [];
    let prevOrder = getValues(stampcount-1);

    if (bestcombo["value"] === parseInt(target.value, 10)) return [];

    for (let stampValue in stampValues) {
        stomp = stampValues[stampValue];

        for (let prev in prevOrder) {
            let vPrev = prevOrder[prev];

            newKontent = vPrev["kontent"].slice();
            newKontent[newKontent.length] = stomp;
            let next = {"value":vPrev["value"] + stomp, "kontent":newKontent};

            if (next["value"] < bestcombo["value"] && next["value"] >= target.value) {
                bestcombo = next;
                if(bestcombo["value"] === target.value) return [];
            }

            if (next["value"] < bestcombo["value"]){
                values[next["value"]] = next;
            }
        }
    }
    return values;

}

function getPenceString(nin) {
    return (("00"+(nin % 100)).slice(-2));
}

function drawOutput() {
    bestcombo["kontent"].sort((a,b) => b-a);

    let table = document.createElement('table');
    let row = table.insertRow();
    for(let i in bestcombo["kontent"]) {
        let cell = row.insertCell();
        cell.textContent = "£" + (Math.floor(bestcombo["kontent"][i]/100)) + "." + getPenceString(bestcombo["kontent"][i]);
        cell.style = "width:90px";
    }

    let outDiv = document.getElementById("output");
    outDiv.innerHTML = "<b>Total: £" + (Math.floor(bestcombo["value"]/100)) + "." + getPenceString(bestcombo["value"]) + "</b><br/>";
    outDiv.appendChild(table);
}

function recalc() {
    stampValues = available.value.trim().split( /[^0-9]+/ ).map( (s) => parseInt( s, 10 ) ).sort((a,b) => b-a);

    bestcombo = {"value":10000000, "kontent":[]};
    getValues(parseInt(maxStamp.value, 10));
    drawOutput();
}
