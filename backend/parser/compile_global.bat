cl /Iinclude /Foobj\ /c src\Slurp.cpp
cl /Iinclude /Foobj\ /Fe"bin\parser_global.exe" /c parser_global.cpp
cl /Fe"bin\parser_global.exe" obj\Slurp.obj obj\parser_global.obj

pause