
{

  'use strict';
  const select = {
    templateOf: {
      bookList: '.books-list',
      templateBook: '#template-book',
      containerOfFavourites: '.book__image',
    },
    general: {
      typeOfBook: '.filters',
      filtersInputs: '.filters input',
    },
  };

 

  class BooksList {
    constructor() {
      this.favoriteBooks = [];
      this.filters = [];
      console.log(this.filters);
      
      console.log(this.favoriteBooks);
     
      

      this.initData();
      this.renderBooks();
      this.getElements();
      this.initActions();
      
    }

    initData() {
      this.data = dataSource.books;
      
    }

    renderBooks() {
      const templates = {
        menuBooks: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
      };
      
      for (const templateBook of this.data) {
        templateBook.ratingBgc = this.determineRatingBgc(templateBook.rating);
        templateBook.ratingWidth = templateBook.rating * 10;
       
        //generate HTML from Handlebars
        const generatedHTML = templates.menuBooks(templateBook);
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
      this.dom.menuBooks = document.querySelector(select.templateOf.bookList);
      this.dom.typeOfBook = document.querySelector(select.general.typeOfBook);
      this.dom.filterInputs = document.querySelectorAll(select.general.filtersInputs);
      
      
    }
    
    
    initActions() {
      this.dom.menuBooks.addEventListener('click', (event) => {
        console.log(event.target);
        event.preventDefault();
      });

      this.dom.menuBooks.addEventListener('dblclick', (event) => {
        if (event.target.offsetParent.classList.contains('book__image')) {
          event.preventDefault();
          const bookId = event.target.offsetParent.getAttribute('data-id');
          if (!this.favoriteBooks.includes(bookId)) {
            event.target.offsetParent.classList.add('favorite');
            this.favoriteBooks.push(bookId);
          } else {
            event.target.offsetParent.classList.remove('favorite');
            this.favoriteBooks.splice(this.favoriteBooks.indexOf(bookId), 1);
          }
        }
      });
    
      
      this.dom.typeOfBook.addEventListener('click', (event) => {
        console.log(event.taret);
        
        if (
          event.target.tagName == 'INPUT' && 
          event.target.type == 'checkbox' && 
          event.target.name == 'filter') {
          if (event.target.checked) {
            this.filters.push(event.target.value);
          } else {
            this.filters.splice(this.filters.indexOf(event.target.value), 1);
          }

        }
        for (let input of this.dom.filterInputs) {
          input.addEventListener('change', this.filterBooks());
        }
      });
    }

    filterBooks() {
      for (const templateBook of this.data) {
        let hiddenBooks = false;
        for (const filter of this.filters) {
          if (!templateBook.details[filter]) {
            hiddenBooks = true;
            break;
          }
        }

        
        if (hiddenBooks) {
          document.querySelector(`[data-id="${templateBook.id}"]`).classList.add('.hidden');
        } else {
          document.querySelector(`[data-id="${templateBook.id}"]`).classList.remove('.hidden');
        }
      }
    }
    
    determineRatingBgc(rating) {
      let ratingBgc = '';
      if (rating < 6) {
        ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%';
      } else if (rating > 6 && rating <= 8) {
        ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%';
      } else if (rating > 8 && rating <= 9) {
        ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
      } else if (rating > 9) {
        ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%';
      }

      return ratingBgc;
    }
  

    
  }



 


  const app = new BooksList();
  console.log(app);


}
