
var blackStonesIds = new Array(12);
var whiteStonesIds = new Array(12);

var positions = new Array(64);
var number = ["1", "2", "3", "4", "5", "6", "7", "8"];
var chars = ["a", "b", "c", "d", "e", "f", "g", "h"];
var x = 0;

var selectedItems = new Array();

var w = 0; // white stone player
var b = 0; // black stone player

// Positions Ids
for(let i = 0; i < chars.length; i ++){
    for(let j = 1; j <= 8; j ++){
        positions[x] = chars[i] + j;
        x++;
    }
    if (x == 64){
        break;
    }
}

// Stones Ids
for(let i = 0; i < 16; i ++){
    blackStonesIds[i] = "s" + (i + 1);
    whiteStonesIds[i] = "w" + (i + 1);
}

// start function   white b-c  black g-f
function startPosition() {
    for(let i = 0; i < 16; i ++){
        document.getElementById(positions[40 + i]).innerHTML = 
        "<div class=black-stones" + " id=" + blackStonesIds[i] + "></div>";

        document.getElementById(positions[8 + i]).innerHTML = 
        "<div class=white-stones" + " id=" + whiteStonesIds[i] + "></div>";
    }
}

// stone add function
function addStone(stoneId, targetPos) {
    if(stoneId[0] == 's') {
        document.getElementById(targetPos).innerHTML =
        "<div class=black-stones" + " id=" + stoneId + "></div>";
    }
    else {
        document.getElementById(targetPos).innerHTML =
        "<div class=white-stones" + " id=" + stoneId + "></div>";
    }
}

// joker add stone function
function addJokerStone(stoneId, targetPos) {
    const image = document.createElement("img");
    image.src = "resources/jokerStone.png";

    if(stoneId[0] == 's') {
        document.getElementById(targetPos).innerHTML =
        "<div class=black-stones" + " id=" + stoneId + "><div id=" + stoneId + "j ></div></div>";
        document.getElementById(stoneId).appendChild(image);
        document.getElementById(stoneId).style.display = "flex";
        document.getElementById(stoneId).style.alignItems = "center";
        document.getElementById(stoneId).style.justifyContent = "center";
    }
    else {
        document.getElementById(targetPos).innerHTML =
        "<div class=white-stones" + " id=" + stoneId + "><div id=" + stoneId + "j ></div></div>";
        document.getElementById(stoneId).appendChild(image);
        document.getElementById(stoneId).style.display = "flex";
        document.getElementById(stoneId).style.alignItems = "center";
        document.getElementById(stoneId).style.justifyContent = "center";
    }
}

// joker stones function
function jokerStone(stoneId) {
    let stonePos = document.getElementById(stoneId).parentElement.id;

    if(document.getElementById(stoneId).children.length == 0) {

        if(stoneId[0] == 's' && stonePos[0] == 'a') {
            addJokerStone(stoneId, stonePos);
        }
        else if(stoneId[0] == 'w' && stonePos[0] == 'h') {
            addJokerStone(stoneId, stonePos);
        }
    }
}

// jokerStoneMove control function forward
function jokerStnForwardControl(stoneId, firstStop, targetPos) {
    if(stoneId[0] == 'w') {
        for(let i = chars.indexOf(firstStop[0]) + 1; i <= chars.indexOf(targetPos[0]) ; i ++) {

            if(document.getElementById(chars[i] + firstStop[1]).children.length == 1) {
                return false;
            }
        }
    }
    else if(stoneId[0] == 's') {
        for(let i = chars.indexOf(firstStop[0]) - 1; i >= chars.indexOf(targetPos[0]) ; i --) {
            if(document.getElementById(chars[i] + firstStop[1]).children.length == 1) {
                return false;
            }
        }
    }
    return true;
}
/*
if(currentPosIndex(positions.indexOf(currentPos) + 32) && document.getElementById(positions[positions.indexOf(currentPos) + 24]).children.length != 0 &&
    document.getElementById(positions[positions.indexOf(currentPos) + 32]).children.length == 0) {
    w = 0;
}

*/
// jokerStoneMove control function forward
function jokerStnBackControl(stoneId, firstStop, targetPos) {
    if(stoneId[0] == 'w') {
        for(let i = chars.indexOf(firstStop[0]) - 1; i >= chars.indexOf(targetPos[0]) ; i --) {
            if(document.getElementById(chars[i] + firstStop[1]).children.length == 1) {
                return false;
            }
        }
    }
    else if(stoneId[0] == 's') {
        for(let i = chars.indexOf(firstStop[0]) + 1; i <= chars.indexOf(targetPos[0]) ; i ++) {
            if(document.getElementById(chars[i] + firstStop[1]).children.length == 1) {
                return false;
            }
        }
    }
    return true;
}

