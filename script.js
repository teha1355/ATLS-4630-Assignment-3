const form = document.querySelector('form');

function processForm(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const number = formData.get('number');
}

form.addEventListener('submit', processForm);

//console.log(number);

const addFactsButton = document.getElementById('add-facts')
addFactsButton.addEventListener('click', chicago);

async function chicago() {
    const numberInput = document.getElementById('number-input');
    //console.log(numberInput.value);

    if (numberInput.value > 12){
        numberInput.value = 12;

        const pleaseParagraph = document.getElementById('please');
        pleaseParagraph.append(" C'mon man");
    }

    if(numberInput.value == 0){
        numberInput.value = 1;

        const pleaseParagraph = document.getElementById('please');
        pleaseParagraph.append(" Why would you do that?");
    }

    //console.log(`https://api.artic.edu/api/v1/artworks?page=2&limit=${numberInput.value}`);


    //I'm not doing math https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    const pageNumber = Math.floor(Math.random() * (10510 - 1) + 1); //there are 10510 pages
    //console.log(pageNumber);

    const url = `https://api.artic.edu/api/v1/artworks?page=${pageNumber}`;
    //let url = `https://api.artic.edu/api/v1/artworks?page=2&limit=${numberInput.value}`;
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);

    //console.log(json.data[0].id);

    for(let i=0; i<numberInput.value; i++){
        //console.log(i);
        //fighting for my life here used https://stackoverflow.com/questions/50248329/fetch-image-from-api as reference

        const imageId = json.data[i].image_id;
        const imageUrl = `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`; 
        console.log(imageUrl);

        const imageResponse = await fetch(imageUrl); //this image api is major broke jk there just weren't images for that first page
        const jsonImage = await imageResponse.blob();


        const imageURL = URL.createObjectURL(jsonImage);
    
        const imageDiv = document.createElement('img');
        imageDiv.src = imageURL;
    
        const div = document.getElementById('image-spot');
        div.append(imageDiv);

        if (imageResponse.status == 404){
            //console.log('does this show up???');
            const errorParagraph = document.createElement('p');
            errorParagraph.innerText = "This image in the API no longer exists."
            div.append(errorParagraph);

        }

        if (json.data[i].title != null){
            const title = document.createElement('p');
            title.innerText = `Title: ${json.data[i].title}`;
            div.append(title);
        }

        if(json.data[i].artist_title != null){
            const artist = document.createElement('p');
            artist.innerText = `Artist: ${json.data[i].artist_title}`;
            div.append(artist);
        }

        if(json.data[i].medium_display != null){
            const medium = document.createElement('p');
            medium.innerText = `Medium: ${json.data[i].medium_display}`;
            div.append(medium);  
        }

        if (json.data[i].place_of_origin != null){
            const origin = document.createElement('p');
            origin.innerText = `Place of Origin: ${json.data[i].place_of_origin}`;
            div.append(origin);
        }

        if(json.data[i].description != null){
            const description = document.createElement('p');
            description.innerHTML = json.data[i].description;
            div.append(description); 
        }


    }
    
}
