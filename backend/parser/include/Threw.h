#pragma once


namespace And{

  class Threw{
    public:

      
      Threw(const char* file_name, std::string file, std::string extension = ".and"){
        
        FILE *f;
        std::string name = std::string(file_name) + extension.c_str();
        f = fopen(name.c_str(), "w");

        if(f == NULL){
          printf("\n*** Error writing file ***\n");
          //return false;
        }else{
          printf("Writing file...");
          fwrite(file.c_str(), file.size() , 1, f);
          fclose(f);
        }
      }

      Threw(const Threw&) = delete;
      Threw(Threw&&) = delete;
      ~Threw(){}


    private:

  };


};