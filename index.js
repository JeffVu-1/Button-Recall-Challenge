//game struct
var game = {
    GameStack: [],
    UserStack: [],
    started: false,
    round: 0,
    mouseClick: 0,
    buttonArray: document.querySelectorAll("button"),
    display: document.getElementById("gameDisplay"),
    buttonAudioOne   : new Audio("Audio/ButtonClick0.mp3"),
    buttonAudioTwo   : new Audio("Audio/ButtonClick1.mp3"),
    buttonAudioThree : new Audio("Audio/ButtonClick2.mp3"),
    buttonAudioFour  : new Audio("Audio/ButtonClick3.mp3")
}

//equals check
async function equals(a, b, num){
    for(let i = 0; i < num; i++){
        if(a[i] !== b[i]){
            game.display.textContent = "Wrong! You Lose!"
            await delay(1000);
            location.reload();
        }
    }
}

async function buttonAnimation(e){
    e.classList.add("clicked");
    await delay(100);

    switch(e.getAttribute("id")){
        case "b1":
            game.buttonAudioOne.playbackRate = 2;
            game.buttonAudioOne.play();
            break;
        case "b2":
            game.buttonAudioTwo.playbackRate = 2;
            game.buttonAudioTwo.play();
            break;
        case "b3":
            game.buttonAudioThree.playbackRate = 2;
            game.buttonAudioThree.play();
            break;
        case "b4":
            game.buttonAudioFour.playbackRate = 2;
            game.buttonAudioFour.play();
            break;
        default:
            break;
    }

    e.classList.remove("clicked");
}

async function buttonClicked(){
    game.mouseClick++;
    const currentButton = this.getAttribute("id");
    await buttonAnimation(this);

    switch(currentButton){
        case "b1":
            game.UserStack.push("b1");
            break;
        case "b2":
            game.UserStack.push("b2");
            break;
        case "b3":
            game.UserStack.push("b3");
            break;
        case "b4":
            game.UserStack.push("b4");
            break;
        default:
            break;
    }

    equals(game.UserStack, game.GameStack, game.mouseClick);

    if(game.mouseClick == game.round){
        await newRound();
    }
}

async function newRound(){
    game.display.textContent = `Round: ${(++game.round)}`;
    await delay(500);

    var randomNumber = Math.floor(Math.random() * 4);
    switch(randomNumber){
        case 0:
            game.GameStack.push("b1");
            break;
        case 1:
            game.GameStack.push("b2");
            break;
        case 2:
            game.GameStack.push("b3");
            break
        case 3:
            game.GameStack.push("b4");
            break;
        default:
            break;
    }

    game.buttonArray.forEach(e =>{ e.removeEventListener("click",buttonClicked);})

    console.log(game.GameStack.length);
    for(let i = 0; i < game.GameStack.length && game.GameStack.length !== 0; i++){
        const currentIteration = document.getElementById(game.GameStack[i]);
        await buttonAnimation(currentIteration);
        await delay(200);
    }

    game.UserStack.splice(0, game.UserStack.length);
    game.mouseClick = 0;

    game.buttonArray.forEach(e =>{ e.addEventListener("click",buttonClicked);})
}

//start game
document.addEventListener("keypress", function(e){
    if(e.key === " " && game.started === false){
        e.preventDefault(); 
        game.started = true; 
        newRound();
    }

    if(e.key === "r" && game.started === true){
        location.reload();
    }
})

//helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
