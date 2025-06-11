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
    "name": "BaBa", 
    "type": "Capybara", 
    "age": 4, 
    "img": "./petshop-img/capybaras/capybara02.jpg"
  },
  {
    "name": "Bemmie", 
    "type": "Birs", 
    "age": 1, 
    "img": "./petshop-img/birds/bird02.jpg"
  }
]

function loadPets() {
  console.log('Loading pets...');
  const petList = document.getElementById('pet-list');
  pets.forEach(pet => {
    const petItem = document.createElement('div');
    petItem.className = 'pet';
    petItem.innerHTML = `
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} years</p>
      <button onclick="adoptPet()">Adopt Now</button>
  `;
    petList.appendChild(petItem);
  });
}
document.addEventListener('DOMContentLoaded', loadPets);
console.log('Pets loaded successfully.');