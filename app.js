// GAME STATUS
let hasWin = false

// LOAD ICON PAGE
const loadPage = document.getElementById('load-page')

// CARDS
const allCardsContainer = document.getElementById('all-cards-container')
let cardsNr = null
let cards = []
let usedNr = []

for(let i = 0; i < cardsNr; ++i) {
    usedNr[i] = false
}

// LEVELS
const levelText = document.getElementById('level-text')
let levels = [

    {
        level: 1,
        countCards: 6,
        time: 15,
        button: document.getElementById('level-1'),
        solved: false
    },

    {
        level: 2,
        countCards: 8,
        time: 20,
        button: document.getElementById('level-2'),
        solved: false
    },

    {
        level: 3,
        countCards: 10,
        time: 25,
        button: document.getElementById('level-3'),
        solved: false
    },

    {
        level: 4,
        countCards: 12,
        time: 30,
        button: document.getElementById('level-4'),
        solved: false
    },

    {
        level: 5,
        countCards: 14,
        time: 35,
        button: document.getElementById('level-5'),
        solved: false
    },

    {
        level: 6,
        countCards: 16,
        time: 40,
        button: document.getElementById('level-6'),
        solved: false
    },

    {
        level: 7,
        countCards: 18,
        time: 45,
        button: document.getElementById('level-7'),
        solved: false
    },

    {
        level: 8,
        countCards: 20,
        time: 50,
        button: document.getElementById('level-8'),
        solved: false
    },

    {
        level: 9,
        countCards: 22,
        time: 55,
        button: document.getElementById('level-9'),
        solved: false
    },

    {
        level: 10,
        countCards: 24,
        time: 60,
        button: document.getElementById('level-10'),
        solved: false
    },

    {
        level: 11,
        countCards: 26,
        time: 65,
        button: document.getElementById('level-11'),
        solved: false
    },

    {
        level: 12,
        countCards: 28,
        time: 70,
        button: document.getElementById('level-12'),
        solved: false
    },

    {
        level: 13,
        countCards: 30,
        time: 75,
        button: document.getElementById('level-13'),
        solved: false
    },

    {
        level: 14,
        countCards: 32,
        time: 80,
        button: document.getElementById('level-14'),
        solved: false
    },

    {
        level: 15,
        countCards: 34,
        time: 85,
        button: document.getElementById('level-15'),
        solved: false
    }

]
let currentLevel = null

function getCurrentLevel() {
    let storedLevel = window.localStorage.getItem('level')
    console.log('stored level:', storedLevel)
    if(storedLevel) {
        currentLevel = storedLevel
    }
    else {
        currentLevel = 1
    }

    //JSON.stringify(localStorage.getItem('LevelsSolved'))
    // [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    const newSolvedLevels = JSON.parse(localStorage.getItem('LevelsSolved'))
    if(newSolvedLevels) {
        for(let i = 0; i < levels.length; ++i) {
            levels[i].solved = newSolvedLevels[i]
        }
    }
}

getCurrentLevel()
cardsNr = levels[currentLevel - 1].countCards

function displayLevel() {
    levelText.textContent = `Level: ${currentLevel}`
    
    if(!levels[currentLevel - 1].solved) {
        const currentLevelButton = levels[currentLevel - 1].button
        currentLevelButton.style.backgroundColor = '#333'
        currentLevelButton.style.border = '3px solid #fff'
        currentLevelButton.style.color = '#fff'
    }

    for(let i = 0; i < levels.length; ++i) {
        const currentBtn = levels[i].button
        if(levels[i].solved) {
            currentBtn.style.backgroundColor = '#333'
            currentBtn.style.border = '3px solid green'
            currentBtn.style.color = '#fff'
        }
        else if(levels[i].level == localStorage.getItem('level')) {
            currentBtn.style.backgroundColor = '#333'
            currentBtn.style.border = '3px solid #fff'
            currentBtn.style.color = '#fff'
        }
    }
}

displayLevel()

function saveSolvedLevels() {
    let solvedLevels = []
    for(let i = 0; i < levels.length; ++i) {
        solvedLevels[i] = levels[i].solved
    }
    console.log(solvedLevels);

    if(solvedLevels) 
        window.localStorage.setItem('LevelsSolved', JSON.stringify(solvedLevels))
}

