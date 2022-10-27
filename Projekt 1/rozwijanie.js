const navZmianaKoloru = () => {
    const navbar = document.querySelector('nav');
    window.onscroll = () => {
        if (window.scrollY > 665) {
            navbar.classList.add('nav-active-zmiana-koloru');
        } else {
            navbar.classList.remove('nav-active-zmiana-koloru');
        }
    };
}

const navRozwin = () => {
    const rozwin = document.querySelector('.rozwin');
    const nav = document.querySelector('.nav-links');
    const linki = document.querySelectorAll('.nav-links li')

    // kiedy klikniemy w rozwin nasza nav zmieni sie na nav-active
    rozwin.addEventListener('click', ()=> {
        nav.classList.toggle('nav-active-rozwijanie');

        //animate links
        linki.forEach((linkk, index) => {
            if (linkk.style.animation) {
                linkk.style.animation = ``;
            } else {
                linkk.style.animation = `navRozwijanie 0.2s ease forwards ${index / 7 + 0.6}s`;
            }
        });

        rozwin.classList.toggle('toggle');
    });
}

const app = () => {
    navZmianaKoloru();
    navRozwin(); //wykonaj funkcje
}

app();