const tablero = document.querySelector('#tablero')
const mostrarInformacion = document.querySelector('#informacion')
const celdasAlPrincipio = [
    "", "", "",
    "", "", "",
    "", "", ""
]
let eleccion = "circulo"

mostrarInformacion.textContent = 'El círculo va primero'

function crearTablero() {
    celdasAlPrincipio.forEach((celda, index) => {
        const ElementoCelda = document.createElement('div')
        ElementoCelda.classList.add("cuadrado")
        ElementoCelda.id = index
        ElementoCelda.addEventListener('click', anadirEleccion)
        tablero.append(ElementoCelda)
    })
}

crearTablero()

function anadirEleccion(e) {
    const mostrarEleccion = document.createElement('div')
    mostrarEleccion.classList.add(eleccion)
    e.target.append(mostrarEleccion)
    eleccion = eleccion === 'circulo' ? 'equis' : 'circulo'
    mostrarInformacion.textContent = "Es el turno ahora para quien escogió " + eleccion + "."
    e.target.removeEventListener("click", anadirEleccion)
    verificarPuntaje()
}

function verificarPuntaje() {
    const todosCuadrados = document.querySelectorAll(".cuadrado")
    const combinacionesGanadoras = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    combinacionesGanadoras.forEach(array => {
        const circuloGana = array.every(celda =>
            todosCuadrados[celda].firstChild?.classList.contains('circulo'))
            if (circuloGana) {
                mostrarInformacion.textContent = '¡EL JUGADOR DE LOS CÍRCULOS HA GANADO!'
                todosCuadrados.forEach(cuadrado => cuadrado.replaceWith(cuadrado.cloneNode(true)))
            }
    })

    combinacionesGanadoras.forEach(array => {
        const equisGana = array.every(celda =>
            todosCuadrados[celda].firstChild?.classList.contains('equis'))
            if (equisGana) {
                mostrarInformacion.textContent = '¡El JUGADOR DE LAS EQUIS HA GANADO!'
                todosCuadrados.forEach(cuadrado => cuadrado.replaceWith(cuadrado.cloneNode(true)))
            }
    })
}