// TIME
const timeText = document.getElementById('time-text')
let time = levels[currentLevel - 1].time
timeText.textContent = `${time}s`
let timeInterval = null
let firstTimePressed = true
let canPress = true

// FOOD ICONS 
const mainIcon = './img/diet.png'
const foodIcons = [
    
    {
        src: './img/bacon.png',
        alt: 'Bacon'
    },

    {
        src: './img/burger.png',
        alt: 'Burger'
    },

    {
        src: './img/chocolate.png',
        alt: 'Chocolate'
    },

    {
        src: './img/ice-cream.png',
        alt: 'Ice Cream'
    },

    {
        src: './img/muffin.png',
        alt: 'Muffin'
    },

    {
        src: './img/pancake.png',
        alt: 'Pancake'
    },

    {
        src: './img/pizza-slice.png',
        alt: 'Pizza'
    },

    {
        src: './img/popcorn.png',
        alt: 'Popcorn'
    },

    {
        src: './img/doughnut.png',
        alt: 'Doughnut'
    },

    {
        src: './img/fish-and-chips.png',
        alt: 'Fish n\' Chips'
    },

    {
        src: './img/onion-ring.png',
        alt: 'Onion Ring'
    },

    {
        src: './img/nachos.png',
        alt: 'Nachos'
    },

    {
        src: './img/pudding.png',
        alt: 'Pudding'
    },

    {
        src: './img/skewers.png',
        alt: 'Skewers'
    },

    {
        src: './img/can.png',
        alt: 'Can'
    },

    {
        src: './img/chicken-leg.png',
        alt: 'Chicken Leg'
    },

    {
        src: './img/ice-coffee.png',
        alt: 'Ice Coffe'
    },

]

let imagesDisplay = ``
for(let i = 0; i < foodIcons.length; ++i) {
    console.log('image added:', foodIcons[i].src);
    imagesDisplay += `
        <img src="${foodIcons[i].src}">
    ` 
}
loadPage.innerHTML = imagesDisplay
console.log(loadPage.innerHTML);

// MENU
const menuIcon = document.getElementById('menu-icon')
const menuFrame = document.getElementById('menu')
const menuExitBtn = document.getElementById('exit-menu-button')

menuIcon.addEventListener('click', () => {
    if(timeInterval)
        clearInterval(timeInterval)
    setTimeout(() => {
        menuFrame.style.top = '0'
        menuFrame.style.marginRight = '0'
    }, 100)
})

menuExitBtn.addEventListener('click', () => {
    setTimeout(() => {
        menuFrame.style.marginRight = '200vw'
    }, 100)

    if(firstTimePressed == false) {
        timeInterval = setInterval(() => {
            time -= 1
            timeText.textContent = `${time}s`
            timeText.className = 'change-animation'
            setTimeout(() => {
                timeText.className = ''
            }, 100)

            if(!checkIfWin() && time === 0) {
                clearInterval(timeInterval)
                resultContainer.innerHTML = `<h3> YOU LOST! </h3>`
                resultContainer.className = 'intro-animation'
                manipulateCotainer.className = 'intro-animation'
                retryBtn.className = 'canPressButton'
                nextBtn.className = 'cannotPressButton'
                canPress = false
            }

            if(time === 0) {
                clearInterval(timeInterval)
            }
        }, 1000)
    }
})

// RESULT TEXT
const resultContainer = document.getElementById('result-text-container')

// MANIPULATE LEVELS
const manipulateCotainer = document.getElementById('manipulate-buttons')
const retryBtn = document.getElementById('retry-level')
const nextBtn = document.getElementById('next-level')

function reloadGame() {
    firstTimePressed = true
    canPress = true

    resultContainer.className = 'outro-animation'
    manipulateCotainer.className = 'outro-animation'

    time = levels[currentLevel - 1].time
    timeText.textContent = `${time}s`
    timeText.className = 'change-animation'
    setTimeout(() => {
        timeText.className = ''
    }, 100)

    cardsNr = levels[currentLevel - 1].countCards
    cards = []
    usedNr = []

    for(let i = 0; i < cardsNr; ++i) {
        usedNr[i] = false
    }

    displayCards(cardsNr)
    displayLevel()
    saveSolvedLevels()
}

