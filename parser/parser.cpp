#include <stdio.h>
#include <string>
#include <vector>

#include "include/Slurp.h"
#include "include/Threw.h"


#define NUM_COLUMNS 21

enum class LocalVisitante{
    Local = 1,
    Visitante = 2,
    None = 3,
};

enum class Dinamica{
    Empatado = 1,
    Perdido = 0,
    Ganado = 2
};

struct Data{
    std::string jugador_name;
    std::string temporada;
    //unsigned int jornada;
    std::string jornada;
    std::string rival_name;
    std::string fecha;
    LocalVisitante l_c;
    std::string campo_name;
    std::string tipo_partido; // Amistoso o nose que
    //unsigned int categoria;
    std::string categoria;
    Dinamica dinamica;
    bool titular;
    bool suplente;
    unsigned int minutos_jugados;
    unsigned int amarilla;
    unsigned int roja;
    unsigned int goles;
    bool gol_victoria;
    unsigned int asistencias;
    std::string fecha_nacimiento;
    float edad;
    unsigned int num_partidos;

};

void SaveColumValue(Data& data, std::string& value, unsigned int index){
    //printf("Index %u\n", index);

    //if(index == 2){
        //printf("Casteando\n");
        //unsigned int value_u;
        //unsigned long value_ul;
        //printf("Antes del stoul\n");
        //std::stoul(value);
        
        //printf("Despues del stoul\n");
        //value_ul = 
        //printf("casteado");
    //}
    switch(index){
        case 0: data.jugador_name = value.c_str();break;
        case 1: data.temporada = value.c_str();break;
        //case 2: data.jornada = std::stoul(value);break;
        case 2: data.jornada = value.c_str();break;
        case 3: data.rival_name = value.c_str();break;
        case 4: data.fecha = value.c_str();break;
        case 5: data.l_c = value.c_str() == "Visitante" ? LocalVisitante::Visitante:LocalVisitante::Local;break;
        case 6: data.campo_name = value.c_str();break;
        case 7: data.tipo_partido = value.c_str();break;
        case 8: data.categoria = value.c_str();break;
        case 9: if(value.c_str() == "Empatado"){data.dinamica = Dinamica::Empatado;}if(value.c_str() == "Ganado"){data.dinamica = Dinamica::Ganado;}if(value.c_str() == "Perdido"){data.dinamica = Dinamica::Perdido;};break;
        case 10: data.titular = value.c_str()=="Si"?true:false;break;
        case 11: data.suplente = value.c_str()=="Si"?true:false;break;
        case 12: data.minutos_jugados = std::stoul(value.c_str());break;
        case 13: data.amarilla = std::stoul(value.c_str());break;
        case 14: data.roja = std::stoul(value.c_str());break;
        case 15: data.goles = std::stoul(value.c_str());break;
        case 16: data.gol_victoria = value.c_str() == "Si"?true:false;break;
        case 17: data.asistencias = std::stoul(value.c_str());break;
        case 18: data.fecha_nacimiento = value.c_str();break;
        case 19: data.edad = std::stof(value.c_str());break;
        case 20: data.num_partidos= std::stoul(value.c_str());break;
    }

}

Data ProcessLine(std::string line, bool verbosity = false){
    unsigned int index = 0;
    bool all_columns = false;
    std::size_t last_pos = 0;
    Data data;
    while(!all_columns){
    
        // Encuentrame ; a partir de last_pos
        std::size_t separation = line.find(';', last_pos);
        if(separation != std::string::npos){
            // Encontrada separacion
            std::string column_name = line.substr(last_pos, separation - last_pos);
            if(verbosity)printf("%s - ", column_name.c_str());
            last_pos = separation + 1;
            SaveColumValue(data, column_name,index);
            index++;

        }else{
            // Todas las columnas encontradas
            //printf("Ultima");
            separation = line.find("\n", last_pos);
            std::string column_name = line.substr(last_pos, separation - last_pos);
            if(verbosity)printf("%s ;\n", column_name.c_str());
            SaveColumValue(data, column_name,index);
            all_columns = true;
        }
        
    }

    return data;
}

int main(int argc, char** argv){

    And::Slurp slurp{"assets/data.csv"};

    char* data = slurp.data();
    std::string data_s = std::string(data);
    //printf("Data:\n%s",data_s.c_str());
    
    // Guardamos linea por linea en formato string
    std::vector<std::string> lines;
    std::size_t pos = 0;
    printf("Saving each line...\n");
    while ((pos = data_s.find("\n", pos)) != std::string::npos) {
        std::string line = data_s.substr(0, pos);
        lines.push_back(line);
        data_s.erase(0, pos + 1);
        pos = 0;
    }


    std::string columns = lines.front();
    lines.erase(lines.begin());

    // Procesamos cada linea y la guardamos en la struct Data
    printf("Procesing each line...\n");
    std::vector<Data> all_data_processed;
    for(auto& line : lines ){
        Data line_processed = ProcessLine(line);
        all_data_processed.push_back(line_processed);
    }

    printf("*** All lines pocessed ***\n");

    
    printf("\n *** Nombres de jugadores: ***\n");
    for(auto& data : all_data_processed){
        printf("%s\n",data.jugador_name.c_str());
    }


    return 0;
}