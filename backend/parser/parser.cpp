#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <algorithm>
#include <cctype>
#include <stdio.h>


#include "include/Threw.h"

static char numbers[10] = {'0','1','2','3','4','5','6','7','8','9'};

static char rare_characters[27] = {
    '/', ' ', '*', '!', '?', '¿', '¡', '@', '·', '#', '$', '~', '¬', '=', '|',
    'ª', 'º', '\\', '<', '>', '-', ':', '}', '{', '[', ']', '┬'
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


bool CheckCharacter(char c){
    
    bool correct_value = true;

    for(char symbol : rare_characters){
        if(c == symbol){
            correct_value = false;
            return correct_value;
        }
    }

    return correct_value;
}

// This function recives a line divided by ; and returns vector of each word inside ;
void GetLineDividedBySingleWord(std::string line, std::vector<std::string>& all_words, bool check_char = true){
    std::string column_value = "";
    for(char c : line){

        
        // Si el caracter es ; lo añado al vector y reseteo el string
        if(c == ';'){
            all_words.push_back(column_value);
            column_value = "";
        }else{


            // Si hay un caracter raro, lo cambio por _ y au
            if(check_char){
                if(CheckCharacter(c)){
                    column_value += c; 
                }else{
                    column_value += "_";
                }
            }else{
                column_value += c; 
            }
        }
    }
    all_words.push_back(column_value);
}

bool CheckIfNum(char c){

    bool is_num = false;
    for(char num : numbers){
        if(num == c){
            is_num = true;
        }
    }

    return is_num;
}
bool CheckSign(char c){
    return c == '+' || c == '-';
}



bool CheckFloat(std::string& value){

    if(value.empty())return false;

    bool first_letter = true;
    bool first_num = true;
    bool is_float = true;
    
    for(char& c : value){

        // Si en algun momento detecto algo raro, ya no es un float
        if(is_float){

            if(first_letter){
                // Primera letra, comprobamos si es un numero, si no lo es, comprobamos que tenga el signo, si tampoco tiene, no es un float
                bool is_num = CheckIfNum(c);
                

                // Si no es un num, comprobar si tiene signo
                if(!is_num){
                    is_float = CheckSign(c);
                }
                first_letter = false;
            }else{

                //Comprobar que lo demas sean letras o . ,

                if(first_num){
                    // Es el primer num, no puede ser un . o ,
                    is_float = CheckIfNum(c);
                    first_num = false;
                }else{
                    
                    // No es el primer num, puede ser un num o (.,)
                    if(!CheckIfNum(c)){

                        // Si no es un num, tiene que ser un ., o a la calle
                        if(c == ','){
                            
                            // Es un float separado por , sigue siendo float pero ya que estoy lo cambio por un .
                            c = '.';
                        }else if(c != '.'){
                            // No era una , y ahora tampoco es un . pues a tomar por culo
                            is_float = false;
                        }
                    }
                }

            }


        }
    }

    return is_float;
}

bool CheckBool(std::string& value){

    if(value.empty())return false;

    if(value == "True")value = "true";
    if(value == "False")value = "false";
    
    return (value == "true" || value == "false" || value == "True" || value == "False");

}


bool CheckInt(std::string& value){

    if(value.empty())return false;

    bool first_letter = true;
    bool first_num = true;
    bool is_int = true;
    
    for(char& c : value){

        // Si en algun momento detecto algo raro, ya no es un float
        if(is_int){

            if(first_letter){
                // Primera letra, comprobamos si es un numero, si no lo es, comprobamos que tenga el signo, si tampoco tiene, no es un float
                bool is_num = CheckIfNum(c);
                

                // Si no es un num, comprobar si tiene signo
                if(!is_num){
                    is_int = CheckSign(c);
                }
                first_letter = false;
            }else{

                //Comprobar que lo demas sean letras o . ,

                if(first_num){
                    // Es el primer num, no puede ser un . o ,
                    is_int = CheckIfNum(c);
                    first_num = false;
                }else{
                    
                    // No es el primer num, puede ser un num o (.,)
                    is_int = CheckIfNum(c);
                }

            }


        }
    }

    return is_int;

}

std::string toLowerCase(const std::string& str) {
    std::string lowerStr = str;
    std::transform(lowerStr.begin(), lowerStr.end(), lowerStr.begin(), [](unsigned char c) {
        return std::tolower(c);
    });
    return lowerStr;
}

bool CreateJSON(const std::vector<std::string>& columnas, std::vector<std::string>& filas, std::string& output){
    if(columnas.size() != filas.size()) return false;

    bool is_null = false;
    output += "\n{\n";

    for(int i = 0; i < columnas.size(); i++){
        output += "\"" + toLowerCase(columnas[i]) + "\" : ";


        if(CheckFloat(filas[i])){
            output += filas[i];
        }else if(CheckInt(filas[i])){
            output += filas[i];
        }else if(CheckBool(filas[i])){
            output += filas[i];
        }else{
            if(filas[i].empty()){ 
                output += "null";
            }else{
                output += "\"" + filas[i] + "\"";
            }
        }

        output += ",\n";
    }

    output.pop_back();
    output += "\n},";
    return true;
}


int main(int argc, char** argv) {
    // Archivos de entrada y salida

    if(argc > 1){

        std::string inputFilePath = "../assets/" + std::string(argv[1]) + ".csv";
        std::string outputFilePath = "../assets/" + std::string(argv[1]) +"_parsed.csv";

        printf("Input file [%s]\nOutput file[%s]\n", inputFilePath.c_str(), outputFilePath.c_str());

        // Reemplazar delimitadores en el archivo CSV
        ReplaceDelimiters(inputFilePath, outputFilePath);

        // Leer el archivo procesado
        std::ifstream inputFile(outputFilePath);
        if (!inputFile.is_open()) {
            std::cerr << "No se pudo abrir el archivo de entrada: " << outputFilePath << std::endl;
            return 1;
        }


        // Get columnas
        std::vector<std::string> columnas;

        std::string line;
        std::getline(inputFile, line);

        GetLineDividedBySingleWord(line, columnas);

        std::string output_json = "const data_" + std::string(argv[1]) + " = [";

        // Ya tengo las columnas, ahora el valor
        while(std::getline(inputFile, line)){
            std::vector<std::string> values;
            GetLineDividedBySingleWord(line, values, false);
            
            // Printear el json aqui, tengo las columnas y aqui itero cada uno de los datos
            if(!CreateJSON(columnas, values, output_json)){
                printf("\n ***** Algo no ha salido como se esperaba... *****\n");
            }
        }

        // Quitamos la coma
        output_json.pop_back();
        output_json += "\n]"; 

        printf("JSON completed!\n");
        
        printf("Writing file...\n");
        And::Threw t{argv[1], output_json, ".js"};
        printf("File writed succesfully!");

        
    }else{
        printf("\nRequerido nombre del archivo csv\n");
    }

    return 0;
}
