class StarWarsCharacters{
    constructor() {
        
        this.characters = [];
        this.API= "https://akabab.github.io/starwars-api/api/all.json";
        this.API_PAGE = `${parseInt(Math.random() * 83 + 1)}`;

        this.API_ENDPOINT = `${this.API}`;

        this.catalog = null;

        this.UiSelectors = {
            content: '[data-content]'
        }
    } 

    initializeCatalog() {
        this.catalog = document.querySelector(this.UiSelectors.content);
        
        this.pullCharacters();
            
        
        
    }    

    async pullCharacters() {
        let arr = [];
        let arrImage = [];
        const characters  = await this.fetchData(this.API_ENDPOINT);
        for (let index = 0; index < characters.length; index++) {
            
            const hero = document.createElement('div')
            hero.id = 'hero';
            this.catalog.appendChild(hero);

            const descriptionHero = document.createElement('p');
            descriptionHero.id = 'hero-description';
            descriptionHero.innerHTML += `${characters[index].name} | height: ${characters[index].height} m | ${characters[index].mass} kg | homeworld: ${characters[index].homeworld} `;
            hero.appendChild(descriptionHero);

            const image = document.createElement('img');
            image.id = 'hero-image';
            image.setAttribute('src', characters[index].image);
            hero.appendChild(image);

            
        }
        
        // this.characters = [...characters];

        
        console.log(characters);
    }

    async fetchData(url){
        const response = await fetch(url);
        const parseResponse = await response.json();
        
        return parseResponse;
    }

    createCatalog(characters){
        this.catalog.innerHTML += `${characters}`;
    }
    createHero(element, index){
        this.hero.innerHTML += element[index];
    }
} 