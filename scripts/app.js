let score = JSON.parse(localStorage.getItem("score")) || {
    yalalt : 0,
    yalagdal : 0,
    tenttsen : 0,
};

//updateScoreElement();

document.querySelector('.js-haich-button').addEventListener("click", () => {
    playGame("haich");
});
document.querySelector('.js-chuluu-button').addEventListener("click", () => {
    playGame("chuluu");
});
document.querySelector('.js-daavuu-button').addEventListener("click", () => {
    playGame("daavuu");
});

// document.querySelector('.reset-score').addEventListener('click', () => resetToggle());

const random = () => {
    const randomNum = Math.random(); // 0,1
    let computerMove = "";
    if (randomNum >= 0 && randomNum < 1 / 3) {
        computerMove = "haich";
    } else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
        computerMove = "chuluu";
    } else if (randomNum >= 2 / 3 && randomNum < 1) {
        computerMove = "daavuu";
    }
    return computerMove;
};

// const resetToggle = () => {
//     document.querySelector('.result').innerHTML = "Үр дүн:";
//     document.querySelector('.js-moves').innerHTML = "Та болон компьютер";
// };


const playGame = (playUser) => {
    let result = "";
    let computer = random();
    if (playUser === "haich") {
        if (computer === "haich") {
            result = "Тэнцлээ";
        } else if (computer === "chuluu") {
            result = "Яллаа";
        } else if (computer === "daavuu") {
            result = "Та Ялагдлаа";
        }
    }
    if (playUser === "chuluu") {
        if (computer === "haich") {
            result = "Яллаа";
        } else if (computer === "chuluu") {
            result = "Тэнцлээ";
        } else if (computer === "daavuu") {
            result = "Та Ялагдлаа";
        }
    }

    if (playUser === "daavuu") {
        if (computer === "haich") {
            result = "Ялагдлаа";
        } else if (computer === "chuluu") {
            result = "Яллаа";
        } else if (computer === "daavuu") {
            result = "Тэнцлээ";
        }
    }

    if(result === "Яллаа"){
        score.yalalt += 1;
    } else if(result === "Та Ялагдлаа"){
        score.yalagdal += 1;
    }else if(result === "Тэнцлээ"){
        score.tenttsen += 1;
    }
    updateScoreElement();
    localStorage.setItem("score", JSON.stringify(score));
   
    
    document.querySelector('.result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `
    Та: <img src="images/${playUser}.png" class="move-icon">
    Компьютер: <img src="images/${computer}.png" class="move-icon">`;
};

const updateScoreElement = () => {
    document.querySelector(".js-score").innerHTML = `Ялалт : ${score.yalalt}, Ялагдал : ${score.yalagdal} Тэнцссэн : ${score.tenttsen}`
}

let isAutoPlaying = false;
let intervalId;
const autoPlay = () => {
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerMove = random();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}