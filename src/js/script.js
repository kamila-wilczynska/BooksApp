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
      this.favoriteBooks = [];
     
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
    
    
    initActions() {
      //Przygotuj w niej referencję do listy wszystkich elementów .book__image w liście .booksList
      const bookList = document.querySelectorAll('.book__image');
      console.log(bookList);

      // Następnie przejdź po każdym elemencie z tej listy.
      for(let book of bookList){
        book.addEventListener('dbclick',function(){
          
         
          
          if(bookList.offsetParent.classList.contains('book__image')) {
            const dataId = document.getAttribute('data-id');
            if(!favoriteBooks.dataId && !bookList.classList.contains('.book__image')) {
              favoriteBooks.push(dataId);
              bookList.classList.add('favorite');
            } else {
              
              bookList.classList.remove('favorite');
            } 
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
