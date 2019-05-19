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
// row 1: fullness 0
    [
        {
            //screen reader aria label
            description: 'Low in "Fullness", low in "Fun". Cactus looks dehydrated and thirsty.',
            //reflective of fullness
            size: 1,
            //reflective of fun
            emotion: 'sad',
            //reflective to overall condition
            color: 'neglected',
            //displaying written message to the DOM, increasing modality channel for communication with users
            message: 'Are you there? Cactus need some water & chatting!!!'
        },
        {
            description: 'Low in "Fullness", right amount in "Fun". Cactus looks happier, but need watering.',
            size: 1,
            emotion: 'smile',
            color: 'neutral',
            message: 'Cactus enjoys chatting with you, but it needs water.'
        },
        {
            description: 'Low in "Fullness", too much in "Fun". Cactus looks annoyed, it is thirsty.',
            size: 1,
            emotion: 'angry',
            color: 'annoyed',
            message: 'Cactus is thirsty. Stop babbling and give it some water!'
        },
    ],

// row 2: fullness 1
    [
        {
            description: 'Right amount in "Fullness", low in "Fun". Cactus looks healthier, but it wants to chat with someone.',
            size: 1.5,
            emotion: 'sad',
            color: 'neutral',
            message: 'Cactus feels hydrated, but is a little lonely.'
        },
        {
            description: 'Right amount in "Fullness", right amount in "Fun". Cactus is feeling good in every way! Maintain its "Fullness" and "Fun" level!',
            size: 1.5,
            emotion: 'smile',
            color: 'healthy',
            message: 'Cactus is feeling great in every way. It appreciates your care!!!'
        },
        {
            description: 'Right amount in "Fullness", too much in "Fun". Cactus is hydrated, but it looks annoyed.',
            size: 1.5,
            emotion: 'angry',
            color: 'neutral',
            message: 'Cactus feels hydrated, but it thinks you are talking too much.'
        },
    ],

// row 3: fullness 2
    [
        {
            description: 'Too much in "Fullness", low in "Fun". Cactus looks bloated. No more watering. It looks lonely though.',
            size: 2,
            emotion: 'sad',
            color: 'neglected',
            message: `Cactus doesn't need any more water, but it feels lonely.`
        },
        {
            description: 'Too much in "Fullness", right amount in "Fun". Cactus looks bloated, but content.',
            size: 2,
            emotion: 'smile',
            color: 'neutral',
            message: 'Cactus had too much water and enough chatting. Just leave it alone for a while.'
        },
        {
            description: 'Too much in "Fullness", too much in "Fun". Cactus looks bloated and annoyed',
            size: 2,
            emotion: 'angry',
            color: 'annoyed',
            message: 'Too much, just too much of everything. Cactus needs some alone time.'
        }
    ],
] // end of condition array

console.table(resultsArray);
console.log(resultsArray[0]);

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
    } else if (stat >= 10 ) {
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

        $('.message-display').html(`<p>${result.message}</p>`);
        // make change to cactus size
        $('#cactus-body').attr('class', `${result.color}`);
        // make change to cactus emotion
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

// let interval = setInterval(naturalDecay, 5000);

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

