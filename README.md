# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Acerca del proyecto

Este proyecto tiene como finalidad proporcionar una SPA, para que el usuario que se conecte a ella pueda administrar las empresas y empleados, requeridos en la prueba tecnica de QUEO


## Requisitos previos
- Es necesario que tenga instalado npm en su equipo, asi como Angular CLI, sino los tiene puede consultar la documentacion oficial para realizar esta instalacion. (NPM - https://nodejs.org/es/download/) y (Angula Cli - https://angular.io/cli)

## Como realizar la instalación local

Para ejecutar el proyecto en su entorno local lleve a cabo los siguientes pasos:

- Ubiquese en el directorio local donde quiere hacer la instalación
- Desde una terminal ejecute el comando git clone https://github.com/jame0928/queo_frontend.git
- una vez descargado el respositorio, ejecute el comando npm install, para descargar todas las dependencias necesarias.
- A continuación, abra el archivo environments/environments.ts y en la variable backendUrl, asigne la url del servidor donde tiene corriendo el proyecto del backend, por ejemplo backendUrl: 'http://localhost:8000/api/v1'
- Inicie su servidor con el comando npm start
- En su navegador abra la url http://localhost:4200, y ya deberia poder ver el proyecto en funcionamiento.
