const kelvin = 273.15;

window.onload = () => {
    mostrarSaludo();
    obtenerClima();
}

function getValuesByHour(hora) {
    if (hora >= 6 && hora < 12) {
      return { texto: "Buenos Días", complemento: "Es hora de un desayuno rico y nutritivo" };
    }
  
    if (hora >= 12 && hora < 18) {
      return { texto: "Buenas Tardes", complemento: "Es hora de un buen almuerzo para mantener las energías" };
    }
  
    if (hora >= 18 && hora < 24 || hora >= 0 && hora < 6) {
      return { texto: "Buenas Noches", complemento: "Por fin es hora de descansar, mañana será un nuevo día" };
    }
  
    return { texto: "", complemento: "" };
  }
  
  function mostrarSaludo() {
    const fecha = new Date();
    const hora = fecha.getHours();
    const { texto, complemento } = getValuesByHour(hora);
    document.getElementById('txtsaludo').innerHTML = texto;
    document.getElementById('txtcomplemento').innerHTML = complemento;
  }

  const obtenerClima = () => {
      const ciudad = document.getElementById("ciudad");
      const pais = document.getElementById("pais");

      consultadeApi(ciudad, pais);
  }

  const consultadeApi = async(ciudad, pais) => {
      const apiKey = "2c85edea144c47793876428db79e5b4f"
      const url = `api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      const {name, main} = resultado;
      if (!name) {
          return null;
      }
      let divResultado = document.getElementById("resultado");
      divResultado.innerHTML = `
      
      <div class = "tarjeta">
        <div class = "txtclima">
            <h2>El clima en ${name} es:</h2>
            <p class = "temperatura">
            ${ parseFloat(main.temp - kelvin, 10).toFixed(2) } <span> &#x2103;</span>
            </p>
            <p> Temperatura Máxima:
            ${ parseFloat(main.temp_max - kelvin, 10).toFixed(2) } <span> &#x2103;</span>
            </p>
            <p> Temperatura Mínima:
            ${ parseFloat(main.temp_min - kelvin, 10).toFixed(2) } <span> &#x2103;</span>
            </p>
            <p> Humedad:
            ${ parseFloat(main.humidity - kelvin, 10).toFixed(2) } <span> %</span>
            </p>
        </div>
    </div>

      `;
  }