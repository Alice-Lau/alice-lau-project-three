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
    },
    // need change to happen at set interval
    naturalDecay: function() {
        this.fullness = this.fullness - 1;
        this.fun = this.fun - 1;
    }
}

const $fullness = $('.current-fullness');
const $fun = $('.current-fun');

const $msg = $('.message');
const $msgBoard1 = $('.message2');
const $msgBoard2 = $('.message1');


// pasting currentStat on DOM
const updateStat = function() {
    $fullness.text(cactus.fullness);
    $fun.text(cactus.fun);
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

    if (cactus.fullness <= 0 || cactus.fun <= 0) {
        // some alert
        alert('You! You! How Dare You! You killed the cactus!!!!');
        // reset cactus stat
        cactus.fullness = 10;
        cactus.fun = 10;
        updateStat();
    }

    if (cactus.fullness > 0 || cactus.fun > 0) {
        // minus 1 point every 3 sec for each stat
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
})

