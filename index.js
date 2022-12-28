let myLibrary = [];
let nro_libro = 0;

// Books
const contenedor_libros = document.querySelector(".book-container");

// Herramientas btn
const agregar_libro_btn = document.querySelector("#herramienta-agregar");
const editar_libros_btn = document.querySelector("#herramienta-editar");

// Modal
const modal_agregar_libro = document.querySelector(".modal-agregar-libro");
const cerrar_modal_agregar_libro = document.querySelector("#modal-close-btn");

// Modal - Form
const form_agregar_ibro = document.querySelector(".modal-agregar-libro-form");
const input_nombre_libro = document.querySelector("#nombre-libro");
const input_nombre_autor = document.querySelector("#nombre-autor");
const input_cantidad_paginas = document.querySelector("#cantidad-paginas");
const input_leido = document.querySelector("#switch-modal");


// Book Management
class Book {
    book_container = null;
    data_container = document.createElement("DIV");
    switch_leido = document.createElement("DIV");
    input = document.createElement("INPUT");

    constructor (libro, autor, pags, leido) {
        this.libro = libro;
        this.autor = autor;
        this.pags = pags;
        this.leido = leido;
        this.id = nro_libro;
    }

    get card() {
        return this.book_container ?? this.createCard(); // if this.card != NULL != UNDEFINED
    }

    actualizarCheckBox() {
        this.leido = this.input.checked;
        console.log(myLibrary);
    }

    crearSwitchInput() {
        this.input.classList.add("input-switch");
        this.input.classList.add("input-switch-card");
        this.input.setAttribute(`type`, `checkbox`);
        this.input.setAttribute(`name`, `read`);
        this.input.setAttribute(`id`, `switch-${this.id}`);
        this.input.checked = this.leido;
        this.input.addEventListener("click", (e) => this.actualizarCheckBox());
    }
    
    fillSwitchLeido() {
        const span = document.createElement("SPAN");
        const label = document.createElement("LABEL");
        this.crearSwitchInput();
        
        span.textContent = "Leido";
        label.classList.add("switch-lbl");
        label.setAttribute("for", `switch-${this.id}`);
        
        this.switch_leido.classList.add("switch");
        this.switch_leido.classList.add("switch-card");
        this.switch_leido.appendChild(span);
        this.switch_leido.appendChild(this.input);
        this.switch_leido.appendChild(label);
    }

    fillDataContainer() {
        let p_libro = document.createElement("P");
        let p_autor = document.createElement("P");
        let p_pags = document.createElement("P");

        p_libro.innerText = this.libro;
        p_autor.innerText = this.autor;
        p_pags.innerText = this.pags;

        this.data_container.appendChild(p_libro);
        this.data_container.appendChild(p_autor);
        this.data_container.appendChild(p_pags);
    }

    seleccionarParaBorrar(e) {
        if(e.currentTarget.classList.contains("book-editing")) {
            if(!e.currentTarget.classList.contains("book-to-remove")) {
                e.currentTarget.classList.add("book-to-remove");
            }
            else {
                e.currentTarget.classList.remove("book-to-remove");
            }
        }
    }

    createCard() {
        this.book_container = document.createElement("DIV");

        this.fillDataContainer();
        this.fillSwitchLeido();
        this.book_container.appendChild(this.data_container);
        this.book_container.appendChild(this.switch_leido);
        this.book_container.classList.add("book")
        this.book_container.setAttribute("id", this.id);
        this.book_container.addEventListener('click', this.seleccionarParaBorrar);
        
        return this.book_container;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    actualizar_container();
    console.log(myLibrary);
}

function borrar_libro(id) {
    let indice = myLibrary.findIndex((book) => book.id == id);
    let cantElementosABorrar = 1;

    if(indice != -1) {
        myLibrary.splice(indice, cantElementosABorrar);
    }
    else {
        console.error(`el libro de id ${id} no se encuentra en la biblioteca`)
    }
}

function crear_libro() {
    let libro = input_nombre_libro.value;
    let autor = input_nombre_autor.value;
    let pags  = input_cantidad_paginas.value;
    let leido = input_leido.checked;

    let newBook = new Book(libro, autor, pags, leido);
    addBookToLibrary(newBook);
    nro_libro++;
}

// HTML Book Management

function crear_book_item(book) {
    book_container.addEventListener('click', seleccionarParaBorrar);
    return book_container;
}

editar_libros_btn.addEventListener('click', (e) => {
    if(editar_libros_btn.innerHTML == "Borrar") {
        editar_libros_btn.innerText = "Confirmar";
        editar_libros_btn.classList.add("editar_libro");

        myLibrary.forEach((element) => {
            element.book_container.classList.add("book-editing");
        });
    }
    else {
        editar_libros_btn.innerText = "Borrar"; 
        editar_libros_btn.classList.remove("editar_libro");
        let books2delete = [];
        
        myLibrary.forEach((element) => {
            element.book_container.classList.remove("book-editing");

            if(element.book_container.classList.contains("book-to-remove")) {
                books2delete.push(element.id);
            }
        });

        books2delete.forEach((id) => borrar_libro(id));
        actualizar_container();
    }
});


// Library Management
function actualizar_container() {
    let book_container_fragment = document.createDocumentFragment();

    for(let book of myLibrary) {
        book_container_fragment.appendChild(book.card);
    }

    contenedor_libros.innerHTML = '';
    contenedor_libros.appendChild(book_container_fragment);
}


// Modal management

function cerrar_modal () {
    modal_agregar_libro.classList.remove('modal--show');
}

function mostrar_modal() {
    modal_agregar_libro.classList.add('modal--show');
}

agregar_libro_btn.addEventListener('click', e => {
    e.preventDefault();
    form_agregar_ibro.reset();
    mostrar_modal();
});

cerrar_modal_agregar_libro.addEventListener('click', (e)=>{
    e.preventDefault();
    cerrar_modal()
});

form_agregar_ibro.addEventListener('submit', (e) => {
    e.preventDefault();
    crear_libro();
    form_agregar_ibro.reset();
    cerrar_modal();
});


// Inicialización

let book1 = new Book("Poseidon", "William", 24, false); nro_libro++;
let book2 = new Book("Zeus", "Shakespeare", 123, true); nro_libro++;
let book3 = new Book("Wednesday", "Tim Burton", 99, true); nro_libro++;
let book4 = new Book("Un libro re piola", "Un autor excelente", 47, false); nro_libro++;

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);