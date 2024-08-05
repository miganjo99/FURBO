

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
  document.getElementById("player_localidad").innerHTML = data.localidad;
  document.getElementById("player_fecha_fich").innerHTML = "Fecha fichaje: " + data.fichaje_1;
  
  //if(data.fichaje_2){
  document.getElementById("player_fecha_fich_2").innerHTML = "Fecha fichaje 2: " + (data.fichaje_2 ? data.fichaje_2 : "Ninguna");
  //}
  /*else{
    document.getElementById("player_fecha_fich_2").innerHTML = "";
  }*/


  document.getElementById("player_fecha_nac").innerHTML = "Fecha nacimiento: " + data.fec_nac;
  document.getElementById("player_posicion").innerHTML = data.posicion;
  document.getElementById("player_fecha_sal").innerHTML = "Fecha salida 1: " + data.salida_1;
  document.getElementById("player_fecha_sal_2").innerHTML = "Fecha salida 2: " + (data.salida_2 ? data.salida_2 : "Ninguna");
  
  //document.getElementById("player_name").innerHTML = data.nombre_completo;

// Radar chart
  {

    
    let chart = echarts.init(document.getElementById("grafo_container"), 'dark',{
      renderer: 'svg',
      useDirtyRect: false
    });
    
    let max_amarillas_of = IN_GetMaxAmarillasOficial();
    let max_amarillas = IN_GetMaxAmarillasNo_Oficial();
    let max_amarillas_total = max_amarillas_of >= max_amarillas ? max_amarillas_of : max_amarillas;
    
    let max_rojas_of = IN_GetMaxRojasOficial();
    let max_rojas = IN_GetMaxRojasNo_Oficial();
    let max_rojas_total = max_rojas_of >= max_rojas ? max_rojas_of : max_rojas;
    
    console.log("Max goles: " + IN_GetMaxGoles() + " -> " + data.gol);
    console.log("Max asistencias: " + IN_GetMaxAsistencias() + " -> " + data.asi);
    console.log("Max amarillas total: " + max_amarillas_total + " -> " + data.amarillas);
    console.log("Max rojas total: " + max_rojas_total) + " -> " + data.rojas;


    
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
 
          { name: 'Goles', max: IN_GetMaxGoles() }, // Get player with max n of goals
          { name: 'Asistencias', max: IN_GetMaxAsistencias() }, //
          { name: 'Amarillas', max:  max_amarillas_total}, // Get player with max n of amarillas
          { name: 'Rojas', max: max_rojas_total }, // Get player with max n of rojas
          
        ]
      },
      series: [
        {
          name: 'Oficial vs No oficial',
          type: 'radar',
          data: [
            {
              value: [data.gol, data.asi, data.amarillas, data.rojas],
              name: 'Oficial'
            },
            {
              value: [data.gol_of, data.asi_of, data.amarilla_of, data.rojas_of],
              name: 'No oficial'
            }
          ]
        }
      ]
    };


    chart.setOption(option);


    window.addEventListener('resize', chart.resize);
  }

  // Waterfall chart (convocatorias)
  {
    let chart_waterfall = echarts.init(document.getElementById("player_grafo_convocatorias"), 'dark',{
      renderer: 'svg',
      useDirtyRect: false
    });

    option = {
      backgroundColor: '#333',
      title: {
        text: 'Convocatorias',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['Total', 'Oficial', 'Amistosos']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: [0, 0, data.convo_of]
          //data: [0, data.convo - data.convo_of, 0]
        },
        {
          name: 'Convocatorias',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'inside'
          },
          data: [data.convo, data.convo_of, data.convo - data.convo_of]
        }
      ]
    };

    chart_waterfall.setOption(option);
  }

  // Waterfall chart (partidos)
  {
    let chart_waterfall = echarts.init(document.getElementById("player_grafo_partidos"), 'dark',{
      renderer: 'svg',
      useDirtyRect: false
    });

    option = {
      backgroundColor: '#333',
      title: {
        text: 'Partidos',
        subtext: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params) {
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['Total', 'Oficial', 'Amistosos', 'No jugados']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: [0, 0, 0, 0]
          //data: [0, data.convo - data.convo_of, 0]
        },
        {
          name: 'Convocatorias',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'inside'
          },
          data: [data.convo, data.pj_of, data.pj - data.pj_of, data.convo - data.pj]
        }
      ]
    };

    chart_waterfall.setOption(option);
  }

  
}

