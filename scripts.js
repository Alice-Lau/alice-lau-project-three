// ********************************************************************* //
//                            THE CACTUS object                          //
// ********************************************************************* //
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

// ********************************************************************* //
//                          CACTUS conditions array                      //
// ********************************************************************* //
const resultsArray = [
// row 1: fullness 0
    [
        {
            //screen reader aria label
            description: 'Low in "Fullness", low in "Fun". Cactus looks dehydrated and thirsty.',
            //reflective of fullness
            size: 'shrunken',
            //reflective of fun
            emotion: 'A sad emotion.',
            emotionImg: 'assets/emotion-sad.svg',
            //reflective to overall condition
            color: 'neglected',
            //displaying written message to the DOM, increasing modality channel for communication with users
            message: 'Are you there? Cactus need some water & chatting!!!'
            //path d for emotion
        },
        {
            description: 'Low in "Fullness", right amount in "Fun". Cactus looks happier, but need watering.',
            size: 'shrunken',
            emotion: 'A smiling emotion.',
            emotionImg: 'assets/emotion-smile.svg',
            color: 'neutral',
            message: 'Cactus enjoys chatting with you, but it needs water.'
        },
        {
            description: 'Low in "Fullness", too much in "Fun". Cactus looks annoyed, it is thirsty.',
            size: 'shrunken',
            emotion: 'An annoyed emotion.',
            emotionImg: 'assets/emotion-annoyed.svg',
            color: 'annoyed',
            message: 'Cactus is thirsty. Stop babbling and give it some water!'
        },
    ],

// row 2: fullness 1
    [
        {
            description: 'Right amount in "Fullness", low in "Fun". Cactus looks healthier, but it wants to chat with someone.',
            size: 'healthy-size',
            emotion: 'A sad emotion',
            emotionImg: 'assets/emotion-sad.svg',
            color: 'neutral',
            message: 'Cactus feels hydrated, but is a little lonely.'
        },
        {
            description: 'Right amount in "Fullness", right amount in "Fun". Cactus is feeling good in every way! Maintain its "Fullness" and "Fun" level!',
            size: 'healthy-size',
            emotion: 'A laughing emotion.',
            emotionImg: 'assets/emotion-superb.svg',
            color: 'healthy',
            message: 'Cactus is feeling great in every way. It appreciates your care!!!'
        },
        {
            description: 'Right amount in "Fullness", too much in "Fun". Cactus is hydrated, but it looks annoyed.',
            size: 'healthy-size',
            emotion: 'An annoyed emotion',
            emotionImg: 'assets/emotion-annoyed.svg',
            color: 'neutral',
            message: 'Cactus feels hydrated, but it thinks you are talking too much.'
        },
    ],

// row 3: fullness 2
    [
        {
            description: 'Too much in "Fullness", low in "Fun". Cactus looks bloated. No more watering. It looks lonely though.',
            size: 'bloated',
            emotion: 'A sad emotion.',
            emotionImg: 'assets/emotion-sad.svg',
            color: 'neglected',
            message: `Cactus doesn't need any more water, but it feels lonely.`
        },
        {
            description: 'Too much in "Fullness", right amount in "Fun". Cactus looks bloated, but content.',
            size: 'bloated',
            emotion: 'A smiling emotion.',
            emotionImg: 'assets/emotion-smile.svg',
            color: 'neutral',
            message: 'Cactus had too much water and enough chatting. Just leave it alone for a while.'
        },
        {
            description: 'Too much in "Fullness", too much in "Fun". Cactus looks bloated and annoyed',
            size: 'bloated',
            emotion: 'An annoyed emotion.',
            emotionImg: 'assets/emotion-annoyed.svg',
            color: 'annoyed',
            message: 'Too much, just too much of everything. Cactus needs some alone time.'
        }
    ],
] // end of condition array

// ********************************************************************* //
//                       jQuery cache for DOM element                    //
// ********************************************************************* //
const $startScreen = $('#start-screen');
const $startEsc = $('#escape-start-screen');

const $fullness = $('.current-fullness');
const $fun = $('.current-fun');

