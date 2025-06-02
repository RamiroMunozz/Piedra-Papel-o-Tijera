// Opciones disponibles en el juego (piedra, papel, tijera)
const opciones = ['piedra', 'papel', 'tijera'];

// Array para guardar el historial de partidas jugadas
let historial = [];

// Variable para saber si es la primera vez que se juega, para mostrar el resultado y historial
let esPrimerMovimiento = true; 

// --- Funciones del juego ---

// Función para que la computadora elija una opción al azar
function obtenerEleccionComputadora() {
    // Genera un número aleatorio entre 0 y 2 (índices del array opciones)
    const numeroAleatorio = Math.floor(Math.random() * 3);
    // Devuelve la opción que está en ese índice del array
    return opciones[numeroAleatorio];
}

// Función para comparar la elección del jugador y la computadora y ver quién gana
function determinarGanador(eleccionJugador, eleccionComputadora) {
    // Si las elecciones son iguales, es un empate
    if (eleccionJugador === eleccionComputadora) {
        return 'Empate';
    }
    
    // Si no es empate, comprobamos las condiciones para que el jugador gane
    // Piedra le gana a tijera
    // Papel le gana a piedra
    // Tijera le gana a papel
    if (
        (eleccionJugador === 'piedra' && eleccionComputadora === 'tijera') ||
        (eleccionJugador === 'papel' && eleccionComputadora === 'piedra') ||
        (eleccionJugador === 'tijera' && eleccionComputadora === 'papel')
    ) {
        return 'Ganas'; // El jugador gana
    }
    
    // Si no fue empate y el jugador no ganó, entonces el jugador pierde
    return 'Pierdes'; // El jugador pierde
}

// Función principal que se llama cuando el jugador hace clic en una opción
function jugar(eleccionJugador) {
    // 1. La computadora elige su opción
    const eleccionComputadora = obtenerEleccionComputadora();
    
    // 2. Determinamos el resultado de la partida
    const resultado = determinarGanador(eleccionJugador, eleccionComputadora);
    
    // 3. Guardamos el resultado de esta partida en nuestro historial
    historial.push(`Jugador: ${eleccionJugador} | PC: ${eleccionComputadora} => ${resultado}`);
    
    // 4. Si es la primera partida, mostramos las áreas de resultado e historial
    if (esPrimerMovimiento) {
        // Buscamos el div con la clase 'resultado-actual' y le quitamos la clase 'initial-hidden'
        document.querySelector('.resultado-actual').classList.remove('initial-hidden');
        // Buscamos el div con la clase 'historial' y le quitamos la clase 'initial-hidden'
        document.querySelector('.historial').classList.remove('initial-hidden');
        // Marcamos que ya no es el primer movimiento
        esPrimerMovimiento = false; 
    }
    
    // 5. Actualizamos lo que se ve en la pantalla con el resultado de la partida
    mostrarResultado(eleccionJugador, eleccionComputadora, resultado);
}

// Función para actualizar lo que se ve en la sección de resultados y añadir al historial visual
function mostrarResultado(eleccionJugador, eleccionComputadora, resultado) {
    // --- Actualizar la sección de resultado actual (Tu elección vs PC) ---

    // Encontramos la imagen y el texto de la elección del jugador
    const imgJugador = document.querySelector('.jugador .eleccion-img');
    const textoJugador = document.querySelector('.jugador p');
    // Actualizamos la imagen (src) y el texto (alt y textContent)
    imgJugador.src = `imagenes/${eleccionJugador}-removebg-preview.png`;
    imgJugador.alt = eleccionJugador;
    textoJugador.textContent = eleccionJugador;
    
    // Encontramos la imagen y el texto de la elección de la computadora
    const imgComputadora = document.querySelector('.computadora .eleccion-img');
    const textoComputadora = document.querySelector('.computadora p');
    // Actualizamos la imagen (src) y el texto (alt y textContent)
    imgComputadora.src = `imagenes/${eleccionComputadora}-removebg-preview.png`;
    imgComputadora.alt = eleccionComputadora;
    textoComputadora.textContent = eleccionComputadora;
    
    // Encontramos el elemento donde se muestra el texto del resultado (Ganas, Pierdes, Empate)
    const textoResultado = document.querySelector('.resultado-texto');
    // Actualizamos el texto que se muestra
    textoResultado.textContent = resultado;
    // Actualizamos la clase CSS del elemento para que cambie de color según el resultado
    textoResultado.className = `resultado-texto ${resultado.toLowerCase()}`;
    
    // --- Actualizar la sección del historial de partidas ---

    // Encontramos el contenedor donde se listan los items del historial
    const historialContenido = document.querySelector('.historial-contenido');
    
    // Creamos un nuevo elemento div para representar la última partida jugada
    const nuevoItemHistorial = document.createElement('div');
    // Le asignamos la clase CSS para que tenga el estilo correcto
    nuevoItemHistorial.className = 'historial-item';
    
    // Creamos el contenido HTML para este nuevo item del historial usando los datos de la partida actual
    nuevoItemHistorial.innerHTML = `
        <span class="numero">#${historial.length}</span>
        <div class="info">
            <span class="jugador">Jugador: ${eleccionJugador}</span>
            <span class="pc">PC: ${eleccionComputadora}</span>
        </div>
        <span class="resultado ${resultado.toLowerCase()}">${resultado}</span>
    `;
    
    // Agregamos este nuevo item al PRINCIPIO de la lista del historial
    historialContenido.insertBefore(nuevoItemHistorial, historialContenido.firstChild);
}
