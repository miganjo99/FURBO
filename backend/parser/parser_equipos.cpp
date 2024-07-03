#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>

#include <stdio.h>


#include "include/Threw.h"

// Estructura para almacenar los datos de cada línea del CSV
struct Data {
    std::string temporada;
    std::string jornada;
    std::string rival;
    std::string dia;
    std::string hora;
    std::string local_visitante;
    std::string campo;
    std::string tipo_partido;
    std::string categoria;
    std::string dinamica;
    std::string min_ganando;
    std::string min_perdiendo;
    std::string min_empatando;
    std::string resultado;
    std::string goles_favor_casa;
    std::string goles_contra_casa;
    std::string goles_contra_fuera;
    std::string goles_favor_fuera;
    std::string primera_parte;
    std::string segunda_parte;
    std::string se_remonta;
    std::string nos_remontan;
    std::string observaciones;
    std::string media_edad;
    std::string partido;
    std::string dia_semana;
    std::string oficial;
    std::string arbitro;
    std::string asistente_1;
    std::string asistente_2;
};

// Función para reemplazar los delimitadores en el archivo CSV
void ReplaceDelimiters(const std::string& inputFilePath, const std::string& outputFilePath) {
    std::ifstream inputFile(inputFilePath);
    std::ofstream outputFile(outputFilePath);

    if (!inputFile.is_open()) {
        std::cerr << "No se pudo abrir el archivo de entrada: " << inputFilePath << std::endl;
        return;
    }
    if (!outputFile.is_open()) {
        std::cerr << "No se pudo abrir el archivo de salida: " << outputFilePath << std::endl;
        inputFile.close();
        return;
    }

    std::string line;
    bool insideQuotes = false;

    while (std::getline(inputFile, line)) {
        std::string modifiedLine;

        for (char ch : line) {
            if (ch == '\"') {
                insideQuotes = !insideQuotes;
            } else if (ch == ',' && !insideQuotes) {
                modifiedLine += ';'; // Reemplazar ',' por ';'
            } else {
                modifiedLine += ch;
            }
        }
        outputFile << modifiedLine << '\n';
    }

    inputFile.close();
    outputFile.close();
}

// Función para procesar una línea del CSV y convertirla en una estructura de datos
Data ProcessLine(const std::string& line) {
    std::istringstream ss(line);
    std::string column;
    Data data;

    int index = 0;
    while (std::getline(ss, column, ';')) {
        // Aquí podrías aplicar limpieza adicional si es necesario
        std::string sanitizedValue = column.empty() ? "null" : column;
        
        // Asignar cada valor al campo correspondiente en la estructura Data
        switch(index) {
            case 0:  data.temporada = sanitizedValue; break;
            case 1:  data.jornada = sanitizedValue; break;
            case 2:  data.rival = sanitizedValue; break;
            case 3:  data.dia = sanitizedValue; break;
            case 4:  data.hora = sanitizedValue; break;
            case 5:  data.local_visitante = sanitizedValue; break;
            case 6:  data.campo = sanitizedValue; break;
            case 7:  data.tipo_partido = sanitizedValue; break;
            case 8:  data.categoria = sanitizedValue; break;
            case 9:  data.dinamica = sanitizedValue; break;
            case 10: data.min_ganando = sanitizedValue; break;
            case 11: data.min_perdiendo = sanitizedValue; break;
            case 12: data.min_empatando = sanitizedValue; break;
            case 13: data.resultado = sanitizedValue; break;
            case 14: data.goles_favor_casa = sanitizedValue; break;
            case 15: data.goles_contra_casa = sanitizedValue; break;
            case 16: data.goles_contra_fuera = sanitizedValue; break;
            case 17: data.goles_favor_fuera = sanitizedValue; break;
            case 18: data.primera_parte = sanitizedValue; break;
            case 19: data.segunda_parte = sanitizedValue; break;
            case 20: data.se_remonta = sanitizedValue; break;
            case 21: data.nos_remontan = sanitizedValue; break;
            case 22: data.observaciones = sanitizedValue; break;
            case 23: data.media_edad = sanitizedValue; break;
            case 24: data.partido = sanitizedValue; break;
            case 25: data.dia_semana = sanitizedValue; break;
            case 26: data.oficial = sanitizedValue; break;
            case 27: data.arbitro = sanitizedValue; break;
            case 28: data.asistente_1 = sanitizedValue; break;
            case 29: data.asistente_2 = sanitizedValue; break;
            default: std::cerr << "Índice no válido" << std::endl; break;
        }

        index++;
    }

    return data;
}