// jokerStoneMove control function left
function jokerStnLeftControl(stoneId, firstStop, targetPos) {
    if(stoneId[0] == 'w') {
        for(let i = number.indexOf(firstStop[1]) - 1; i >= number.indexOf(targetPos[1]) ; i --) {
            if(document.getElementById(firstStop[0] + number[i]).children.length == 1) {
                return false;
            }
        }
    }
    else if(stoneId[0] == 's') {
        for(let i = number.indexOf(firstStop[1]) - 1; i >= number.indexOf(targetPos[1]) ; i --) {
            if(document.getElementById(firstStop[0] + number[i]).children.length == 1) {
                return false;
            }
        }
    }
    return true;
}

// jokerStoneMove control function right
function jokerStnRightControl(stoneId, firstStop, targetPos) {
    if(stoneId[0] == 'w') {
        for(let i = number.indexOf(firstStop[1]) + 1; i <= number.indexOf(targetPos[1]) ; i ++) {
            if(document.getElementById(firstStop[0] + number[i]).children.length == 1) {
                return false;
            }
        }
    }
    else if(stoneId[0] == 's') {
        for(let i = number.indexOf(firstStop[1]) + 1; i <= number.indexOf(targetPos[1]) ; i ++) {
            if(document.getElementById(firstStop[0] + number[i]).children.length == 1) {
                return false;
            }
        }
    }
    return true;
}

