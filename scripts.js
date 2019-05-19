// cactus object
const cactus = {
    fullness: 10,
    fun: 10,
    eat: function (increase, decay) {
        this.fullness = this.fullness + increase;
        this.fun = this.fun - decay;
    },
    talk: function (increase, decay) {
        this.fun = this.fun + increase;
        this.fullness = this.fullness - decay;
    }
}

// jQuery cashe for DOM elements
const $fullness = $('.current-fullness');
const $fun = $('.current-fun');
const $msg = $('.msg-box');
const $msgBoard1 = $('.msg-box-1');
const $msgBoard2 = $('.msg-box-2');

// pasting currentStat on DOM
const updateStat = function () {
    $fullness.text(cactus.fullness);
    $fun.text(cactus.fun);
}

updateStat();

// different conditional outputs
const resultsArray = [
    // row 1
    [{
        description: 'lowFull-low-Fun',
        size: 1,
        colour: '$anti-social-yellow',
        emotion: 'sad',
        message: 'Are you there? Cactus need some water & chatting!!!'
    },
    {
        description: 'lowFull-rightFun',
        size: 1,
        colour: '$health-green',
        emotion: 'neutral',
        message: 'Cactus has enough chatting, but it needs water.'
    }, {
        description: 'lowFull-overFun',
        size: 1,
        colour: '$annoyed-red',
        emotion: 'sad',
        message: `Cactus don't want to chat no more. Just give it more water.`
    }],
    // row 2
    [{
        description: 'rightFull-lowFun',
        size: 2,
        colour: '$anti-social-yellow',
        emotion: 'neutral',
        message: 'Cactus has had enough water. Chat with it.'
    },
    {
        description: 'rightFull-rightFun',
        size: 2,
        colour: '$health-green',
        emotion: 'happy',
        message: 'Cactus has enough water and chatting.'
    }, {
        description: 'rightFull-overFun',
        size: 2,
        colour: '$annoyed-red',
        emotion: 'neutral',
        message: `Cactus has enough water, you just need to stop chatting.`
    }],
    // row 3
    [{
        description: 'overFull-lowFun',
        size: 3,
        colour: '$anti-social-yellow',
        emotion: 'sad',
        message: 'Stop watering. Cactus just want to chat.'
    },
    {
        description: 'overFull-rightFun',
        size: 3,
        colour: '$health-green',
        emotion: 'neutral',
        message: 'Cactus has chatted enough, just stop watering though.'
    }, {
        description: 'overFull-overFun',
        size: 3,
        colour: '$annoyed-red',
        emotion: 'sad',
        message: `Just leave Cactus alone for a little bit. Too much water, too much chatting.`
    }],
]

// defining button interaction function: when each button is being clicked, then stats are altered
const interactWithCactus = (buttonAction) => {
    $msg.empty();
    const statReplenish = Math.floor(Math.random() * 6);
    const statDecay = Math.floor(Math.random() * 4);

    if (buttonAction === 'eat') {
        cactus.eat(statReplenish, statDecay);
    } else if (buttonAction === 'talk') {
        cactus.talk(statReplenish, statDecay);
    }
    console.log(cactus.fullness, cactus.fun);
    updateStat();
    checkCondition();
}

// linking button interaction to an event listener, calling interacWithCactus function into action
$('#water').on('click', function () {
    interactWithCactus('eat');
})

$('#talk').on('click', function () {
    interactWithCactus('talk');
})

// checking current Stat of Cactus obj
function getStatLevel(stat) {
    if (stat >= 20) {
        return 2
    } else if (stat >= 15) {
        return 1
    } else {
        return 0
    }
}

// checking and outputing feedback on DOM
const checkCondition = () => {
    if ( cactus.fullness < 1 || cactus.fun < 1 || cactus.fullness > 29 || cactus.fun > 29) {
        gameOverAlert();
    } else {
        const fullnessLevel = getStatLevel(cactus.fullness);
        const funLevel = getStatLevel(cactus.fun);
        const result = resultsArray[fullnessLevel][funLevel];
        console.log(fullnessLevel, funLevel);
        console.log(result);
        // make change to cactus size
        // make change to cactus color
        // make change to cactus emotion
        // paste cactus feedback to messagebaord
    }
}

//setting a second influence: natural decay
const naturalDecay = () => {
    if (cactus.fullness > 0 && cactus.fun > 0) {
        // console.log(cactus.fullness, cactus.fun);
        cactus.fullness = cactus.fullness - 1;
        cactus.fun = cactus.fun - 1;
        updateStat();  
        checkCondition();
    } else {
        gameOverAlert();
    }
};

let interval = setInterval(naturalDecay, 3000);

const gameOverAlert = function() {
        alert('killed it');
        clearInterval(interval);
}

//create result reset page, then when click on reset button, then call resetCactus function

const resetCactus = () => {
    cactus.fullness = 10;
    cactus.fun = 10;
    updateStat();
    
    interval = setInterval(naturalDecay, 3000);
}

// const initiateCactus = () => {
//     // updateStat();
//     naturalDecay();
// }

// // doc ready
// $('document').ready(function() {
//     initiateCactus();
//     interval = setInterval(naturalDecay, 10000);
// })

