

//-------------------------------------------------------------------------------------------
const svg = document.getElementById('svg')
const squareSize = 16
const colors = [
	'#ff0000',
	'#00ff00',
	'#0000ff',
	'#ffff00',
	'#ff00ff',
	'#00ffff',
	'#ff8000',
	'#8000ff',
	'#00ff80',
	'#ff0080',
	'#0080ff',
	'#ff0080',
	'#80ff00',
	'#ff8000',
	'#8000ff',
	'#ffcc00',
	'#ff6666',
	'#3399ff',
	'#cc33ff',
	'#99ffcc',
	'#ff3366',
	'#66ff33',
	'#ff99cc',
	'#66ccff',
	'#ff6600',
	

]

const setup = () => {
	let squareSmash
	window.clearInterval(squareSmash)
	svg.innerHTML = ''
	const windowWidth = window.innerWidth
	const windowHeight = window.innerHeight
	const squaresInX = Math.floor((windowWidth / squareSize) + 1)
	const squaresInY = Math.floor((windowHeight / squareSize) + 1)
	svg.setAttribute('viewBox', `0 0 ${windowWidth} ${windowHeight}`)

	
	const createRandomSquare = () => {
		const fillStyle = colors[Math.floor(Math.random() * colors.length)]
		const svgns = "http://www.w3.org/2000/svg";
		const parentSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		const rect = document.createElementNS(svgns, 'rect');
		const randomCol = Math.floor(Math.random() * squaresInX)
		const randomRow = Math.floor(Math.random() * squaresInY)
		const sizeRoll = Math.floor(Math.random() * 100)
		let sizeMultiplier = 1
		if (sizeRoll > 89) sizeMultiplier = 2
		if (sizeRoll > 96) sizeMultiplier = 3
		rect.setAttribute('height', squareSize * sizeMultiplier)
		rect.setAttribute('width', squareSize * sizeMultiplier)
		rect.setAttribute('x', '100%')
		rect.setAttribute('y', '100%')
		rect.setAttribute('fill', fillStyle)
		parentSVG.setAttribute('height', squareSize * sizeMultiplier)
		parentSVG.setAttribute('width', squareSize * sizeMultiplier)
		parentSVG.setAttribute('viewBox', `0 0 ${squareSize * sizeMultiplier} ${squareSize * sizeMultiplier}`)
		parentSVG.setAttribute('x', randomCol * squareSize)
		parentSVG.setAttribute('y', randomRow * squareSize)
		rect.style.animationName = `fade_in_out`
		rect.style.animationDuration = `${Math.floor((Math.random() * 10000) + 5000)}ms`
		rect.style.animationDelay = `${Math.floor((Math.random() * 10000) - 5000)}ms`
		parentSVG.appendChild(rect)
		svg.appendChild(parentSVG)
	}

	for (let i = 0; i < (squaresInY * squaresInX / 7); i++) {
		createRandomSquare()
	}
}

setup()

window.addEventListener('resize', setup)

//----------------------------------------------------------------------

const canvas = document.getElementById('canvas');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const penSizeInput = document.getElementById('penSize');

const contexto = canvas.getContext('2d');

let size = parseInt(sizeEl.innerText);
let EsPresionado = false;
colorEl.value = '#000000'; 
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

function ActualizarTEnPantalla() {
    sizeEl.innerText = size;
}

penSizeInput.addEventListener('input', () => {
    size = parseInt(penSizeInput.value);
    ActualizarTEnPantalla();
});

colorEl.addEventListener('change', (e) => color = e.target.value); //para cambiar de color 

const btnEraser = document.getElementById('borra');
let esBorradorActivado = false;

btnEraser.addEventListener('click', () => {
    esBorradorActivado = !esBorradorActivado;
    if (esBorradorActivado) {
        color = 'white'; // Establecer el color a blanco para el borrador
        size = 1; // Establecer un tamaño de borrador inicial
    } else {
        color = colorEl.value; // Restaurar el color seleccionado por el usuario
        size = parseInt(sizeEl.innerText); // Restaurar el tamaño seleccionado por el usuario
    }
});

const llenarEl = document.getElementById('llenar');
llenarEl.addEventListener('click', () => {
    contexto.fillStyle = color; // Establecer el color seleccionado
    contexto.fillRect(0, 0, canvas.width, canvas.height); // Dibujar un rectángulo del tamaño del canvas
});

const limpiarEl = document.getElementById('limpiar');
limpiarEl.addEventListener('click', () => contexto.clearRect(0,0, canvas.width, canvas.height)); //para borrar lo hecho en las canvas


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
