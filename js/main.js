import { makeMainPage } from './pages.js';
import { addMainListeners } from './script.js';

function main() {
    // Создание страницы с выбором покемонов
    makeMainPage();

    const  headerText = document.querySelector( '.header' );
    headerText.addEventListener( "click", () => { window.location = 'index.html' });
    addMainListeners();
}

main();