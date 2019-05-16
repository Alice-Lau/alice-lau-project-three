const cactus = {
    fullness: 10,
    fun: 10,
    eat: function (food, bored) {
        this.fullness = this.fullness + food;
        this.fun = this.fun - bored;
    },
    talk: function (fun, tired) {
        this.fun = this.fun + fun;
        this.fullness = this.fullness - tired;
    }
}

const $fullness = $('.current-fullness');
const $fun = $('.current-fun');

const $msg = $('.message');
const $msgBoard1 = $('.message2');
const $msgBoard2 = $('.message1');

// pasting currentStat on DOM
const updateStat = function () {
    $fullness.text(cactus.fullness);
    $fun.text(cactus.fun);
}

// when food button is click
$('#water').on('click', function () {
    $msg.empty();
    const food = Math.ceil(Math.random() * 5);
    const bored = Math.ceil(Math.random() * 3);
    cactus.eat(food, bored);
    updateStat();
    checkCactusStat();
})

$('#talk').on('click', function () {
    $msg.empty();
    const fun = Math.ceil(Math.random() * 5);
    const tired = Math.ceil(Math.random() * 3);
    cactus.talk(fun, tired);
    updateStat();
    checkCactusStat();
})

const naturalDecay = setInterval(function() {
    if (cactus.fullness > 0 && cactus.fun > 0) {
        cactus.fullness = cactus.fullness - 1;
        cactus.fun = cactus.fun - 1;
        updateStat();
    } else {
        gameOverAlert();
    }
}, 1000);

const gameOverAlert = function() {
    if (cactus.fullness < 1 || cactus.fun < 1) {
        alert('killed it');
        clearInterval(naturalDecay);
        // reset stat
        cactus.fullness = 10;
        cactus.fun = 10;
        updateStat();
    }
}

// checking current Stat of Cactus obj
const checkCactusStat = function () {
    if (cactus.fullness >= 15) {
        $msgBoard1.append('cactus is growing.');
    } else if (cactus.fullness < 6) {
        $msgBoard2.append('cactus is dying from hunger.');
    }

    if (cactus.fun >= 15) {
        $msgBoard1.append('cactus enjoys listening to you babbling.');
    } else if (cactus.fun < 6) {
        $msgBoard2.append('cactus is dying from boredom.');
    }

    if (cactus.fullness < 1 || cactus.fun < 1) {
        alert('killed it');
        // reset stat
        cactus.fullness = 10;
        cactus.fun = 10;
        updateStat();
    }
}

// when food button is click
$('#water').on('click', function() {
    $msg.empty();
    const food = Math.ceil(Math.random() * 3);
    const bored = Math.ceil(Math.random() * 3);
    cactus.eat(food, bored);
    updateStat();
    checkCactusStat();
})

$('#talk').on('click', function () {
    $msg.empty();
    const fun = Math.ceil(Math.random() * 3);
    const tired = Math.ceil(Math.random() * 3);
    cactus.talk(fun, tired);
    updateStat();
    checkCactusStat();
})

// doc ready
$('document').ready(function() {
    updateStat();
    naturalDecay();
})