// joker stones move function
function jokerStoneMove(stoneId, targetPos) {
    let stonePos = document.getElementById(stoneId).parentElement.id;
    let targetId = document.getElementById(targetPos).id;
    let index = null;
    let firstStop = null;
    let i = 1;

    // forward
    if((targetId[0] != stonePos[0]) && (targetId[1] == stonePos[1]) && ((stoneId[0] == 's') && (stonePos[0] > targetPos[0])) || ((stoneId[0] == 'w') && (stonePos[0] < targetPos[0]))) {
        // white stones
        if(stoneId[0] == 'w') {
            for(let i = chars.indexOf(stonePos[0]) + 1; i <= chars.indexOf(targetPos[0]); i ++) {
                
                if(document.getElementById(chars[i] + targetPos[1]).children.length == 0) {
                    //console.log("oynar " + document.getElementById(chars[i] + targetPos[1]).id);
                }
                else {
                    firstStop = document.getElementById(chars[i] + targetPos[1]).id;
                    index = chars.indexOf(firstStop[0]);
                    break;
                }
            }
            if(firstStop != null) {
                if(document.getElementById(chars[index + 1] + firstStop[1]).children.length == 1) {
                    return false;
                }
                else if(document.getElementById(targetPos).children.length == 0 && jokerStnForwardControl('w', firstStop, targetPos) && document.getElementById(firstStop).children[0].id[0] != 'w'){
                    addDeletedStones(document.getElementById(firstStop).children[0].id);
                    deleteStonePos(firstStop);
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);  

                    // It is checked to see if there is a second stone that can be eaten
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 16 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 8)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    // 3. kontrol belirli satırın dışınıda saymaması içindir
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 2 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) - 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 1)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 2 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) + 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 1)];
                        i += 1; 
                    }

                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if(targetPos[1] == stonePos[1]) {
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);
                    return true;
                }
                else {
                    return false;
                }
            }
        }
        // black stones
        if(stoneId[0] == 's') {
            for(let i = chars.indexOf(stonePos[0]) - 1; i >= chars.indexOf(targetPos[0]); i --) {
                
                if(document.getElementById(chars[i] + targetPos[1]).children.length == 0) {
                   // console.log("oynar " + document.getElementById(chars[i] + targetPos[1]).id);
                }
                else {
                    firstStop = document.getElementById(chars[i] + targetPos[1]).id;
                    index = chars.indexOf(firstStop[0]);
                    break;
                }
            }
            if(firstStop != null) {
                if(document.getElementById(chars[index - 1] + firstStop[1]).children.length == 1) {
                    return false;
                }
                else if(document.getElementById(targetPos).children.length == 0 && jokerStnForwardControl('s', firstStop, targetPos) && document.getElementById(firstStop).children[0].id[0] != 's') {
                    addDeletedStones(document.getElementById(firstStop).children[0].id);
                    deleteStonePos(firstStop);
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);

                    // It is checked to see if there is a second stone that can be eaten
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 16 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 8)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 2 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) - 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 1)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 2 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) + 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 1)];
                        i += 1; 
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if(targetPos[1] == stonePos[1]) {
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    // back
    else if((targetId[0] != stonePos[0]) && (targetId[1] == stonePos[1])) {
        // white stones
        if(stoneId[0] == 'w') {
            for(let i = chars.indexOf(stonePos[0]) - 1; i >= chars.indexOf(targetPos[0]); i --) {

                if(document.getElementById(chars[i] + targetPos[1]).children.length == 0) {
                    // console.log("oynar " + document.getElementById(chars[i] + targetPos[1]).id);
                }
                else {
                    firstStop = document.getElementById(chars[i] + targetPos[1]).id;
                    index = chars.indexOf(firstStop[0]);
                    break;
                }
            }
            if(firstStop != null) {
                if(document.getElementById(chars[index - 1] + firstStop[1]).children.length == 1) {
                    return false;
                }
                else if(document.getElementById(targetPos).children.length == 0 && jokerStnBackControl('w', firstStop, targetPos) && document.getElementById(firstStop).children[0].id[0] != 'w'){
                    addDeletedStones(document.getElementById(firstStop).children[0].id);
                    deleteStonePos(firstStop);
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);

                    // It is checked to see if there is a second stone that can be eaten
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 16 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 8)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 2 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) - 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 1)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 2 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) + 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 1)];
                        i += 1; 
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if(targetPos[1] == stonePos[1]) {
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        // black stones
        if(stoneId[0] == 's') {
            for(let i = chars.indexOf(stonePos[0]) + 1; i <= chars.indexOf(targetPos[0]); i ++) {
                
                if(document.getElementById(chars[i] + targetPos[1]).children.length == 0) {
                   // console.log("oynar " + document.getElementById(chars[i] + targetPos[1]).id);
                }
                else {
                    firstStop = document.getElementById(chars[i] + targetPos[1]).id;
                    index = chars.indexOf(firstStop[0]);
                    break;
                }
            }
            if(firstStop != null) {
                if(document.getElementById(chars[index + 1] + firstStop[1]).children.length == 1) {
                    return false;
                }
                else if(document.getElementById(targetPos).children.length == 0 && jokerStnBackControl('s', firstStop, targetPos), document.getElementById(firstStop).children[0].id[0] != 's') {
                    addDeletedStones(document.getElementById(firstStop).children[0].id);
                    deleteStonePos(firstStop);
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);

                    // It is checked to see if there is a second stone that can be eaten
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 16 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 8)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 2 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) - 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 1)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 2 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) + 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 1)];
                        i += 1; 
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if(targetPos[1] == stonePos[1]) {
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
    // left side
    else if((targetId[0] == stonePos[0]) && (targetId[1] != stonePos[1]) && (targetPos[1] < stonePos[1])) {

        // black stones
        if(stoneId[0] == 's') {
            for(let i = number.indexOf(stonePos[1]) - 1; i >= number.indexOf(targetPos[1]); i --) {

                if(document.getElementById(stonePos[0] + number[i]).children.length == 0) {
                }
                else {
                    firstStop = document.getElementById(targetPos[0] + number[i]).id;
                    index = number.indexOf(firstStop[1]);
                    break;
                }
            }
            if(firstStop != null) {
                if(document.getElementById(firstStop[0] + number[index - 1]).children.length == 1 || document.getElementById(firstStop).children[0].id[0] == 's') {
                    return false;
                }
                else if(document.getElementById(targetPos).children.length == 0 && jokerStnLeftControl('s', firstStop, targetPos)) {
                    addDeletedStones(document.getElementById(firstStop).children[0].id);
                    deleteStonePos(firstStop);
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);

                    // It is checked to see if there is a second stone that can be eaten
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 2 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) - 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 1)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 16 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 8)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 16 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 8)];
                        i += 1; 
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if(targetPos[0] == stonePos[0]) {
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        // white stones
        if(stoneId[0] == 'w') {
            for(let i = number.indexOf(stonePos[1]) - 1; i >= number.indexOf(targetPos[1]); i --) {

                if(document.getElementById(stonePos[0] + number[i]).children.length == 0) {
                }
                else {
                    firstStop = document.getElementById(targetPos[0] + number[i]).id;
                    index = number.indexOf(firstStop[1]);
                    break;
                }
            }
            if(firstStop != null) {
                if(document.getElementById(firstStop[0] + number[index - 1]).children.length == 1 || document.getElementById(firstStop).children[0].id[0] == 'w') {
                    return false;
                }
                else if(document.getElementById(targetPos).children.length== 0 && jokerStnLeftControl('w', firstStop, targetPos)) {
                    addDeletedStones(document.getElementById(firstStop).children[0].id);
                    deleteStonePos(firstStop);
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);

                    // It is checked to see if there is a second stone that can be eaten
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 2 >= 0) ) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) - 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 1)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 16 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 8)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 16 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 8)];
                        i += 1; 
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if(targetPos[0] == stonePos[0]) {
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }

    // right side
    else if((targetId[0] == stonePos[0]) && (targetId[1] != stonePos[1]) && (targetPos[1] > stonePos[1])) {

        // black stones
        if(stoneId[0] == 's') {
            for(let i = number.indexOf(stonePos[1]) + 1; i <= number.indexOf(targetPos[1]); i ++) {

                if(document.getElementById(stonePos[0] + number[i]).children.length == 0) {
                }
                else {
                    firstStop = document.getElementById(targetPos[0] + number[i]).id;
                    index = number.indexOf(firstStop[1]);
                    break;
                }
            }
            if(firstStop != null) {
                if(document.getElementById(firstStop[0] + number[index + 1]).children.length == 1 || document.getElementById(firstStop).children[0].id[0] == 's') {
                    return false;
                }
                else if(document.getElementById(targetPos).children.length == 0 && jokerStnRightControl('s', firstStop, targetPos)) {
                    addDeletedStones(document.getElementById(firstStop).children[0].id);
                    deleteStonePos(firstStop);
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);

                    // It is checked to see if there is a second stone that can be eaten
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 2 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) + 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 1)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 16 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 8)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 16 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children[0].id[0] == 'w') {
                                b = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 8)];
                        i += 1; 
                    }
                    return true;
                }
                else {
                    console.log("oynamazz");
                }
            }
            else {
                if(targetPos[0] == stonePos[0]) {
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);
                    return true;
                }
                else {
                    return false;
                }
            }
        }

        // white stones
        if(stoneId[0] == 'w') {
            for(let i = number.indexOf(stonePos[1]) + 1; i <= number.indexOf(targetPos[1]); i ++) {
                
                if(document.getElementById(stonePos[0] + number[i]).children.length == 0) {
                }
                else {
                    firstStop = document.getElementById(targetPos[0] + number[i]).id;
                    index = number.indexOf(firstStop[1]);
                    break;
                }
            }
            if(firstStop != null) {
                if(document.getElementById(firstStop[0] + number[index + 1]).children.length == 1 || document.getElementById(firstStop).children[0].id[0] == 'w') {
                    return false;
                }
                else if(document.getElementById(targetPos).children.length == 0 && jokerStnRightControl('w', firstStop, targetPos)) {
                    addDeletedStones(document.getElementById(firstStop).children[0].id);
                    deleteStonePos(firstStop);
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);

                    // It is checked to see if there is a second stone that can be eaten
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 2 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length == 0 
                        && (document.getElementById(stoneId).parentElement.id[0] == document.getElementById(positions[positions.indexOf(targetPos) + 2]).id[0])) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 1]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 2]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 1)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) + 16 <= 64)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) + (i * 8)];
                        i += 1; 
                    }

                    i = 1;
                    targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id)];
                    while(currentPosIndex(positions.indexOf(targetPos)) && (positions.indexOf(targetPos) - 16 >= 0)) {
                        if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length == 0) {
                            if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children[0].id[0] == 's') {
                                w = 0;
                            }
                        }
                        // If there are two stones in a row, it cannot eat a stone.
                        else if(document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length != 0) {
                            break;
                        }
                        targetPos = positions[positions.indexOf(document.getElementById(stoneId).parentElement.id) - (i * 8)];
                        i += 1; 
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                if(targetPos[0] == stonePos[0]) {
                    deleteStone(stoneId);
                    addJokerStone(stoneId, targetPos);
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    }
}

