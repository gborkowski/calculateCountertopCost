const functions = require('firebase-functions');

const cors = require('cors')({origin: true});

exports.calculateCountertopCost = functions.https.onCall((data, context) => {

    const species=data.species;
    const width=data.width;
    const length=data.length;
    const thickness=data.thickness;
    const breadBoards=data.breadBoards;
    const minBoardWidth=data.minBoardWidth;
    const rustic=data.rustic;
    const addColor=data.addColor;
    const finish=data.finish;
 

    var labor=600.00;
    var cost=0;
    var ppbf=0;
    if(species === "walnut") {
      if(rustic === "false")
        ppbf=9;
      else
        ppbf=7;
    }
    if(species === "maple") {
      if(rustic === "false")
        ppbf=5.75;
      else
        ppbf=3.85;
    }
    if(species === "whiteOak") {
      if(rustic === "false")
        ppbf=8;
      else
        ppbf=4.5;
    }
    if(species === "redOak") {
      if(rustic === "false")
        ppbf=4;
      else
        ppbf=2.5;
    }
    if(species === "alder") {
      if(rustic === "false")
        ppbf=4;
      else
        ppbf=2.5;
    }
    if(species === "pine") {
      if(rustic === "false")
        ppbf=4.25;
      else
        ppbf=2.75;
    }
    if(species === "cherry") {
      if(rustic === "false")
        ppbf=6.5;
      else
        ppbf=3.75;
    }

    // calculate BF - simple - assume each 8' board is 12BF
    var counterWidth = parseInt(width);
    var numBoards = counterWidth/6 + 2;
    cost = numBoards * 12 * ppbf;

    // length
    var countertopLength = parseInt(length);
    if(countertopLength < 22) {
      cost = cost/2;
    }
    if(countertopLength < 46) {
      cost = cost/2;
    }
    if(countertopLength > 90 && countertopLength < 140) {
      cost += 500;
    }
    if(countertopLength > 140) {
      cost += 1000000;
    }

    // Min width
    var minWidth = parseInt(minBoardWidth);
    if(minWidth > 7)
    cost += 125;

    // Breadboards
    if(breadBoards === "true")
    labor += 250;

    // Custom Dye
    if(addColor === "true")
      labor += 100;

    // Finish
    if(finish.includes("varnish"))
      labor += 300;
    if(finish.includes("Monocoat"))
      labor += 200;
    if(finish.includes("odies"))
      labor += 150;
    if(finish.includes("shellac"))
      labor += 150;
    if(finish.includes("poly"))
      labor += 150;

    // summing and trimming
    var costFixed = Number(cost.toFixed(0));
    var laborFixed =  Number(labor.toFixed(0));


    return {
       cost: {costFixed, laborFixed}
    }
});
