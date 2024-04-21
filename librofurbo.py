import csv
import json

# Nombre del archivo CSV de entrada y JSON de salida
archivo_csv = 'Libro1.csv'
archivo_json = 'Libro1.json'

# Lista para almacenar los datos del CSV
datos = []

# Abrir el archivo CSV y leer sus contenidos
with open(archivo_csv, 'r') as csv_file:
    # Crear un lector CSV
    csv_reader = csv.DictReader(csv_file)
    # Recorrer las filas del CSV y agregarlas a la lista de datos
    for fila in csv_reader:
        datos.append(fila)

# Escribir los datos en un archivo JSON
with open(archivo_json, 'w') as json_file:
    # Escribir los datos en el archivo JSON
    json.dump(datos, json_file, indent=4)

print("Archivo JSON generado exitosamente.")
