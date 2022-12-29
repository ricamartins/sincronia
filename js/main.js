// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const rotateRoulette = (roulette) => {
    let rotatedDegrees = parseInt(roulette.getAttribute('rotated-degrees') || 0)
    let newDegree = rotatedDegrees + 1 > 360 ? 1 : rotatedDegrees + 1
    
    roulette.setAttribute('rotated-degrees', newDegree)
    roulette.style.transform = `rotate(${newDegree}deg)`
}


const rouletteRandomSpin = () => {
    let roulette = document.getElementById('roulette')
    let randomDegrees = randomInt(300, 450)
    let randomDegreesRotated = 0
    
    let interval = setInterval(() => {
        if (randomDegrees == randomDegreesRotated)
            clearInterval(interval)
        else {
            rotateRoulette(roulette)
            randomDegreesRotated++
        }
    }, 5)
}

const getCoverRotatedDegrees = (cover) => parseInt(cover.getAttribute('rotated-degrees') || 0)

const rotateCover = (cover, action) => {
    if (action == 'open') {
        let rotatedDegrees = getCoverRotatedDegrees(cover)
        let newDegree = rotatedDegrees + 1 > 180 ? 180 : rotatedDegrees + 1
        cover.setAttribute('rotated-degrees', newDegree)
        cover.style.transform = `rotate(${newDegree}deg)`
    } else if (action == 'close') {
        let rotatedDegrees = getCoverRotatedDegrees(cover)
        let newDegree = rotatedDegrees - 1 < -180 ? -180 : rotatedDegrees - 1
        cover.setAttribute('rotated-degrees', newDegree)
        cover.style.transform = `rotate(${newDegree}deg)`
    }
}

const toggleCover = () => {
    let coverButton = document.getElementById('cover-button')
    let cover = document.getElementById('cover')
    let opened = parseInt(cover.getAttribute('opened') || 1) == 1
    
    if (opened) {
        let interval = setInterval(() => {
            if (getCoverRotatedDegrees(cover) == -180)
                clearInterval(interval)
            else 
                rotateCover(cover, 'close')
        }, 10)
        cover.setAttribute('opened', 0)
        coverButton.innerText = 'abrir'
    } else {
        let interval = setInterval(() => {
            if (getCoverRotatedDegrees(cover) == 0)
                clearInterval(interval)
            else 
                rotateCover(cover, 'open')
        }, 10)
        cover.setAttribute('opened', 1)
        coverButton.innerText = 'fechar'
    }

}

const rotatePointer = (direction) => {
    let pointer = document.getElementById('pointer-base')
    let rotatedDegrees = parseInt(pointer.getAttribute('rotated-degrees') || 0)
    let newDegree = rotatedDegrees
    
    if (direction == 'right') {
        newDegree = rotatedDegrees + 1 > 89 ? 89 : rotatedDegrees + 1
    } else if (direction == 'left') {
        newDegree = rotatedDegrees - 1 < -89 ? -89 : rotatedDegrees - 1
    }
    
    pointer.setAttribute('rotated-degrees', newDegree)
    pointer.style.transform = `rotate(${newDegree}deg)`
}

const changeCard = () => {
    
    let leftCard = document.getElementById('left-card')
    let rightCard = document.getElementById('right-card')
    let leftWord = document.getElementById('left-word')
    let rightWord = document.getElementById('right-word')

    let colors = CARDS.randomColors()
    let words = CARDS.randomWords()

    leftCard.style.backgroundColor = colors[0]
    rightCard.style.backgroundColor = colors[1]
    leftWord.innerText = words[0]
    rightWord.innerText = words[1]
}

const POINTER = {
    leftInterval: null,
    rightInterval: null
}

document.getElementById('turn-pointer-left').addEventListener('touchstart', () => {
    POINTER.leftInterval = setInterval(() => rotatePointer('left'), 10)
})

document.getElementById('turn-pointer-left').addEventListener('touchend', () => {
    clearInterval(POINTER.leftInterval)
})

document.getElementById('turn-pointer-right').addEventListener('touchstart', () => {
    POINTER.rightInterval = setInterval(() => rotatePointer('right'), 10)
})

document.getElementById('turn-pointer-right').addEventListener('touchend', () => {
    clearInterval(POINTER.rightInterval)
})
