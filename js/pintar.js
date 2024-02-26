const canvas = document.getElementById('canvas');
const btnIncrementar = document.getElementById('btnMas');
const btnReducir = document.getElementById('btnMenos');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const limpiarEl = document.getElementById('limpiar');
const borrarEl = document.getElementById('borrar');

const contexto = canvas.getContext('2d');
let size = 1;
let EsPresionado = false;
colorEl.value = '#000000'; // Establece un valor inicial para el color (negro)
let color = colorEl.value;
let x;
let y;

canvas.addEventListener('mousedown', (e) => {
    EsPresionado = true;
    x = e.offsetX;
    y = e.offsetY;
});

document.addEventListener('mouseup', () => {
    EsPresionado = false;
    x = undefined;
    y = undefined;
});

function dibujarCirculo(x, y) {
    contexto.beginPath();
    contexto.arc(x, y, size, 0, Math.PI * 2);
    contexto.fillStyle = color;
    contexto.fill();
}

function dibujarLinea(x1, y1, x2, y2) {
    contexto.beginPath();
    contexto.moveTo(x1, y1);
    contexto.lineTo(x2, y2);
    contexto.strokeStyle = color;
    contexto.lineWidth = size * 2;
    contexto.stroke();
}

canvas.addEventListener('mousemove', (e) => {
    if (EsPresionado) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;
        dibujarCirculo(x2, y2);
        dibujarLinea(x, y, x2, y2);
        x = x2;
        y = y2;
    }
});

// Escucha el evento de cambio de color
colorEl.addEventListener('input', (e) => {
    color = e.target.value;
});
function ActualizarTEnPantalla()
{
    sizeEl.innerText = size;
}
btnIncrementar.addEventListener('click', ()=> {
    size += 1

    if(size > 50 ) 
    {
        size = 50
    }

    ActualizarTEnPantalla()
})

btnReducir.addEventListener('click', ()=> {
    size -= 1 

    if(size < 1 ) 
    {
        size = 1
    }

    ActualizarTEnPantalla()
})
colorEl.addEventListener('change', (e) => color = e.target.value) 
limpiarEl.addEventListener('click', () => contexto.clearRect(0,0, canvas.width, canvas.height)) 



//--------------------------------------------------------------------------------

// Eventos táctiles para dispositivos móviles
canvas.addEventListener('touchstart', (e) => {
    EsPresionado = true;
    x = e.touches[0].clientX - canvas.getBoundingClientRect().left;
    y = e.touches[0].clientY - canvas.getBoundingClientRect().top;
}, false);

canvas.addEventListener('touchend', () => {
    EsPresionado = false;
    x = undefined;
    y = undefined;
}, false);

canvas.addEventListener('touchmove', (e) => {
    if (EsPresionado) {
        const x2 = e.touches[0].clientX - canvas.getBoundingClientRect().left;
        const y2 = e.touches[0].clientY - canvas.getBoundingClientRect().top;
        dibujarCirculo(x2, y2);
        dibujarLinea(x, y, x2, y2);
        x = x2;
        y = y2;
    }
    e.preventDefault(); // Evita el desplazamiento de la página al dibujar en el canvas
}, false);
