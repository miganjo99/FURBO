#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>

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

    return (value == "true" || value == "false" || value == "True" || value == "False");
}


bool checkInt(std::string& value){

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

void tmp_func(std::string value){

    printf("%s ",value.c_str());
    if(CheckBool(value)){
        printf("Es BOOL\n");
    }else{
        printf("No es BOOL\n");
    }
}


int main(int argc, char** argv) {
    // Archivos de entrada y salida
    printf("Penne\n");
    if(argc > 1){

        std::string inputFilePath = "../assets/" + std::string(argv[1]) + ".csv";
        std::string outputFilePath = "../assets/" + std::string(argv[1]) +"_parsed.csv";

        printf("Input file [%s]\n Output file[%s]\n", inputFilePath.c_str(), outputFilePath.c_str());

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
        printf("%s\n", line.c_str());

        GetLineDividedBySingleWord(line, columnas);
       

        printf("Lines separated:\n");
        for(std::string v : columnas){
            printf("%s\n", v.c_str());
        }


        // Ya tengo las columnas, ahora el valor
        while(std::getline(inputFile, line)){
            std::vector<std::string> values;
            GetLineDividedBySingleWord(line, values, false);

            //printf(values[0].c_str());

        }


       


        std::string value_1 = "true";
        std::string value_2 = "false";
        std::string value_3 = "True";
        std::string value_4 = "False";
        std::string value_5 = " true";
        std::string value_6 = " false";
        std::string value_7 = " f a l s e";

        tmp_func(value_1);
        tmp_func(value_2);
        tmp_func(value_3);
        tmp_func(value_4);
        tmp_func(value_5);
        tmp_func(value_6);
        tmp_func(value_7);

        
        

        // Vector para almacenar los datos procesados
        /*std::vector<Data> allData;

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

        printf("File writed succesfully!");*/
    }else{
        printf("Requerido nombre del archivo csv\n");
    }

    return 0;
}