// LEVEL BUTTONS FUNCTIONALITY
console.log(levels)
levels.map((levelItem) => {
    levelItem.button.addEventListener('click', () => {
        if(levelItem.solved || levelItem.level == localStorage.getItem('level')) {
            console.log('reloaded a new level')
            currentLevel = levelItem.level
            reloadGame()
            setTimeout(() => {
                menuFrame.style.marginRight = '200vw'
            }, 100)
        }
    })
})
// 

retryBtn.addEventListener('click', () => {
    if(hasWin) {
        let passLevel = parseInt(currentLevel) + 1
        if(passLevel > window.localStorage.getItem('level'))
            window.localStorage.setItem('level', passLevel)
        hasWin = false
    }

    reloadGame()
    
})

nextBtn.addEventListener('click', () => {
    if(hasWin) {
        hasWin = false
        ++currentLevel
        if(currentLevel > window.localStorage.getItem('level'))
            window.localStorage.setItem('level', currentLevel)

        reloadGame()
    }
})

function checkIfWin() {
    for(let i = 0; i < cards.length; ++i) {
        if(!cards[i].found) {
            return false
        }
    }
    return true
}

function checkClickedCards(cardId) {
    for(let i = 0; i < cards.length; ++i) {
        if(i !== cardId) {
            if(cards[i].clicked && cards[i].icon === cards[cardId].icon) {
                cards[i].found = true
                cards[cardId].found = true
                break
            }
            else if(cards[i].clicked && cards[i].icon !== cards[cardId].icon && !cards[i].found) {
                cards[i].clicked = false
                cards[cardId].clicked = false

                const currentCard = document.getElementById(`card-${i}`)
                const mainCard = document.getElementById(`card-${cardId}`)

                setTimeout(() => {
                    currentCard.className = 'card-container hide-card-animation'
                    mainCard.className = 'card-container hide-card-animation'

                    setTimeout(() => {
                        currentCard.innerHTML = `<img src="${mainIcon}" alt="Food"></img>`
                        currentCard.style.backgroundColor = '#fff'
                    }, 150)

                    setTimeout(() => {
                        mainCard.innerHTML = `<img src="${mainIcon}" alt="Food"></img>`
                        mainCard.style.backgroundColor = '#fff'
                    }, 150)
                }, 600)

                break
            }
        }
    }

    if(checkIfWin()) {
        levels[currentLevel - 1].solved = true
        resultContainer.innerHTML = `<h3> YOU WIN! </h3>`
        resultContainer.className = 'intro-animation'
        manipulateCotainer.className = 'intro-animation'
        retryBtn.className = 'canPressButton'
        nextBtn.className = 'canPressButton'
        hasWin = true
        clearInterval(timeInterval)
    }
}