const $msgBoard = $('.message-display');

const $cactus = $('#cactus-img');
const $cactusBody = $('#cactus-body');
const $cactusEmotion = $('.cactus-emotion');

const $waterButtonDesktop = $('#water-desktop');
const $talkButtonDesktop = $('#talk-desktop');
const $waterButtonMobile = $('#water-mobile');
const $talkButtonMobile = $('#talk-mobile');

const cactusApp = {};

// pasting currentStat on DOM
cactusApp.updateStat = function () {
    $fullness.text(cactus.fullness + ' / 30');
    $fun.text(cactus.fun + ' / 30');
}
// cactusApp.updateStat();

// defining button interaction function: when each button is being clicked, then stats are altered
cactusApp.interactWithCactus = (buttonAction) => {
    $msgBoard.empty();
    const statReplenish = Math.ceil(Math.random() * 6);
    const statDecay = Math.ceil(Math.random() * 4);

    if (buttonAction === 'eat') {
        cactus.eat(statReplenish, statDecay);
    } else if (buttonAction === 'talk') {
        cactus.talk(statReplenish, statDecay);
    }
    cactusApp.updateStat();
    cactusApp.checkCondition();
}

// linking button interaction to an event listener, calling interacWithCactus function into action
$waterButtonDesktop.on('click', function () {
    cactusApp.interactWithCactus('eat');
})

$talkButtonDesktop.on('click', function () {
    cactusApp.interactWithCactus('talk');
})

//even with display: none, id cannot be shared. Thus repeated the same function for mobile button
$waterButtonMobile.on('click', function () {
    cactusApp.interactWithCactus('eat');
})

$talkButtonMobile.on('click', function () {
    cactusApp.interactWithCactus('talk');
})

// checking current Stat of Cactus obj
function getStatLevel(stat) {
    if (stat > 20) {
        return 2
    } else if (stat > 10 ) {
        return 1
    } else {
        return 0
    }
}

// checking and outputing feedback on DOM
cactusApp.checkCondition = () => {
    if ( cactus.fullness < 1 || cactus.fun < 1 || cactus.fullness > 29 || cactus.fun > 29) {
        cactusApp.gameOverAlert();
    } else {
        const fullnessLevel = getStatLevel(cactus.fullness);
        const funLevel = getStatLevel(cactus.fun);
        const result = resultsArray[fullnessLevel][funLevel];

        $msgBoard.html(`<p>${result.message}</p>`);
        $cactus.attr('class', `${result.size}`);
        $cactusBody.attr('class', `${result.color}`);
        $cactusEmotion.html(` <img src=${result.emotionImg} alt=${result.emotion}/> `);
    }
}

//setting a second influence: natural decay
cactusApp.naturalDecay = () => {
    if (cactus.fullness > 0 && cactus.fun > 0) {
        cactus.fullness = cactus.fullness - 1;
        cactus.fun = cactus.fun - 1;
        cactusApp.updateStat();  
        cactusApp.checkCondition();
    } else {
        cactusApp.gameOverAlert();
    }
};

// let interval = setInterval(naturalDecay, 5000);

cactusApp.gameOverAlert = function() {
        alert('killed it');
        clearInterval(interval);
}

//create result reset page, then when click on reset button, then call resetCactus function

cactusApp.resetCactus = () => {
    cactus.fullness = 10;
    cactus.fun = 10;
    updateStat();
    
    interval = setInterval(cactusApp.naturalDecay, 3000);
}

$('html').keyup(function(key) {
    if (key.keyCode === 27) $startEsc.click();
    if (key.keyCode === 70) $waterButtonDesktop.click();
    if (key.keyCode === 74) $talkButtonMobile.click();
})

cactusApp.init = () => {
    cactusApp.updateStat();
    interval = setInterval(cactusApp.naturalDecay, 5000);
}

// doc ready
$('document').ready(function() {

    $startEsc.on('click', function () {
        $startScreen.addClass('off-screen');
        cactusApp.init();        
        // $waterButton.removeAttr('disabled');
        // $talkButton.removeAttr('disabled');
    })

})

