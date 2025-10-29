# Archivo donde especifique la instalacion de librerias 
# y configuraciones a la hora de crear mis contenedores personalizados.
# 1. Partimos de una imagen de docker con apache instalado.
# FROM ubuntu + instalacion personal de Apache.
# Esta imagen de contenedor (HTTPD):
    # ya tiene apache instalado, configurado y arracado.
FROM httpd:2.4 
RUN apt update
RUN apt install nano
# Debemos consultar el docker hub de ese contenedor/imagen para ver variables de entorno,
# directorio de trabajo, etc.
# Directorio de trabajo dentro del contenedor.
WORKDIR /usr/local/apache2/htdocs
COPY ../src .
EXPOSE 80