// stone delete function
function deleteStone(stoneId) {
    let el = document.getElementById(stoneId);
    el.parentNode.removeChild(el);
}

// delete stone from positions function
function deleteStonePos(stonePos) {
    let el = document.getElementById(stonePos).children[0].id;
    let stone = document.getElementById(el);
    stone.remove();
}

// stone parent index in position Array
function findIndex(stoneId) {
    let posId =  document.getElementById(stoneId).parentElement.id;
    return positions.indexOf(posId);
}

// add deleted stone a table
function addDeletedStones(stoneId) {
    let w = 0;
    let s = 0;

    if(document.getElementsByClassName("white-stones").length <= 17 && stoneId[0] == 'w') {
        document.getElementById("white-stones-container").innerHTML +=
        "<div class=white-stones id=dw" + w + "></div>";
        w +=1;
    }
    if(document.getElementsByClassName("black-stones").length <= 17 && stoneId[0] == 's') {
        document.getElementById("black-stones-container").innerHTML +=
        "<div class=black-stones id=dw" + s + "></div>";
        s +=1;
    }
}

// olası null hatasını engellemek için yaratıldı
function currentPosIndex(str) {
    if(str > 64 || str < 0) {
        return false;
    }
    else {
        return true;
    }
}

// stone eat function
function eatStone(stoneId, currentPos, targetPos) {
    let posLenght = Math.abs(chars.indexOf(currentPos[0]) - chars.indexOf(targetPos[0]));
    let indexLenght = positions.indexOf(targetPos) - positions.indexOf(currentPos);
    let targetStone;
    let targetStoneColor;

    // forward white stones
    if(stoneId[0] == 'w' && (posLenght == 2 || posLenght == 0) && indexLenght == 16 && targetStone != 0) {
        targetStoneColor = document.getElementById(positions[positions.indexOf(currentPos) + 8]).children[0].id[0];
        targetStone = document.getElementById(positions[positions.indexOf(currentPos) + 8]).children.length;

        if(targetStoneColor != 'w') {
            addDeletedStones(document.getElementById(positions[positions.indexOf(currentPos) + 8]).children[0].id);
            
            if(document.getElementById(stoneId).children.length != 0) {
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) + 8]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addJokerStone(stoneId, targetPos);
            }
            else{
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) + 8]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addStone(stoneId, targetPos);
            }
            // It is checked to see if there is a second stone that can be eaten
            if(currentPosIndex(positions.indexOf(currentPos) + 32) && document.getElementById(positions[positions.indexOf(currentPos) + 24]).children.length != 0 &&
                document.getElementById(positions[positions.indexOf(currentPos) + 32]).children.length == 0) {
                w = 0;
            }
            return true;
        }
        else {
            return false;
        }
    }
    // forward black stones
    else if(stoneId[0] == 's' && (posLenght == 2 || posLenght == 0) && indexLenght == - 16 && targetStone != 0)   {
        targetStoneColor = document.getElementById(positions[positions.indexOf(currentPos) - 8]).children[0].id[0];
        targetStone = document.getElementById(positions[positions.indexOf(currentPos) - 8]).children.length;

        if(targetStoneColor != 's') {
            addDeletedStones(document.getElementById(positions[positions.indexOf(currentPos) - 8]).children[0].id);

            if(document.getElementById(stoneId).children.length == 1) {
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) - 8]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id); 
                addJokerStone(stoneId, targetPos);
            }
            else{
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) - 8]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addStone(stoneId, targetPos);
            }
            // It is checked to see if there is a second stone that can be eaten
            if(currentPosIndex(positions.indexOf(currentPos) - 32) && document.getElementById(positions[positions.indexOf(currentPos) - 24]).children.length != 0 &&
                document.getElementById(positions[positions.indexOf(currentPos) - 32]).children.length == 0) {
                b = 0;
            }
            return true;
        }
        else {
            return false;
        }
    }
    // left side black
    else if(stoneId[0] == 's' && (posLenght == 2 || posLenght == 0) && indexLenght == -2 && targetStone != 0) {
        targetStoneColor = document.getElementById(positions[positions.indexOf(currentPos) - 1]).children[0].id[0];
        targetStone = document.getElementById(positions[positions.indexOf(currentPos) - 1]).children.length;

        if(targetStoneColor != 's') {
            addDeletedStones(document.getElementById(positions[positions.indexOf(currentPos) - 1]).children[0].id);

            if(document.getElementById(stoneId).children.length == 1) {
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) - 1]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addJokerStone(stoneId, targetPos);
            }
            else{
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) - 1]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addStone(stoneId, targetPos);
            }
            // It is checked to see if there is a second stone that can be eaten
            if(currentPosIndex(positions.indexOf(currentPos) - 4) && document.getElementById(positions[positions.indexOf(currentPos) - 3]).children.length != 0 &&
                document.getElementById(positions[positions.indexOf(currentPos) - 4]).children.length == 0) {
                b = 0;
            }
            if(currentPosIndex(positions.indexOf(targetPos) - 16) && document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && 
                document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length == 0) {
                b = 0;
            }
            return true;
        }
        else {
            return false;
        }
    }
    // left side white
    else if(stoneId[0] == 'w' && (posLenght == 2 || posLenght == 0) && indexLenght == -2 && targetStone != 0) {
        targetStoneColor = document.getElementById(positions[positions.indexOf(currentPos) - 1]).children[0].id[0];
        targetStone = document.getElementById(positions[positions.indexOf(currentPos) - 1]).children.length;

        if(targetStoneColor != 'w') {
            addDeletedStones(document.getElementById(positions[positions.indexOf(currentPos) - 1]).children[0].id);

            if(document.getElementById(stoneId).children.length == 1) {
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) - 1]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addJokerStone(stoneId, targetPos);
            }
            else{
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) - 1]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addStone(stoneId, targetPos);
            }

            if(currentPosIndex(positions.indexOf(currentPos) - 4) && document.getElementById(positions[positions.indexOf(currentPos) - 3]).children.length != 0 &&
                document.getElementById(positions[positions.indexOf(currentPos) - 4]).children.length == 0) {
                w = 0;
            }
            if(currentPosIndex(positions.indexOf(targetPos) + 16) && document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && 
                document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length == 0) {
                w = 0;
            }
            return true;
        }
        else {
            return false;
        }
    }
    // right side black
    else if(stoneId[0] == 's' && (posLenght == 2 || posLenght == 0) && indexLenght == 2 && targetStone != 0) {
        targetStoneColor = document.getElementById(positions[positions.indexOf(currentPos) + 1]).children[0].id[0];
        targetStone = document.getElementById(positions[positions.indexOf(currentPos) + 1]).children.length;

        if(targetStoneColor != 's') {
            addDeletedStones(document.getElementById(positions[positions.indexOf(currentPos) + 1]).children[0].id);

            if(document.getElementById(stoneId).children.length == 1) {
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) + 1]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addJokerStone(stoneId, targetPos);
            }
            else{
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) + 1]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addStone(stoneId, targetPos);
            }

            if(currentPosIndex(positions.indexOf(currentPos) + 4) && document.getElementById(positions[positions.indexOf(currentPos) + 3]).children.length != 0 &&
                document.getElementById(positions[positions.indexOf(currentPos) + 4]).children.length == 0) {
                b = 0;
            }
            if(currentPosIndex(positions.indexOf(targetPos) - 16) && document.getElementById(positions[positions.indexOf(targetPos) - 8]).children.length != 0 && 
                document.getElementById(positions[positions.indexOf(targetPos) - 16]).children.length == 0) {
                b = 0;
            }
            return true;
        }
        else {
            return false;
        }
    }
    // right side white
    else if(stoneId[0] == 'w' && (posLenght == 2 || posLenght == 0) && indexLenght == 2 && targetStone != 0) {
        targetStoneColor = document.getElementById(positions[positions.indexOf(currentPos) + 1]).children[0].id[0];
        targetStone = document.getElementById(positions[positions.indexOf(currentPos) + 1]).children.length;

        if(targetStoneColor != 'w') {
            addDeletedStones(document.getElementById(positions[positions.indexOf(currentPos) + 1]).children[0].id);

            if(document.getElementById(stoneId).children.length == 1) {
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) + 1]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addJokerStone(stoneId, targetPos);
            }
            else{
                deleteStone(document.getElementById(positions[positions.indexOf(currentPos) + 1]).children[0].id);
                deleteStonePos(document.getElementById(positions[positions.indexOf(currentPos)]).id);
                addStone(stoneId, targetPos);
            }

            if(currentPosIndex(positions.indexOf(currentPos) + 4) && document.getElementById(positions[positions.indexOf(currentPos) + 3]).children.length != 0 &&
                document.getElementById(positions[positions.indexOf(currentPos) + 4]).children.length == 0) {
                w = 0;
            }
            if(currentPosIndex(positions.indexOf(targetPos) + 16) && document.getElementById(positions[positions.indexOf(targetPos) + 8]).children.length != 0 && 
                document.getElementById(positions[positions.indexOf(targetPos) + 16]).children.length == 0) {
                w = 0;
            }
            
            return true;
        }
        else {
            return false;
        }
    }
}

