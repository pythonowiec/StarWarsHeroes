class StarWarsCharacters{
    constructor() {
        
        this.characters = [];
        this.API= "https://akabab.github.io/starwars-api/api/all.json";
        this.API_PAGE = `${parseInt(Math.random() * 83 + 1)}`;

        this.API_ENDPOINT = `${this.API}`;

        this.clear = document.createElement("button");
        this.catalog = null;
        this.search = null;
        this.hero = null;
        this.image = null;
        this.descriptionHero = null;
        this.UiSelectors = {
            content: '[data-content]',
            search: '[data-search]',
            searchContent: '[data-searchc]'
        }
    } 

    initializeCatalog() {
        this.catalog = document.querySelector(this.UiSelectors.content);
        this.search = document.querySelector(this.UiSelectors.search);
        this.searchContent = document.querySelector(this.UiSelectors.searchContent);
        this.pullCharacters();
        this.addEvent();
        
        
    }    

    addEvent(){
        this.search.addEventListener('input', () => this.filtler());
        this.clear.addEventListener('click', () => {
            this.searchContent.innerHTML = "";
            this.search.value = "";
        });
        
    }

    async pullCharacters() {
        let arr = [];
        let arrImage = [];
        const characters  = await this.fetchData(this.API_ENDPOINT);
        for (let index = 0; index < characters.length; index++) {
            
            this.hero = document.createElement('div')
            this.hero.id = 'hero';
            this.catalog.appendChild(this.hero);

            this.descriptionHero = document.createElement('p');
            this.descriptionHero.id = 'hero-description';
            this.descriptionHero.innerHTML += `${characters[index].name} | height: ${characters[index].height} m | ${characters[index].mass} kg | homeworld: ${characters[index].homeworld} `;
            this. hero.appendChild(this.descriptionHero);

            this.image = document.createElement('img');
            this.image.id = 'hero-image';
            this.image.setAttribute('src', characters[index].image);
            this.hero.appendChild(this.image);

            this.characters.push({
                name: characters[index].name,
                height: characters[index].height,
                mass: characters[index].mass,
                homeworld: characters[index].homeworld

            });
            
        }
        
        // this.characters = [...characters];

        
        console.log(this.characters);
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

    filtler(){
        let test = [];  
        let searchQuery = this.search.value;
        let filtlerResult = [];
        let result = [];
        this.searchContent.innerHTML = "";

        this.characters.forEach(el =>{
            filtlerResult.push(el.name);

        });
        

        result = filtlerResult.filter(e => e.includes(searchQuery));
        if (result.length == 0){
            this.searchContent.innerHTML = "not found";
        }
        for (let index = 0; index < this.characters.length; index++) {
            
            if(result.includes(this.characters[index].name)){
                this.image.setAttribute('src', this.characters[index].image);
                this.outcome = document.createElement("div")
                this.outcome.id = "result";
                this.outcome.innerHTML = `${this.characters[index].name} | height: ${this.characters[index].height} m | ${this.characters[index].mass} kg | homeworld: ${this.characters[index].homeworld} `;
                this.searchContent.appendChild(this.outcome);
            }
            
            
        }
              
        
        this.clear.id = "clear";
        this.clear.innerHTML = "clear";
        this.searchContent.appendChild(this.clear);
        

    }
} 