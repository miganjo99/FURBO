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
    //Dinamica dinamica;
    std::string dinamica;
    bool titular;
    bool suplente;
    int minutos_jugados;
    int amarilla;
    int roja;
    int goles;
    bool gol_victoria;
    int asistencias;
    std::string fecha_nacimiento;
    float edad;
    int num_partidos;

};

void SaveColumValue(Data& data, std::string& value, unsigned int index){

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
        //case 9: if(value.c_str() == "Empatado"){data.dinamica = Dinamica::Empatado;}if(value.c_str() == "Ganado"){data.dinamica = Dinamica::Ganado;}if(value.c_str() == "Perdido"){data.dinamica = Dinamica::Perdido;};break;
        case 9: data.dinamica = value.c_str();break;
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


void ProcessLineColum(std::string line, std::vector<std::string>& data, bool verbosity = false){
    unsigned int index = 0;
    bool all_columns = false;
    std::size_t last_pos = 0;
    while(!all_columns){
    
        // Encuentrame ; a partir de last_pos
        std::size_t separation = line.find(';', last_pos);
        if(separation != std::string::npos){
            // Encontrada separacion
            std::string column_name = line.substr(last_pos, separation - last_pos);
            if(verbosity)printf("%s - \n", column_name.c_str());
            last_pos = separation + 1;
            //printf("%s\n", column_name.c_str());
            data.push_back(column_name);
            index++;

        }else{
            // Todas las columnas encontradas
            //printf("Ultima: \n");
            //separation = line.find("\n", last_pos);
            std::string column_name = line.substr(last_pos, line.size() - last_pos - 1);
            if(verbosity)printf("%s FIN\n", column_name.c_str());
            data.push_back(column_name);
            all_columns = true;
        }
        
    }


}

void CreateJSON(std::vector<std::string> colum_names, std::vector<Data> data, std::string& output){

    output = "[";

    unsigned int index = 0;

    for(Data& value : data){
        //Data& value = data[2984];
        output = output + "\n";
        output = output + "{\n";

        output += "\"jugador_name\" : \"";
        output += value.jugador_name.c_str();
        output += "\",\n";

        output += "\"temporada\" : \"";
        output += value.temporada.c_str();
        output += "\",\n";
        
        output += "\"jornada\" : \"";
        output += value.jornada.c_str();
        output += "\",\n";
        
        output += "\"rival_name\" : \"";
        output += value.rival_name.c_str();
        output += "\",\n";

        output += "\"fecha\" : \"";
        output += value.fecha.c_str();
        output += "\",\n";

        output += "\"local_visitante\" : \"";
        output += value.rival_name.c_str();
        output += "\",\n";

        output += "\"campo_name\" : \"";
        output += value.campo_name.c_str();
        output += "\",\n";

        output += "\"tipo_partido\" : \"";
        output += value.tipo_partido.c_str();
        output += "\",\n";

        output += "\"categoria\" : \"";
        output += value.categoria.c_str();
        output += "\",\n";

        output += "\"dinamica\" : \"";
        std::string tmp;
       
        /*switch (value.dinamica){
            case Dinamica::Perdido: tmp = "Perdido";break;
            case Dinamica::Ganado: tmp = "Ganado";break;
            case Dinamica::Empatado: tmp = "Empatado";break;
        }
        output += tmp.c_str();
        */
        output += value.dinamica.c_str();
        output += "\",\n";

        output += "\"titular\" : \"";
        value.titular?tmp="true":tmp="false";
        output += tmp.c_str();
        output += "\",\n";

        output += "\"suplente\" : \"";
        value.suplente?tmp="true":tmp="false";
        output += tmp.c_str();
        output += "\",\n";

        output += "\"minutos_jugados\" : \"";
        output += std::to_string(value.minutos_jugados);
        output += "\",\n";
        
        output += "\"amarilla\" : \"";
        output += std::to_string(value.amarilla);
        output += "\",\n";
        
        output += "\"roja\" : \"";
        output += std::to_string(value.roja);
        output += "\",\n";
        
        output += "\"goles\" : \"";
        output += std::to_string(value.goles);
        output += "\",\n";
       
        output += "\"gol_victoria\" : \"";
        tmp = value.gol_victoria?"true":"false";
        output += tmp.c_str();
        output += "\",\n";

        output += "\"asistencias\" : \"";
        output += std::to_string(value.asistencias);
        output += "\",\n";

        output += "\"fecha_nacimiento\" : \"";
        output += value.fecha_nacimiento.c_str();
        output += "\",\n";
        
        output += "\"edad\" : \"";
        output += std::to_string(value.edad);
        output += "\",\n";
        
        output += "\"num_partidos\" : \"";
        output += std::to_string(value.edad);
        output += "\"\n";

        output = output + "},";
    }

    // Borrar ultimo elemento de la string
    output.pop_back();


    output += "\n]";
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
        //printf("Line-> %s\n", line.c_str());
        lines.push_back(line);
        data_s.erase(0, pos + 1);
        pos = 0;
    }


    std::string columns = lines.front();
    //printf("Column names-> %s\n", columns.c_str());
    lines.erase(lines.begin());
    std::vector<std::string> column_names;
    ProcessLineColum(columns, column_names);
  
    
    // Procesamos cada linea y la guardamos en la struct Data
    printf("Procesing each line...\n");
    std::vector<Data> all_data_processed;
    for(auto& line : lines ){
        Data line_processed = ProcessLine(line);
        all_data_processed.push_back(line_processed);
    }

    printf("*** All lines pocessed ***\n");


    std::string output;
    CreateJSON(column_names, all_data_processed, output);

    printf("Json completed:\n");
    //printf("%s \n", output);

    And::Threw t{"output", output, ".json"};
    
    return 0;
}