// stones move function
function stoneMove(stoneId, targetPos) {
    let sPI = findIndex(stoneId);  
    let parentStr = document.getElementById(stoneId).parentElement.id;
    let targetPosIndex = positions.indexOf(targetPos);

    if(stoneId[0] == 's' && parentStr[1] == 8 && (parentStr[0] == 'a' || parentStr[0] == 'b' || parentStr[0] == 'c' || parentStr[0] == 'd')) {

        if(targetPosIndex == sPI - 1 || targetPosIndex == sPI - 8) {
            if(document.getElementById(stoneId).children.length == 2) {
                deleteStone(stoneId);
                addJokerStone(stoneId, selectedItems[1]);
            }
            else {
                deleteStone(stoneId);
                addStone(stoneId, selectedItems[1]);
                jokerStone(stoneId);
            }
        }
        else if(document.getElementById(stoneId).children.length == 2) {
            jokerStoneMove(stoneId, selectedItems[1]);
        }
        else if(eatStone(stoneId, parentStr, selectedItems[1])) {
            addStone(stoneId, selectedItems[1]);
            jokerStone(stoneId);
        }
        else {
            window.alert("WRONG MOVE");
            b = 0;
        }
    }
    else if(stoneId[0] == 's' && parentStr[1] == 1 && (parentStr[0] == 'a' || parentStr[0] == 'b' || parentStr[0] == 'c' || parentStr[0] == 'd')) {

        if(targetPosIndex == sPI + 1 || targetPosIndex == sPI - 8) {
            if(document.getElementById(stoneId).children.length == 2) {
                deleteStone(stoneId);
                addJokerStone(stoneId, selectedItems[1]);
            }
            else {
                deleteStone(stoneId);
                addStone(stoneId, selectedItems[1]);
                jokerStone(stoneId);
            }
        }
        else if(document.getElementById(stoneId).children.length == 2) {
            jokerStoneMove(stoneId, selectedItems[1]);
        }    
        else if(eatStone(stoneId, parentStr, selectedItems[1])) {
            addStone(stoneId, selectedItems[1]);
            jokerStone(stoneId);
        }
        else {
            window.alert("WRONG MOVE");
            b = 0;
        }
    }
    else if(stoneId[0] == 's' && parentStr[1] == 8 && (parentStr[0] == 'e' || parentStr[0] == 'f' || parentStr[0] == 'g' || parentStr[0] == 'h')) {
        // tahtatın sağ köşesi taş başlangıç pozisyonlarına geçmeyi sağlayan kod parçası
        if(targetPosIndex == sPI - 1 || targetPosIndex == sPI - 8) {
            if(document.getElementById(stoneId).children.length == 2) {
                deleteStone(stoneId);
                addJokerStone(stoneId, selectedItems[1]);
            }
            else {
                deleteStone(stoneId);
                addStone(stoneId, selectedItems[1]);
                jokerStone(stoneId);
            }
        }
        else if(document.getElementById(stoneId).children.length == 2) {
            jokerStoneMove(stoneId, selectedItems[1]);
        }  
        else if(eatStone(stoneId, parentStr, selectedItems[1])) {
            addStone(stoneId, selectedItems[1]);
            jokerStone(stoneId);
        }  
        else {
            window.alert("WRONG MOVE");
            b = 0;
        }
    }
    else if(stoneId[0] == 'w' && parentStr[1] == 8 && (parentStr[0] == 'e' || parentStr[0] == 'f' || parentStr[0] == 'g' || parentStr[0] == 'h')) {
        // tahtatın sağ köşesi taş başlangıç pozisyonlarına geçmeyi sağlayan kod parçası
        if(targetPosIndex == sPI - 1 || targetPosIndex == sPI + 8) {
            if(document.getElementById(stoneId).children.length == 2) {
                deleteStone(stoneId);
                addJokerStone(stoneId, selectedItems[1]);
            }
            else {
                deleteStone(stoneId);
                addStone(stoneId, selectedItems[1]);
                jokerStone(stoneId);
            }
        }
        else if(document.getElementById(stoneId).children.length == 2) {
            jokerStoneMove(stoneId, selectedItems[1]);
        }  
        else if(eatStone(stoneId, parentStr, selectedItems[1])) {
            addStone(stoneId, selectedItems[1]);
            jokerStone(stoneId);
        }  
        else {
            window.alert("WRONG MOVE");
            w = 0;
        }
    }
    else if(stoneId[0] == 'w' && parentStr[1] == 1 && (parentStr[0] == 'e' || parentStr[0] == 'f' || parentStr[0] == 'g' || parentStr[0] == 'h')) {

        if(targetPosIndex == sPI + 1 || targetPosIndex == sPI + 8) {
            if(document.getElementById(stoneId).children.length == 2) {
                deleteStone(stoneId);
                addJokerStone(stoneId, selectedItems[1]);
            }
            else {
                deleteStone(stoneId);
                addStone(stoneId, selectedItems[1]);
                jokerStone(stoneId);
            }
        }
        else if(document.getElementById(stoneId).children.length == 2) {
            jokerStoneMove(stoneId, selectedItems[1]);
        }  
        else if(eatStone(stoneId, parentStr, selectedItems[1])) {
            addStone(stoneId, selectedItems[1]);
            jokerStone(stoneId);
        } 
        else {
            window.alert("WRONG MOVE");
            w = 0;
        }
    }
    else if(stoneId[0] == 'w') {

        if(targetPosIndex == sPI - 1 || targetPosIndex == sPI + 8 || targetPosIndex == sPI + 1) {
            if(document.getElementById(stoneId).children.length == 2) {
                deleteStone(stoneId);
                addJokerStone(stoneId, selectedItems[1]);
            }
            else {
                deleteStone(stoneId);
                addStone(stoneId, selectedItems[1]);
                jokerStone(stoneId);
            }
        }
        else if(document.getElementById(stoneId).children.length == 2) {
            jokerStoneMove(stoneId, selectedItems[1]);
        }  
        else if(eatStone(stoneId, parentStr, selectedItems[1])) {
            addStone(stoneId, selectedItems[1]);
            jokerStone(stoneId);
        }
        else {
            window.alert("WRONG MOVE");
            w = 0;
        }    
    }
    else if(stoneId[0] == 's') {

        if(targetPosIndex == sPI - 1 || targetPosIndex == sPI - 8 || targetPosIndex == sPI + 1) {
            if(document.getElementById(stoneId).children.length == 2) {
                deleteStone(stoneId);
                addJokerStone(stoneId, selectedItems[1]);
            }
            else {
                deleteStone(stoneId);
                addStone(stoneId, selectedItems[1]);
                jokerStone(stoneId);
            }
        }
        else if(document.getElementById(stoneId).children.length == 2) {
            jokerStoneMove(stoneId, selectedItems[1]);
        }  
        else if(eatStone(stoneId, parentStr, selectedItems[1])) {
            addStone(stoneId, selectedItems[1]);
            jokerStone(stoneId);
        }
        else {
            window.alert("WRONG MOVE");
            b = 0;
        }    
    }
}

