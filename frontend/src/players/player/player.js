

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  GetPlayers();


  //initModal("playerModal", updatePlayerModalContent);

});

function GetPlayers() {

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  console.log("id del player: " + id);


  let data = IN_GetPlayer(id);

  console.log(data);
  
  document.getElementById("player_name").innerHTML = data.nombre_completo;

  let cardGrid = document.getElementById('player_container');


  let chart = echarts.init(document.getElementById("grafo_container"), 'dark',{
    renderer: 'svg',
    useDirtyRect: false
  });

  let max_amarillas_of = IN_GetMaxAmarillasOficial();
  let max_amarillas = IN_GetMaxAmarillasNo_Oficial();
  let max_amarillas_total = max_amarillas_of >= max_amarillas ? max_amarillas_of : max_amarillas;
  console.log("Max amarillas total: " + max_amarillas_total);
  
  let max_rojas_of = IN_GetMaxRojasOficial();
  let max_rojas = IN_GetMaxRojasNo_Oficial();
  let max_rojas_total = max_rojas_of >= max_rojas ? max_rojas_of : max_rojas;
  console.log("Max rojas total: " + max_rojas_total);

  console.log("Max goles: " + IN_GetMaxGoles());
  console.log("Max asistencias: " + IN_GetMaxAsistencias());
  console.log("Max convocatorias: " + IN_GetMaxConvocatorias());
  console.log("Max min jugados: " + IN_GetMaxMinJugados());
  console.log("Max titular: " + IN_GetMaxTitular());
  console.log("Max suplente: " + IN_GetMaxSuplente());

let option = {
  backgroundColor: '#333',
  title: {
    //text: 'Basic Radar Chart'
    text: ''
  },
  legend: {
    data: ['Oficial', 'No oficial']
  },
  radar: {
    shape: 'polygon',
    indicator: [
      { name: '% Partidos jugados', max: 100 }, // Percentaje of played matches
      { name: 'Amarillas', max:  max_amarillas_total}, // Get player with max n of amarillas
      { name: 'Rojas', max: max_rojas_total }, // Get player with max n of rojas
      { name: 'Goles', max: IN_GetMaxGoles() }, // Get player with max n of goals
      { name: 'Asistencias', max: IN_GetMaxAsistencias() }, //
      { name: 'Convocatorias', max: IN_GetMaxConvocatorias() }, //
      { name: 'Minutos jugados', max: IN_GetMaxMinJugados() }, //
      { name: 'Titular', max: IN_GetMaxTitular() }, //
      { name: 'Suplente', max: IN_GetMaxSuplente() }, //
    ]
  },
  series: [
    {
      name: 'Oficial vs No oficial',
      type: 'radar',
      data: [
        {
          value: [data.percentaje_pj, data.amarillas, data.rojas, data.gol, data.asi, data.convo, data.min, data.titu, data.sup],
          name: 'Oficial'
        },
        {
          value: [data.percentaje_pj_of, data.amarilla_of, data.rojas_of, data.gol_of, data.asi_of, data.convo_of, data.min_of, data.titu_of, data.sup_of],
          name: 'No oficial'
        }
      ]
    }
  ]
};


  chart.setOption(option);


  window.addEventListener('resize', chart.resize);

}

