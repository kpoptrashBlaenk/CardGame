addEventListener("load", () => {

    //Shortcuts:
    //ctrl + shift + f1 -> comment in/out
    //ctrl + shift + - -> collapse
    //ctrl + shift + + -> expand

    //!!!!!!!BUGS!!!!!!!

    // Next: Mighty Leap

    //html elements
    const deckSpace = document.querySelectorAll("#deck td");
    const handSpace = document.getElementById("hand");
    const boardUnfiltered = document.querySelectorAll("#board td");
    const btnTurn = document.getElementById('turn')
    const damageCounter = document.getElementById('damage')
    const bonesCounter = document.getElementById('bones')
    const cardBack = 'Cards/CardBack.png'


    //parameters
    let damage = 0
    let bones = 0
    let turn = 0
    let enemyStartBoard = 1
    const winningPoints = 10
    let draw
    let selectedHand = false
    let sacrificing = []
    let sacrificingComplete = false
    const enemyLine = 1
    const playerLine = 2
    const playerPlaceLine = 3
    const boardHeight = 4
    const boardLength = 4
    const squirrelLength = 6
    const enemyDeckLength = 6
    const playerDeckLength = 8
    const allCards = [
        {
            name: 'Kingfisher',
            cost: {
                type: 'blood',
                cost: 1
            },
            attack: 1,
            health: 1,
            traits: [
                'Waterborne',
                'Airborne'
            ],
            path: 'Cards/Avian/Kingfisher.webp',
            element: ''
        },
        {
            name: 'Sparrow',
            cost: {
                type: 'blood',
                cost: 1
            },
            attack: 1,
            health: 2,
            traits: [
                'Airborne',
            ],
            path: 'Cards/Avian/Sparrow.webp',
            element: ''
        },
        {
            name: 'Raven',
            cost: {
                type: 'blood',
                cost: 2
            },
            attack: 2,
            health: 3,
            traits: [
                'Airborne'
            ],
            path: 'Cards/Avian/Raven.webp',
            element: ''
        },
        {
            name: 'Turkey Vulture',
            cost: {
                type: 'bones',
                cost: 8
            },
            attack: 3,
            health: 3,
            traits: [
                'Airborne'
            ],
            path: 'Cards/Avian/TurkeyVulture.webp',
            element: ''
        },
        {
            name: 'Stunted Wolf',
            cost: {
                type: 'blood',
                cost: 1
            },
            attack: 2,
            health: 2,
            traits: [],
            path: 'Cards/Canine/Stunted_Wolf.webp',
            element: ''
        },
        {
            name: 'Bloodhound',
            cost: {
                type: 'blood',
                cost: 2
            },
            attack: 2,
            health: 3,
            traits: [
                'Guardian'
            ],
            path: 'Cards/Canine/Bloodhound.webp',
            element: ''
        },
        {
            name: 'Caged Wolf',
            cost: {
                type: 'blood',
                cost: 2
            },
            attack: 0,
            health: 6,
            traits: [
                'Caged Wolf'
            ],
            path: 'Cards/Canine/CagedWolf.webp',
            element: ''
        },
        {
            name: 'Wolf',
            cost: {
                type: 'blood',
                cost: 2
            },
            attack: 3,
            health: 2,
            traits: [],
            path: 'Cards/Canine/Wolf.webp',
            element: ''
        },
        {
            name: 'Coyote',
            cost: {
                type: 'bones',
                cost: 4
            },
            attack: 2,
            health: 1,
            traits: [],
            path: 'Cards/Canine/Coyote.webp',
            element: ''
        },
        {
            name: 'Child 13',
            cost: {
                type: 'blood',
                cost: 1
            },
            attack: 0,
            health: 1,
            traits: [
                'Many Lives',
            ],
            path: 'Cards/Hooved/Child13.webp',
            element: ''
        },
        {
            name: 'Long Elk',
            cost: {
                type: 'bones',
                cost: 4
            },
            attack: 1,
            health: 2,
            traits: [
                'Sprinter',
                'Touch of Death'
            ],
            path: 'Cards/Hooved/Short_elk.webp',
            element: ''
        },
        {
            name: 'Elk',
            cost: {
                type: 'blood',
                cost: 2
            },
            attack: 2,
            health: 4,
            traits: [
                'Sprinter',
            ],
            path: 'Cards/Hooved/Elk.webp',
            element: ''
        },
        {
            name: 'Bee',
            cost: {
                type: 'none',
                cost: 0
            },
            attack: 1,
            health: 1,
            traits: [
                'Airborne',
            ],
            path: 'Cards/Insect/Bee.webp',
            element: ''
        },
        {
            name: 'Beehive',
            cost: {
                type: 'blood',
                cost: 1
            },
            attack: 0,
            health: 2,
            traits: [
                'Bees within',
            ],
            path: 'Cards/Insect/Beehive.webp',
            element: ''
        },
        {
            name: 'Cockroach',
            cost: {
                type: 'bones',
                cost: 4
            },
            attack: 1,
            health: 1,
            traits: [
                'Unkillable',
            ],
            path: 'Cards/Insect/Cockroach.webp',
            element: ''
        },
        {
            name: 'Geck',
            cost: {
                type: 'none',
                cost: 0
            },
            attack: 1,
            health: 1,
            traits: [],
            path: 'Cards/Reptile/Geck.webp',
            element: ''
        },
        {
            name: 'Ouroboros',
            cost: {
                type: 'blood',
                cost: 2
            },
            attack: 1,
            health: 1,
            traits: [
                'Unkillable',
            ],
            path: 'Cards/Reptile/Ouroboros.webp',
            element: ''
        },
        {
            name: 'Bullfrog',
            cost: {
                type: 'blood',
                cost: 1
            },
            attack: 1,
            health: 2,
            traits: [
                'Mighty Leap',
            ],
            path: 'Cards/Reptile/Bullfrog.webp',
            element: ''
        },
        {
            name: 'Adder',
            cost: {
                type: 'blood',
                cost: 2
            },
            attack: 1,
            health: 1,
            traits: [
                'Touch of Death',
            ],
            path: 'Cards/Reptile/Adder_emission.webp',
            element: ''
        },
        {
            name: 'River Snapper',
            cost: {
                type: 'blood',
                cost: 2
            },
            attack: 1,
            health: 6,
            traits: [],
            path: 'Cards/Reptile/RiverSnapper.webp',
            element: ''
        },
        {
            name: 'Rattler',
            cost: {
                type: 'bones',
                cost: 6
            },
            attack: 3,
            health: 1,
            traits: [],
            path: 'Cards/Reptile/Rattler.webp',
            element: ''
        },
    ]
    let squirrelDeck = [{
        name: 'Squirrel',
        cost: {
            type: 'none',
            cost: 0
        },
        attack: 0,
        health: 1,
        traits: [],
        path: 'Cards/Squirrel.webp',
        element: ''
    }]
    let currentDeck = []
    let enemyDeck = []
    let waterborne = []


    //turn
    btnTurn.addEventListener('click', () => {
        if (turn % 2 === 0) {
            pushBoard(boardHeight - 1, -1)
            boardFight(playerLine, enemyLine)
        } else {
            pushBoard(0, 1)
            if (enemyDeck.length > 0) {
                twoSpaces = false
                while (twoSpaces === false) {
                    newEnemyBoard(1)
                }
            }
            boardFight(enemyLine, playerLine)
        }
        turn++
        draw = true
    })


    //deck
    for (let i = 0; i < enemyDeckLength; i++) {
        const random = Math.floor(Math.random() * allCards.length)
        enemyDeck.push(allCards[random]);
    }
    for (let i = 0; i < squirrelLength - 1; i++) {
        squirrelDeck.push(squirrelDeck[i]);
    }
    for (let i = 0; i < playerDeckLength; i++) {
        let random = Math.floor(Math.random() * allCards.length)
        currentDeck.push(allCards[random])
    }
    for (let i = 0; i < deckSpace.length; i++) {
        deckSpace[i].addEventListener('click', () => {
            if (turn % 2 === 0) {
                if (draw === true) {
                    if (i === 0) {
                        deckDraw(squirrelDeck, i)
                    } else {
                        deckDraw(currentDeck, i)
                    }
                    console.log('Play a Card!')
                } else {
                    console.log('I already drew a card.')
                }
            } else {
                console.log("It's the enemies turn")
            }
        })
    }
    //hand
    let hand = [];
    for (let i = 0; i < 4; i++) {
        if (i === 0) {
            deckDraw(squirrelDeck, i)
        } else {
            deckDraw(currentDeck, i)
        }
    }
    draw = true
    console.log('Draw!')
    let selectedCard;
    handSpace.addEventListener('click', (event) => {
        if (draw !== true && turn % 2 === 0) {
            for (let i = 0; i < hand.length; i++) {
                if (hand[i].element === event.target.closest('td')) {
                    selectedCard = hand[i]

                    emptyArray(placeCardSpace)

                    switch (selectedCard.cost.type) {
                        case 'none':
                            createPlaceCardSpace()
                            selectedHand = !selectedHand
                            blackBorder(placeCardSpace)
                            break;

                        case 'blood':
                            createSacrificingCardSpace()
                            if (placeCardSpace.length >= selectedCard.cost.cost) {
                                blackBorder(placeCardSpace)
                                selectedHand = !selectedHand

                            } else {
                                selectedHand = false
                                removeBlackBordersAll()
                                console.log('Not enough')
                            }
                            break;

                        case 'bones':
                            if (bones >= selectedCard.cost.cost) {
                                createPlaceCardSpace()
                                selectedHand = !selectedHand
                                blackBorder(placeCardSpace)
                                break;
                            } else {
                                console.log('Not enough')
                            }
                            break;

                    }
                }
            }
        } else {
            console.log("You can't play a card yet!")
        }
    })

    //board
    let board = [...boardUnfiltered];
    board.splice(8, 1)
    let placeCardSpace = [];
    let boardSpaces = [];
    for (let j = 1; j <= boardLength; j++) {
        for (let i = (j - 1) * boardLength; i < boardLength * j; i++) {
            boardSpaces.push({
                element: board[i],
                line: j - 1,
                column: (i + boardLength) % boardLength,
                value: null,
            });
        }
    } //mapping board

    //enemy board
    let twoSpaces = false;
    while (twoSpaces === false) {
        newEnemyBoard(enemyStartBoard)
    }
    pushBoard(0, 1)
    twoSpaces = false
    while (twoSpaces === false) {
        newEnemyBoard(enemyStartBoard)
    }

    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener('click', () => {

            if (selectedHand === true) {
                if (selectedCard.cost.type === 'blood') {
                    if (sacrificing.length >= selectedCard.cost.cost - 1) {
                        if (sacrificingComplete === true) {
                            if (boardSpaces[i].line === playerPlaceLine && boardSpaces[i].value === null) {
                                placeCardFromHand(boardSpaces[i], selectedCard)
                                selectedHand = false
                                bones = bones + [...sacrificing].length
                                bonesCounter.innerText = 'Bones: ' + bones
                                emptyArray(sacrificing)
                                sacrificingComplete = false
                                removeBlackBordersAll()
                            }
                        } else {
                            if (boardSpaces[i].value !== null && !sacrificing.some(function (space) {
                                return space === boardSpaces[i]
                            })) {
                                sacrificing.push(boardSpaces[i])
                                for (let j = 0; j < placeCardSpace.length; j++) {
                                    if (placeCardSpace[j].element === board[i]) {
                                        for (let j = 0; j < sacrificing.length; j++) {
                                            if (!sacrificing[j].value.traits.includes('Many Lives')) {
                                                removeCardFromBoard(sacrificing[j])
                                            }
                                        }
                                    }
                                }
                                sacrificingComplete = true
                                createPlaceCardSpace()
                                removeBlackBordersAll()
                                blackBorder(placeCardSpace)
                            }
                        }
                    } else {
                        if (boardSpaces[i].value !== null && !sacrificing.some(function (space) {
                            return space === boardSpaces[i]
                        })) {
                            sacrificing.push(boardSpaces[i])
                            for (let j = 0; j < placeCardSpace.length; j++) {
                                if (placeCardSpace[j].element === board[i]) {
                                    placeCardSpace.splice(j, 1)
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    for (let j = 0; j < placeCardSpace.length; j++) {
                        if (placeCardSpace[j].element === board[i]) {
                            if (selectedCard.cost.type === 'bones') {
                                bones = bones - selectedCard.cost.cost
                                bonesCounter.innerText = "Bones: " + bones
                            }
                            placeCardFromHand(boardSpaces[i], selectedCard)
                            selectedHand = false
                            blackBorder(placeCardSpace)
                            break;
                        }
                    }
                }
            }

        })
    }


    //main functions
    function deckDraw(deck, i) {
        if (deck.length !== 0) {
            addCardToHand(deck[0])
            deck.shift();
            if (deck.length === 0) {
                const cardBack = deckSpace[i].querySelector('img')
                deckSpace[i].removeChild(cardBack)
            }
        }
        draw = false;
    }

    function placeCard(boardSpace, thisCard) {

        if (boardSpace.value === null) {
            const boardSymbol = boardSpace.element.querySelector('i');
            boardSpace.element.removeChild(boardSymbol)
        } else {
            const boardCard = boardSpace.element.querySelector('img')
            boardSpace.element.removeChild(boardCard)
        }

        addCardImage(thisCard.path, boardSpace.element, boardSpace.line)
        boardSpace.value = thisCard

    }

    function removeCardFromBoard(boardSpace) {

        removeCardImage(boardSpace)

        if (boardSpace.element.querySelector('div') !== null) {
            boardSpace.element.removeChild(boardSpace.element.querySelector('div'))
        }


        const symbol = document.createElement('i');
        if (boardSpace.line === 0 || boardSpace.line === boardHeight - 1) {
            symbol.classList.add('fa-solid', 'fa-arrow-up', 'scale-6');
        } else {
            symbol.classList.add('fa-solid', 'fa-paw', 'scale-6');
        }
        boardSpace.element.appendChild(symbol);
        boardSpace.value = null
    }

    function placeCardFromHand(boardSpace, thisCard) {

        placeCard(boardSpace, thisCard)

        blackBorder(placeCardSpace)

        hand.splice(hand.indexOf(thisCard), 1);
        handSpace.removeChild(thisCard.element)

        emptyArray(placeCardSpace)
        thisCard = null
    }

    function newEnemyBoard(repetition) {
        let enemyBoard = []
        for (let i = 0; i < boardLength; i++) {
            if (boardSpaces[i].value === null) {
                enemyBoard.push(boardSpaces[i])
            }
        }
        if (enemyBoard.length > repetition) {
            emptyArray(enemyBoard)
            for (let i = 0; i < repetition; i++) {
                let number = Math.floor(Math.random() * 4)
                if (boardSpaces[number].value === null) {
                    enemyBoard.push(boardSpaces[number])
                }
            }
            if (enemyBoard[0] !== enemyBoard[1]) {
                twoSpaces = true
                for (let i = 0; i < enemyBoard.length; i++) {
                    const currentSpace = enemyBoard[i]
                    if (currentSpace.value === null) {
                        const boardSymbol = currentSpace.element.querySelector('i')
                        currentSpace.element.removeChild(boardSymbol)
                    }

                    addCardImage(enemyDeck[0].path, currentSpace.element, enemyLine)
                    currentSpace.value = enemyDeck[0]

                    enemyDeck.shift()
                    twoSpaces = true
                }
            }
        } else {
            twoSpaces = true
        }
        emptyArray(enemyBoard)
    }

    function pushBoard(initialRow, nextRow) {
        for (let i = 0; i < boardSpaces.length; i++) {
            if (boardSpaces[i].line === initialRow && boardSpaces[i].value !== null) {
                let initialSpace = boardSpaces[i]
                let nextSpace = boardSpaces[i + boardLength * nextRow]
                if (nextSpace.value === null) {
                    placeCard(nextSpace, initialSpace.value)
                    removeCardFromBoard(initialSpace)
                }
            }
        }
    }

    function boardFight(attackerRow, defenderRow) {

        const promises = []
        let attackers = compareArrays(boardSpaces, attackerRow, 'line')
        let defenders = compareArrays(boardSpaces, defenderRow, 'line')

        for (let i = 0; i < attackers.length; i++) {

            let attacker = attackers[i]
            let defender = defenders[i]
            let damageMultiplier = 1
            if (turn % 2 === 1) {
                damageMultiplier = -1
            }

            promises.push(() => boardFightAttack(attacker, defender, defenders, damageMultiplier))
        }
        executeSequentially(promises).then(() => {
            if (attackers[0].line === playerLine) {

                btnTurn.innerText = 'End Turn'
                waterborneTurn(false, null, enemyLine)
                sprinterTurn(attackers[0].line)
            } else {
                btnTurn.innerText = 'Attack'
                console.log('Draw!')
                waterborneTurn(false, null, playerLine)
                sprinterTurn(attackers[0].line)
            }
            if (damage >= winningPoints || damage <= -winningPoints) {
                if (turn % 2 === 0) {
                    alert('Enemy reached ' + winningPoints + ' points. You lost')
                } else {
                    alert('You reached ' + winningPoints + ' points. You won') // No definite ending for debugging purposes
                }
            }
        })
    }

    function boardFightAttack(attacker, defender, defenders, damageMultiplier) {
        if (attacker.value !== null) {
            if (attacker.value.attack !== 0) {
                return new Promise(resolve => {
                    setTimeout(function () {
                        let attackerImage = attacker.element.children[0]

                        if (attacker.line === 1) {
                            attackerImage.classList.add('trans-top-100')
                            attackerImage.classList.remove('top-0')
                            attackerImage.classList.add('top-3')
                        } else {
                            attackerImage.classList.add('trans-bot-100')
                            attackerImage.classList.remove('bottom-0')
                            attackerImage.classList.add('bottom-3')
                        }

                        if (defender.value === null || attacker.value.traits.includes('Airborne') || defender.value.traits.includes('Waterborne')) {
                            if (defender.value === null && !attacker.value.traits.includes('Airborne')) {
                                for (let i = 0; i < defenders.length; i++) {
                                    if (defenders[i].value !== null && defenders[i].value.traits.includes('Guardian')) {
                                        guardianTurn(attacker, defender, defenders[i])
                                        break;
                                    }
                                }
                            }
                            if (defender.value !== null && attacker.value.traits.includes('Airborne') && defender.value.traits.includes('Mighty Leap')) {
                                boardFightAttackSuccess(attacker, defender)
                            } else {
                                damage = damage + attacker.value.attack * damageMultiplier
                            }
                        } else {
                            boardFightAttackSuccess(attacker, defender)
                        }
                        damageCounter.innerText = "Damage: " + damage

                        setTimeout(function () {
                            if (attacker.line === 1) {
                                attackerImage.classList.add('trans-100')
                                attackerImage.classList.add('top-0')
                                attackerImage.classList.remove('top-3')
                            } else {
                                attackerImage.classList.add('trans-100')
                                attackerImage.classList.add('bottom-0')
                                attackerImage.classList.remove('bottom-3')
                            }

                            if (attacker.value.traits.includes('Waterborne')) {
                                waterborneTurn(true, attacker)
                            }
                            resolve()
                        }, 100)
                    }, 500)
                })
            } else {
                return Promise.resolve
            }
        } else {
            return Promise.resolve
        }
    }

    function boardFightAttackSuccess(attacker, defender) {

        if (attacker.value.traits.includes('Touch of Death')) {
            defender.value.health = 0
        } else {
            defender.value.health = defender.value.health - attacker.value.attack
        }
        if (defender.value.traits.includes('Bees within') && defender.line === playerLine) {
            addCardToHand(allCards[12])
        }
        if (defender.value.health <= 0) {
            if (defender.value.traits.includes('Unkillable') && defender.line === playerLine) {
                addCardToHand(defender.value)
            }
            if (defender.value.traits.includes('Caged Wolf')) {
                removeCardFromBoard(defender)
                selectedCard = allCards[7]
                placeCard(defender, selectedCard)
            } else {
                removeCardFromBoard(defender)
            }
            if (defender.line === playerLine) {
                bones = bones + 1
                bonesCounter.innerText = "Bones: " + bones
            }
        } else {
            createTempHealth(defender.element, defender.value.health)
        }
    }

    function waterborneTurn(condition, attacker, line) {
        if (condition) {
            waterborne.push(attacker)
            removeCardImage(attacker)
            addCardImage(cardBack, attacker.element, attacker.line)
        } else {
            waterborne.forEach(function (boardSpace) {
                    if (boardSpace.line === line) {
                        removeCardImage(boardSpace)
                        addCardImage(boardSpace.value.path, boardSpace.element, boardSpace.line)
                    }
                }
            )
        }
    }

    function guardianTurn(attacker, defender, thisDefender) {
        placeCard(defender, thisDefender.value)
        removeCardFromBoard(thisDefender)
        boardFightAttackSuccess(attacker, defender)
    }

    function sprinterTurn(player) {
        let sprinterSpaces = []
        if (player === playerLine) {
            for (let i = 8; i < 16; i++) {
                if (boardSpaces[i].value !== null) {
                    if (boardSpaces[i].value.traits.includes('Sprinter')) {
                        sprinterSpaces.push({space: boardSpaces[i], index: i})
                    }
                }
            }
        } else {
            for (let i = 0; i < 8; i++) {
                if (boardSpaces[i].value !== null) {
                    if (boardSpaces[i].value.traits.includes('Sprinter')) {
                        sprinterSpaces.push({space: boardSpaces[i], index: i})
                    }
                }
            }
        }
        for (let i = 0; i < sprinterSpaces.length; i++) {
            let currentCard = sprinterSpaces[i].space
            let nextSpace = boardSpaces[sprinterSpaces[i].index + 1]
            if (currentCard.column !== boardLength - 1 && nextSpace.value === null) {
                placeCard(nextSpace, currentCard.value)
                if (currentCard.element.querySelector('div') !== null) {
                    createTempHealth(nextSpace.element, currentCard.value.health)
                }
                removeCardFromBoard(currentCard)
            }
        }
    }


    //helper functions
    function addCardToHand(thisCard) {
        const td = document.createElement('td');
        const drawnCard = {
            name: thisCard.name,
            cost: thisCard.cost,
            attack: thisCard.attack,
            health: thisCard.health,
            traits: thisCard.traits,
            path: thisCard.path,
            element: thisCard.element
        } //stupid but necessary
        addCardImage(drawnCard.path, td, playerLine)
        handSpace.appendChild(td);
        drawnCard.element = td;
        hand.push(drawnCard);
    }

    function addCardImage(imagePath, element, line) {
        const img = document.createElement('img');
        img.src = imagePath
        if (line === 1) {
            img.classList.add('card', 'link', 'top-0');
        } else {
            img.classList.add('card', 'link', 'bottom-0');
        }
        element.appendChild(img);
    }

    function removeCardImage(boardSpace) {
        const boardCard = boardSpace.element.querySelector('img')
        boardSpace.element.removeChild(boardCard)
    }

    function blackBorder(spaces) {
        for (let j = 0; j < spaces.length; j++) {
            spaces[j].element.classList.toggle('fat-border')
            spaces[j].element.classList.toggle('link')
        }
    }

    function removeBlackBordersAll() {
        for (let j = 0; j < board.length; j++) {
            boardSpaces[j].element.classList.add('fat-border')
            boardSpaces[j].element.classList.add('link')
            boardSpaces[j].element.classList.remove('fat-border')
            boardSpaces[j].element.classList.remove('link')
        } //sorry but I was tired af wtf is this shit
    }

    function createSacrificingCardSpace() {
        emptyArray(placeCardSpace)
        for (let j = 0; j < boardSpaces.length; j++) {
            if (boardSpaces[j].value !== null && (boardSpaces[j].line === 2 || boardSpaces[j].line === 3)) {
                placeCardSpace.push(boardSpaces[j])
            }
        }
    }

    function createPlaceCardSpace() {
        placeCardSpace = []
        for (let j = 0; j < boardSpaces.length; j++) {
            if (boardSpaces[j].value === null && boardSpaces[j].line === 3) {
                placeCardSpace.push(boardSpaces[j])
            }
        }
    }

    function createTempHealth(boardSpace, health) {
        if (boardSpace.querySelector('div') !== null) {
            boardSpace.removeChild(boardSpace.querySelector('div'))
        }
        const newHealthCircle = document.createElement('div')
        newHealthCircle.classList.add('temp-health')
        const newHealth = document.createElement('p')
        newHealth.classList.add('start-50', 'top-50', 'translate-middle', 'position-absolute')
        newHealth.innerHTML = health.toString()
        newHealthCircle.appendChild(newHealth)

        boardSpace.appendChild(newHealthCircle)
    }


    //other functions
    function executeSequentially(promises) {
        return promises.reduce((chain, promise) => {
            return chain.then(() => promise());
        }, Promise.resolve());
    }

    function emptyArray(array) {
        array.splice(0, array.length)

    }

    function compareArrays(arrayToExtract, arrayToGet, valueToCompare) {
        let newArray = []
        arrayToExtract.forEach(function (arrayToExtract) {
            if (arrayToExtract[valueToCompare] === arrayToGet)
                newArray.push(arrayToExtract)
        })
        return newArray
    }

});