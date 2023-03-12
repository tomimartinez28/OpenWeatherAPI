const container = document.querySelector('.container');
const form = document.querySelector('#formulario');
const result = document.querySelector('#resultado');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima)
});



function buscarClima(e) {
    e.preventDefault();

    
    // Create a new FormData object and pass the form element to it
    const formData = new FormData(form);

    // Get the value of the 'name' input field
    const ciudad = formData.get('ciudad');

    // Get the value of the 'email' input field
    const pais = formData.get('pais');

    // Validate the form
    if(ciudad === '' || pais === '' || pais === null) {
        mostrarAlerta('Todos los campos son obligatorios', 'error' );
        return
    }
    
}




// Function that gets the data from the API
function getData() {
    fetch()
}







function mostrarAlerta(mensaje, tipo) {

    // creo el div  
    const alertaHTML = document.createElement('div');
    
    if(tipo === 'error') {
        alertaHTML.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'mt-5', 'text-center');
    } else {
        alertaHTML.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'relative', 'mt-5', 'text-center')
    }
    alertaHTML.textContent = mensaje;
    container.appendChild(alertaHTML);

    setTimeout(() => {
        alertaHTML.remove();
    }, 2000);
}