function displayCards(nrCards) {
    let cardsInnerHtml = ``
    for(let i = 0; i < nrCards; ++i) {
        cardsInnerHtml += `
            <div class="card-container" id='card-${i}'>
                <img src="${mainIcon}" alt="Food">
            </div>
        `
    }

    allCardsContainer.innerHTML = cardsInnerHtml

    for(let i = 0; i < nrCards / 2; ++i) {
        const iconSrc = foodIcons[i].src
        const iconAlt = foodIcons[i].alt

        const loadCards = new Promise((resolve, reject) => {
            let randNr1 = Math.floor(Math.random() * nrCards)
            while(true) {
                // console.log('first while')
                if(!usedNr[randNr1]) {
                    // console.log('first number found')
                    usedNr[randNr1] = true
                    break
                }
                randNr1 = Math.floor(Math.random() * nrCards)
            }

            let randNr2 = Math.floor(Math.random() * nrCards)
            while(true) {
                // console.log('second while')
                if(!usedNr[randNr2]) {
                    // console.log('second number found')
                    usedNr[randNr2] = true
                    break
                }
                randNr2 = Math.floor(Math.random() * nrCards)
            }

            resolve({nr1: randNr1, nr2: randNr2})
        })

        loadCards
            .then((data) => {
                // console.log(data.nr1, data.nr2)

                cards[data.nr1] = {
                    id: data.nr1,
                    icon: iconSrc,
                    clicked: false,
                    found: false
                }
                cards[data.nr2] = {
                    id: data.nr2,
                    icon: iconSrc,
                    clicked: false,
                    found: false
                }

                const cardContainer1 = document.getElementById(`card-${data.nr1}`)
                const cardContainer2 = document.getElementById(`card-${data.nr2}`)
                // console.log(usedNr)

                if(cardContainer1) {
                    cardContainer1.addEventListener('click', () => {
                        if(firstTimePressed) {
                            firstTimePressed = false
                            timeInterval = setInterval(() => {
                                time -= 1
                                timeText.textContent = `${time}s`
                                timeText.className = 'change-animation'
                                setTimeout(() => {
                                    timeText.className = ''
                                }, 100)

                                if(!checkIfWin() && time === 0) {
                                    clearInterval(timeInterval)
                                    resultContainer.innerHTML = `<h3> YOU LOST! </h3>`
                                    resultContainer.className = 'intro-animation'
                                    manipulateCotainer.className = 'intro-animation'
                                    retryBtn.className = 'canPressButton'
                                    nextBtn.className = 'cannotPressButton'
                                    canPress = false
                                }

                                if(time === 0) {
                                    clearInterval(timeInterval)
                                }
                            }, 1000)
                        }

                        if(!cards[data.nr1].found && canPress) {
                            if(cards[data.nr1].clicked) {
                                cards[data.nr1].clicked = false
                                cardContainer1.className = 'card-container hide-card-animation'
                                setTimeout(() => {
                                    cardContainer1.innerHTML = `<img src="${mainIcon}" alt="Food"></img>`
                                    cardContainer1.style.backgroundColor = '#fff'
                                }, 150)
                            }
                            else {
                                cards[data.nr1].clicked = true
                                cardContainer1.className = 'card-container reveal-card-animation'
                                setTimeout(() => {
                                    cardContainer1.innerHTML = `<img src="${iconSrc}" alt="${iconAlt}"></img>`
                                    cardContainer1.style.backgroundColor = '#333'
                                }, 150)
                                checkClickedCards(data.nr1)
                            }
                        }
                    })
                }
                
                if(cardContainer2) {
                    cardContainer2.addEventListener('click', () => {
                        if(firstTimePressed) {
                            firstTimePressed = false
                            timeInterval = setInterval(() => {
                                time -= 1
                                timeText.textContent = `${time}s`
                                timeText.className = 'change-animation'
                                setTimeout(() => {
                                    timeText.className = ''
                                }, 100)

                                if(!checkIfWin() && time === 0) {
                                    clearInterval(timeInterval)
                                    resultContainer.innerHTML = `<h3> YOU LOST! </h3>`
                                    resultContainer.className = 'intro-animation'
                                    manipulateCotainer.className = 'intro-animation'
                                    retryBtn.className = 'canPressButton'
                                    nextBtn.className = 'cannotPressButton'
                                    canPress = false
                                }

                                if(time === 0) {
                                    clearInterval(timeInterval)
                                }
                            }, 1000)
                        }

                        if(!cards[data.nr2].found && canPress) {
                            if(cards[data.nr2].clicked) {
                                cards[data.nr2].clicked = false
                                cardContainer2.className = 'card-container hide-card-animation'
                                setTimeout(() => {
                                    cardContainer2.innerHTML = `<img src="${mainIcon}" alt="Food"></img>`
                                    cardContainer2.style.backgroundColor = '#fff'
                                }, 150)
                            }
                            else {
                                cards[data.nr2].clicked = true
                                cardContainer2.className = 'card-container reveal-card-animation'
                                setTimeout(() => {
                                    cardContainer2.innerHTML = `<img src="${iconSrc}" alt="${iconAlt}"></img>`
                                    cardContainer2.style.backgroundColor = '#333'
                                }, 150)
                                checkClickedCards(data.nr2)
                            }
                        }
                    })
                }
            })
    }
}

displayCards(cardsNr)