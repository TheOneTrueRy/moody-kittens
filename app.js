let kittens = []
let currentKitten = {}
let affection = 5
let mood = ""
let names = []


function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5,
  }

  let kittenName = form.name.value
  
  if (kittenName == ""){
    alert("You must name your kitten!")
  }else if(names.includes(kittenName)){
    alert("Kittens of identical names would just be confusing...")
  }else {
    kittens.push(kitten)
    names.push(kittenName)
    saveKittens()
    form.reset()
    drawKittens()
  }

}


function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  window.localStorage.setItem("names", JSON.stringify(names))
  drawKittens()
}


function loadKittens() {
  let kittensData = JSON.parse(window.localStorage.getItem("kittens"))
  if (kittensData) {
    kittens = kittensData
  }
  let namesData = JSON.parse(window.localStorage.getItem("names"))
  if (namesData) {
    names = namesData
  }
}


function drawKittens() {
  let kittensElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
  <div class="card text-center bg-dark kitten ${kitten.mood}">
    <img class="kitten" src="https://www.pinclipart.com/picdir/big/12-126999_clipart-transparent-cats-vector-cute-cat-cute-cat.png" height=150px width=150px alt="kitten">
    <div class="mt-2 text-light">
      <h2>${kitten.name}</h2>
      <p><span>Mood: ${kitten.mood}</span></p>
      <p><span>Affection: ${kitten.affection}</span></p>
    </div>
    <div>
      <button onclick="pet('${kitten.id}')">Pet Kitty!</button>
      <button onclick="catnip('${kitten.id}')">Give Catnip</button>
    </div>
  </div>
  `
  })
  kittensElement.innerHTML = kittensTemplate
  if (kittens.length > 0){
    document.getElementById("abandon").classList.remove("hidden")
  }
}


function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id)
}


function pet(id) {
  let currentKitten = findKittenById(id)
  let randomNumber = Math.random()
  if (randomNumber > 0.5) {
    currentKitten.affection ++
    setKittenMood(currentKitten)
    saveKittens()
  } else {
    currentKitten.affection --
    setKittenMood(currentKitten)
    saveKittens()
  }
}


function catnip(id) {
  let currentKitten = findKittenById(id)
  currentKitten.mood = "Tolerant"
  currentKitten.affection = 5
  saveKittens()
}


function setKittenMood(kitten) {
  if (kitten.affection >= 7) {kitten.mood = "Happy"}
  if (kitten.affection <= 5) {kitten.mood = "Tolerant"}
  if (kitten.affection <= 3) {kitten.mood = "Angry"}
  if (kitten.affection <= 0) {kitten.mood = "Gone"}
}


function clearKittens(){
  kittens.length = 0
  names.length = 0
  saveKittens()
  document.getElementById("abandon").classList.add("hidden")
}


function getStarted() {
  document.getElementById("welcome").remove();
  if (kittens.length > 0){
    document.getElementById("abandon").classList.remove("hidden")
  }
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