function changeBorderColor(stoneId) {
    document.getElementById(stoneId).style.borderColor = "green";
}

function returnDeafultBorderColor(stoneId) {
    if(stoneId[0] == 's') {
        document.getElementById(stoneId).style.borderColor = "black";
    }
    else {
        document.getElementById(stoneId).style.borderColor = "white";
    }
}

// If the player eats one piece and can make another piece, he is entitled to play
function isCanPlayWhite(stn) {
    if(stn == 1) {
        return 1;
    }
    else {
        return 0;
    }
}

function isCanPlayBlack(stn) {
    if(stn == 1) {
        return 1;
    }
    else {
        return 0;
    }
}

// 1 taş seçili ve o taş değiştirilmek isteniyorsa üstüne bir kez daha basmak gerekir
function clicks() {
    let el = document.getElementById("table").children;
    let s = 0;

    for(let i = 0; i < el.length; i ++) {
        el[i].addEventListener("click", function(){

            if(el[i].children.length != 0) {

                if(el[i].children[0].id[0] == 'w' && w != 1) {
                    // stoneMove() fonksiyonun ilk parametresini selectedItems arrayinin ilk elemanı olarak atıyoruz
                    if(s == 0) {    
                        selectedItems[0] = el[i].children[0].id;
                        s += 1;
                        changeBorderColor(selectedItems[0]);
                        w += 1;
                        b = 0;
                    }
                    else if(el[i].children[0].id == selectedItems[0]) {
                    // aynı taş üst üste ikinci kez seçilirse selectedItems arrayı boşaltılır
                        returnDeafultBorderColor(selectedItems[0]);
                        s = 0;
                    }
                }

                if(el[i].children[0].id[0] == 's' && b != 1) {
                    // stoneMove() fonksiyonun ilk parametresini selectedItems arrayinin ilk elemanı olarak atıyoruz
                    if(s == 0) {    
                        selectedItems[0] = el[i].children[0].id;
                        s += 1;
                        changeBorderColor(selectedItems[0]);
                        b += 1;
                        w = 0;
                    }
                    else if(el[i].children[0].id == selectedItems[0]) {
                    // aynı taş üst üste ikinci kez seçilirse selectedItems arrayı boşaltılır
                        returnDeafultBorderColor(selectedItems[0]);
                        s = 0;
                    }
                }
            }
            else if(el[i].children.length == 0 && s == 1) {  
                // stoneMove() fonksiyonun ikinci parametresini selectedItems arrayinin ikinci elemanı olarak atıyoruz
                selectedItems[1] = el[i].id;
                returnDeafultBorderColor(selectedItems[0]);
                stoneMove(selectedItems[0], selectedItems[1]);
                s = 0;
            }
        });
    }
}



startPosition();
clicks();

