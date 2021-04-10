//console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    fetchDogImages(imgUrl);

    const breedUrl = 'https://dog.ceo/api/breeds/list/all';
    fetchDogBreeds(breedUrl);


});

function createDogImage(dogUrl) {
    const img = document.createElement("img");
    img.src = dogUrl;
    
    return img;
};

function addDogImagesToDOM(dogUrls) {
    
    const dogImageContainer = document.getElementById("dog-image-container");
    

    dogUrls.forEach((url) => {
        const img = createDogImage(url);
        dogImageContainer.appendChild(img);
    });

}

function fetchDogImages(imgUrl) {
    fetch(imgUrl)
        .then(response => response.json())
        .then(dogImages => addDogImagesToDOM(dogImages.message));
}

function addDogBreedsToDOM(breeds) {
    const dogList = document.getElementById('dog-breeds');
        breeds.forEach((breed) => {
        const li = document.createElement("li");
        li.innerHTML = breed;
        li.addEventListener('click',() => li.style.color = "yellow");
        dogList.appendChild(li);
    });
}

function addDropDownOption() {
    const dropDown = document.getElementById("breed-dropdown");
    const option = document.createElement("option");
    option.selected = "selected";
    option.innerHTML = "Everything";
    option.value = "Everything"
    dropDown.appendChild(option);
}

function filterDogBreeds(breeds) {
    const dropDown = document.getElementById("breed-dropdown");
    addDropDownOption();
    
    dropDown.addEventListener('change',()=> {
        const dogList = document.getElementById('dog-breeds');
        if(dropDown.value === "Everything") {
            dogList.innerHTML = "";
            addDogBreedsToDOM(breeds);
        } else{
            dogList.innerHTML = "";
            const filteredBreeds = breeds.filter((breed) => breed.charAt(0) === dropDown.value);
            addDogBreedsToDOM(filteredBreeds);
        }
       
    });
}

function fetchDogBreeds(breedUrl) {
    fetch(breedUrl)
    .then(response => response.json())
    .then(dogBreeds =>  {
        
        const breedList = Object.keys(dogBreeds.message);
        addDogBreedsToDOM(breedList);
        filterDogBreeds(breedList);
    });

}



