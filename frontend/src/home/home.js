// Utilizaremos la función fetch para obtener el contenido del archivo JSON

function load_partido(){

  //var datos = "JUGADOR;TEMPORADA;JORNADA;RIVAL;DIA;LOCAL/VISITANTE;CAMPO;TIPO PARTIDO;CATEGORIA;DINÁMICA;TITULAR;SUPLENTE;MINUTOS JUGADOS;AMARILLA;ROJA;GOLES;GOL QUE DA LA VICTORIA;ASISTENCIAS;Fecha Nacimiento;Edad;Partido Nº: Junior Muanza Alberto Simao Nogueroles;Temporada 2019/2020;0;Olleria CF;02/08/2019;Visitante;Camp La Solana;Amistoso;0;Empatado;Si;No;45;0;0;0;No;0;14/08/2002;16";

  fetch('Libro1.json')
			.then(response => response.json()) // Parseamos la respuesta a JSON
			.then(data => {
        console.log(data);

				var datosSeparados = data.split(';');
        var jugador = datosSeparados[20];
        var temporada = datosSeparados[21];
        var jornada = datosSeparados[22];
        var rival = datosSeparados[23];
        var dia = datosSeparados[24];
        var local_visitante = datosSeparados[25];
        var campo = datosSeparados[26];
        var tipo_partido = datosSeparados[27];
        var categoria = datosSeparados[28];
        var dinamica = datosSeparados[29];
        var titular = datosSeparados[30];
        var suplente = datosSeparados[31];
        var minutos_jugados = datosSeparados[32];
        var amarilla = datosSeparados[33];
        var roja = datosSeparados[34];
        var goles = datosSeparados[35];
        var gol_victoria = datosSeparados[36];
        var asistencias = datosSeparados[37];
        var fecha_nacimiento = datosSeparados[38];
        var edad = datosSeparados[39];
        var partido_numero = datosSeparados[40];
  
        console.log("Jugador:", jugador);
        console.log("Temporada:", temporada);
        console.log("Jornada:", jornada);
        console.log("Rival:", rival);
        console.log("Día:", dia);
        console.log("Local/Visitante:", local_visitante);
        console.log("Campo:", campo);
        console.log("Tipo de partido:", tipo_partido);
        console.log("Categoría:", categoria);
        console.log("Dinámica:", dinamica);
        console.log("Titular:", titular);
        console.log("Suplente:", suplente);
        console.log("Minutos jugados:", minutos_jugados);
        console.log("Amarilla:", amarilla);
        console.log("Roja:", roja);
        console.log("Goles:", goles);
        console.log("Gol que da la victoria:", gol_victoria);
        console.log("Asistencias:", asistencias);
        console.log("Fecha de nacimiento:", fecha_nacimiento);
        console.log("Edad:", edad);
        console.log("Número de partido:", partido_numero);

			})
			.catch(error => console.error('Error al cargar el archivo JSON:', error));
  //var datosSeparados = datos.split(';');


  var jugador = datosSeparados[20];
  var temporada = datosSeparados[21];
  var jornada = datosSeparados[22];
  var rival = datosSeparados[23];
  var dia = datosSeparados[24];
  var local_visitante = datosSeparados[25];
  var campo = datosSeparados[26];
  var tipo_partido = datosSeparados[27];
  var categoria = datosSeparados[28];
  var dinamica = datosSeparados[29];
  var titular = datosSeparados[30];
  var suplente = datosSeparados[31];
  var minutos_jugados = datosSeparados[32];
  var amarilla = datosSeparados[33];
  var roja = datosSeparados[34];
  var goles = datosSeparados[35];
  var gol_victoria = datosSeparados[36];
  var asistencias = datosSeparados[37];
  var fecha_nacimiento = datosSeparados[38];
  var edad = datosSeparados[39];
  var partido_numero = datosSeparados[40];
  
  console.log("Jugador:", jugador);
  console.log("Temporada:", temporada);
  console.log("Jornada:", jornada);
  console.log("Rival:", rival);
  console.log("Día:", dia);
  console.log("Local/Visitante:", local_visitante);
  console.log("Campo:", campo);
  console.log("Tipo de partido:", tipo_partido);
  console.log("Categoría:", categoria);
  console.log("Dinámica:", dinamica);
  console.log("Titular:", titular);
  console.log("Suplente:", suplente);
  console.log("Minutos jugados:", minutos_jugados);
  console.log("Amarilla:", amarilla);
  console.log("Roja:", roja);
  console.log("Goles:", goles);
  console.log("Gol que da la victoria:", gol_victoria);
  console.log("Asistencias:", asistencias);
  console.log("Fecha de nacimiento:", fecha_nacimiento);
  console.log("Edad:", edad);
  console.log("Número de partido:", partido_numero);
}










document.addEventListener('DOMContentLoaded', function() {
    // Tu código aquí
    fetch('Libro1.json')
  .then(response => response.json()) // Parseamos la respuesta a JSON
  .then(data => {
    // Aquí puedes utilizar los datos como desees
    var furbo = json.parse(data);
    //console.log(furbo); // Muestra los datos en la consola
    // Por ejemplo, puedes acceder a los elementos individualmente
    console.log(furbo[0][0]); // Muestra "Juan"
  })
  .catch(error => console.error('Error al cargar el archivo JSON:', error));
});




