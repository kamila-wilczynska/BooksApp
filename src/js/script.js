/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{

  'use strict';
  const select = {
    templateOf: {
      bookList: '.books-list',
      templateBook: '#template-book',
      containerOfFavourites: '.book__image',
    },
  };

  const templates = {
    menuBooks: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    
   
  };

  class BooksList {
    constructor() {
      
     
      this.filters = [];

      this.initData();
      this.renderBooks();
      this.getElements();
      this.initActions();
      
    }

    initData() {
      this.data = dataSource.books;
    }

    renderBooks() {
     

      for (const book of this.data) {
       
        //generate HTML from Handlebars
        const generatedHTML = templates.menuBooks(book);
        //create element using createElementFromHTML
        const bookHTML = utils.createDOMFromHTML(generatedHTML);
        //find menu container
        const listContainer = document.querySelector(select.templateOf.bookList);
        //add element to menu
        listContainer.appendChild(bookHTML);
      }
    }

    getElements() {
      this.dom = {};
      
    }
    
    

    initActions(){ //add favorite class
      
      

      //Przygotuj w niej referencję do listy wszystkich elementów .book__image w liście .booksList
      const books1 = document.querySelectorAll(select.containerOf.bookList);
      
      
      // Następnie przejdź po każdym elemencie z tej listy.
      for (const book of books1) {
        //Dla każdego z nich dodaj nasłuchiwacz, który po wykryciu uruchomi funkcję, która...
        book.addEventListener('dbclick', function(event){
          //zatrzyma domyślne zachowanie przeglądarki (preventDefault),
          event.preventDefault();
          const idBooks = document.querySelector(select.containerOf.containerOfFavourites);
          
          //Jeśli kliknę image to:
          if (book.classList.contains('favorite')){
          //doda do klikniętego elementu klasę favorite,
            book.classList.add('favorite'); 
            //pobierze z jego data-id identyfikator książki,
            book.getAttribute('data-id');
            //i doda ten identyfikator do favoriteBooks
            favoriteBooks.push(idBooks);
          }
        });
        
      }






    }
    
  }

  const favoriteBooks=[];
  console.log(favoriteBooks);


  const app = new BooksList();
  console.log(app);


}
