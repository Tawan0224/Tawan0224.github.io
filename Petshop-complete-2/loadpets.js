const pets = [
  {
    "name": "KeeKee",
    "type": "Dog", 
    "age": 3, 
    "img": "./petshop-img/dogs/dog01.jpg"
  },
  {
    "name": "Buddy", 
    "type": "Dog", 
    "age": 3, 
    "img": "./petshop-img/dogs/dog02.jpg"
  },
  {
    "name": "Jack", 
    "type": "Dog", 
    "age": 3, 
    "img": "./petshop-img/dogs/dog03.jpg"
  },
  {
    "name": "Whiskers", 
    "type": "Cat", 
    "age": 2, 
    "img": "./petshop-img/cats/cat01.jpg"
  },
  {
    "name": "Mittens", 
    "type": "Cat", 
    "age": 2, 
    "img": "./petshop-img/cats/cat02.jpg"
  },
  {
    "name": "Oreo", 
    "type": "Cat", 
    "age": 2, 
    "img": "./petshop-img/cats/cat03.jpg"
  },
  {
    "name": "BaBa", 
    "type": "Capybara", 
    "age": 4, 
    "img": "./petshop-img/capybaras/capybara01.jpg"
  },
  {
    "name": "Papoo", 
    "type": "Capybara", 
    "age": 4, 
    "img": "./petshop-img/capybaras/capybara02.jpg"
  },
  {
    "name": "Bemmie", 
    "type": "Bird", 
    "age": 1, 
    "img": "./petshop-img/birds/bird01.jpg"
  },
  {
    "name": "Tweety", 
    "type": "Bird", 
    "age": 1, 
    "img": "./petshop-img/birds/bird02.jpg"
  }
]

function loadPets() {
  console.log("Loading pets...");
  const petList = $("#pet-list");
  pets.forEach((pet) => {
    const petItem = $("<div>").addClass("pet").html(`
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} months</p>
      <button class="adopt-btn">Adopt Now</button>
    `);
    petList.append(petItem);
  });

  // Attach click handler using event delegation
  petList.on("click", ".adopt-btn", adoptPet);

  // install event handler for pet type
  $('input[name="pet-type"]').on("change", function () {
    const selectedType = $(this).val();
    filterPets();

  });
}

function filterPets() {

  console.log("Selected pet type:", $('input[name="pet-type"]:checked'));
  const types = $('input[name="pet-type"]:checked')
    .map(function () {
      return $(this).val();
    })
    .get();

  console.log(types);

  const filteredPets = pets.filter((pet) => types.includes(pet.type));
  console.log(filteredPets);

  const petList = $("#pet-list");
  petList.empty(); // Clear the existing pets
  filteredPets.forEach((pet) => {
    const petItem = $("<div>").addClass("pet").html(`
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} years</p>
      <button class="adopt-btn">Adopt Now</button>
    `);
    petList.append(petItem);
  });
}

$(document).ready(loadPets);