// Función para crear el JSON final
void CreateJSON(const std::vector<Data>& data, std::string& output) {


    std::string jornada_prefix = "J";
    std::string jornada_prefix_2 = "Semifinales";
    std::string jornada_prefix_3 = "Cuartos";
    std::string jornada_prefix_4 = "Octavos";


    output = "const data_teams = [\n";

    for (const auto& value : data) {
        output += "{\n";
        output += "\"temporada\": \"" + value.temporada + "\",\n";
        output += "\"jornada\": ";
        
         //+ value.jornada + "\",\n";

        if (value.jornada.substr(0, jornada_prefix.size()) == jornada_prefix) {
            // Eliminar el prefijo 'J' y convertir el resto a un número entero
            output += std::to_string(std::stoul(value.jornada.substr(jornada_prefix.size())));
        } else if (value.jornada.find('/') != std::string::npos ||
                value.jornada.substr(0, jornada_prefix_2.size()) == jornada_prefix_2 ||
                value.jornada.substr(0, jornada_prefix_3.size()) == jornada_prefix_3 ||
                value.jornada.substr(0, jornada_prefix_4.size()) == jornada_prefix_4) {

            // Casos especiales como 1/64 o Semifinales, Cuartos, Octavos
            output += "\"" + value.jornada + "\"";
        } else {
            // Convertir a número entero si es posible
            output += std::to_string(std::stoul(value.jornada));
        }

        output += ",\n";


        output += "\"rival\": \"" + value.rival + "\",\n";
        output += "\"dia\": \"" + value.dia + "\",\n";
        output += "\"hora\": \"" + value.hora + "\",\n";
        output += "\"local_visitante\": \"" + value.local_visitante + "\",\n";
        output += "\"campo\": \"" + value.campo + "\",\n";
        output += "\"tipo_partido\": \"" + value.tipo_partido + "\",\n";
        output += "\"categoria\": \"" + value.categoria + "\",\n";
        output += "\"dinamica\": \"" + value.dinamica + "\",\n";
        output += "\"min_ganando\": " + value.min_ganando + ",\n";
        output += "\"min_perdiendo\": " + value.min_perdiendo + ",\n";
        output += "\"min_empatando\": " + value.min_empatando + ",\n";
        output += "\"resultado\": \"" + value.resultado + "\",\n";
        output += "\"goles_favor_casa\": " + value.goles_favor_casa + ",\n";
        output += "\"goles_contra_casa\": " + value.goles_contra_casa + ",\n";
        output += "\"goles_contra_fuera\": " + value.goles_contra_fuera + ",\n";
        output += "\"goles_favor_fuera\": " + value.goles_favor_fuera + ",\n";
        output += "\"primera_parte\": \"" + value.primera_parte + "\",\n";
        output += "\"segunda_parte\": \"" + value.segunda_parte + "\",\n";
        output += "\"se_remonta\": \"" + value.se_remonta + "\",\n";
        output += "\"nos_remontan\": \"" + value.nos_remontan + "\",\n";
        output += "\"observaciones\": \"" + value.observaciones + "\",\n";
        output += "\"media_edad\": " + value.media_edad + ",\n";
        output += "\"partido\": " + value.partido + ",\n";
        output += "\"dia_semana\": \"" + value.dia_semana + "\",\n";
        output += "\"oficial\": \"" + value.oficial + "\",\n";
        output += "\"arbitro\": \"" + value.arbitro + "\",\n";
        output += "\"asistente_1\": \"" + value.asistente_1 + "\",\n";
        output += "\"asistente_2\": \"" + value.asistente_2 + "\"\n";
        output += "},\n";
    }

    // Eliminar la última coma
    if (!data.empty()) {
        output.pop_back(); // Elimina la última coma
    }

    output += "\n];\n";
}

int main() {
    // Archivos de entrada y salida
    std::string inputFilePath = "../assets/equipos.csv";
    std::string outputFilePath = "../assets/equipos_parsed.csv";

    // Reemplazar delimitadores en el archivo CSV
    ReplaceDelimiters(inputFilePath, outputFilePath);

    // Leer el archivo procesado
    std::ifstream inputFile(outputFilePath);
    if (!inputFile.is_open()) {
        std::cerr << "No se pudo abrir el archivo de entrada: " << outputFilePath << std::endl;
        return 1;
    }

    // Vector para almacenar los datos procesados
    std::vector<Data> allData;

    std::string line;
    std::getline(inputFile, line); // Ignorar la primera línea (cabecera)

    // Procesar cada línea del archivo CSV y almacenar en allData
    while (std::getline(inputFile, line)) {
        Data data = ProcessLine(line);
        allData.push_back(data);
    }

    inputFile.close();

    // Generar el JSON
    std::string jsonOutput;
    CreateJSON(allData, jsonOutput);

    // Imprimir el JSON generado
    //std::cout << "JSON generado:\n" << jsonOutput << std::endl;

    printf("JSON completed!\n");
    
    printf("Writing file...\n");
    And::Threw t{"output_equipos", jsonOutput, ".js"};

    printf("File writed succesfully!");

    return 0;
}
