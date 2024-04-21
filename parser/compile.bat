cl /Iinclude /Foobj\ /c src\Slurp.cpp
cl /Iinclude /Foobj\ /Fe"bin\parser.exe" /c parser.cpp
cl /Fe"bin\parser.exe" obj\Slurp.obj obj\parser.obj
