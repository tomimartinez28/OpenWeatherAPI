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

    // Consultar la API
    consultarAPI(ciudad, pais);



    
}



// Function that gets the data from the API
function consultarAPI(ciudad, pais) {
    const appID = '9023f513b2b5c9e4bf4323b2a29b8408';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

    spinner();

    fetch(url)
        .then( response => response.json())
        .then( datos => {   
            
            limpiarHTML();
            
            if(datos.cod === '404') {
                mostrarAlerta('Ciudad no encontrada', 'error')
                return
            }

            // Mostrar datos en el html
            mostrarClima(datos);    
        })
        .catch( error => console.error(error));

        
}


function mostrarClima(datos) { 

    const { name, main: {temp, temp_max, temp_min }} = datos;
    
    const tempCentigrados = kelvinACentigrados(temp);
    const tempMax = kelvinACentigrados(temp_max);
    const tempMin = kelvinACentigrados(temp_min);
    
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = name;
    nombreCiudad.classList.add('font-bold', 'text-2xl');



    const actual = document.createElement('p');
    actual.innerHTML = `${tempCentigrados} &#8451; `;
    actual.classList.add('font-bold', 'text-6xl');


    const maxTempHTML = document.createElement('p');
    maxTempHTML.innerHTML = `Maxima: ${tempMax} &#8451;`;

    const minTempHTML = document.createElement('p');
    minTempHTML.innerHTML = `Minima: ${tempMin} &#8451;`;


    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxTempHTML);
    resultadoDiv.appendChild(minTempHTML);

    result.appendChild(resultadoDiv);

}

const kelvinACentigrados = grados => parseInt(grados - 273.15);


function limpiarHTML() {
    while(result.firstChild){
        result.removeChild(result.firstChild);
    }
};



function spinner() {
    limpiarHTML()

    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>

    `;

    console.log(divSpinner);
    result.appendChild(divSpinner);




}


function mostrarAlerta(mensaje, tipo) {

    // valido que no haya un alerta previo
    const alerta = document.querySelector('.alerta')

    if(!alerta){
        // creo el div  
        const alertaHTML = document.createElement('div');
        
        if(tipo === 'error') {
            alertaHTML.classList.add('bg-red-100', 'border', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'relative', 'mt-5', 'text-center', 'alerta');
        } else {
            alertaHTML.classList.add('bg-green-100', 'border', 'border-green-400', 'text-green-700', 'px-4', 'py-3', 'rounded', 'relative', 'mt-5', 'text-center', 'alerta')
        }
        alertaHTML.textContent = mensaje;
        container.appendChild(alertaHTML);

        setTimeout(() => {
            alertaHTML.remove();
        }, 2000);
    }


}