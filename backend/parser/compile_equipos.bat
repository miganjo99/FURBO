cl /Iinclude /Foobj\ /c src\Slurp.cpp
cl /Iinclude /Foobj\ /Fe"bin\parser_equipos.exe" /c parser_equipos.cpp
cl /Fe"bin\parser_equipos.exe" obj\Slurp.obj obj\parser_equipos.obj

pause