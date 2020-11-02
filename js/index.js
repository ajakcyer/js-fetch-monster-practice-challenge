const monsterCont = document.querySelector('#monster-container')
const createMonster = document.querySelector('#create-monster')
const backBtn = document.querySelector('#back')
const forwardBtn = document.querySelector('#forward')

const renderAllMonsters = (monsters) =>{
    monsters.forEach(monster => {
        renderMonster(monster)
    })
}

const renderMonster = (monster) =>{
    const monsterDiv = document.createElement('div')
    monsterDiv.dataset.id = monster.id
    monsterDiv.innerHTML = `<h2>${monster.name}</h2>
                            <h4>Age: ${monster.age}</h4>
                            <p>${monster.description}</p>`
    monsterCont.append(monsterDiv)
}


fetch("http://localhost:3000/monsters/?_limit=50")
.then(r => r.json())
.then(renderAllMonsters)
.catch(console.log)

/// form create

const monsterForm = document.createElement('form')
monsterForm.id = 'monster-form'
monsterForm.innerHTML = `<input type="text" id="name" name="name" placeholder="name...">
                        <input type="number" id="age" name="age" placeholder="age...">
                        <input type="text" id="description" name="description" placeholder="description...">
                        <input type="submit" id="submit" name="submit">`
createMonster.append(monsterForm)

monsterForm.addEventListener('submit', e => {
    e.preventDefault()
    // console.log("hi")
    const newMonster = {
        name: monsterForm.name.value,
        age: monsterForm.age.value,
        description: monsterForm.description.value
    }

    monsterForm.reset()

    const monsterObjConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newMonster)
    }

    fetch("http://localhost:3000/monsters", monsterObjConfig)
    .then(r => r.json())
    .then(renderMonster)
    .catch(console.log)
})

let page = 1

forwardBtn.addEventListener('click', e=>{
    const oldMonsters = monsterCont.querySelectorAll('div')
    oldMonsters.forEach(monster =>{
        monster.remove()
    })
    // debugger
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page += 1}`)
    .then(r => r.json())
    .then(renderAllMonsters)
})

backBtn.addEventListener('click', e=>{
    const oldMonsters = monsterCont.querySelectorAll('div')
    oldMonsters.forEach(monster =>{
        monster.remove()
    })
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page -= 1}`)
    .then(r => r.json())
    .then(renderAllMonsters)
})