# proyecto 

### **Weather App**

### **Descripción del Proyecto**
La **Weather App** es una aplicación diseñada para proporcionar información meteorológica actualizada y precisa a los usuarios. A través de una interfaz intuitiva y amigable, la app ofrecerá datos sobre la temperatura, humedad, pronóstico a corto y largo plazo, y alertas meteorológicas para diversas ubicaciones en todo el mundo. Utilizando **WeatherAPI** para obtener datos meteorológicos en tiempo real, la aplicación se asegurará de que los usuarios tengan acceso a información relevante sobre el clima en su área y en cualquier otro lugar que deseen consultar.

## Características Principales

- Interfaz de Usuario Intuitiva
- Datos en Tiempo Real
- Búsqueda de Ubicaciones
- Pronóstico Extendido
- Alertas Personalizables
- Información Histórica
- Compatibilidad Multiplataforma
- Sostenibilidad

# Como utilizar este proyecto

Para poder utilizar este proyecto, sigue los siguientes pasos:

1. **Instalar dependencias**: 
   Instala todas las dependencias requeridas ejecutando el siguiente comando en la terminal:

   ```bash
   npm i
   ```

   Este comando instalará todas las dependencias listadas en el archivo `package.json`.

3. **Colocar credenciales en el archivo .env**
    Las credenciales se encuentran en el archivo template, debe copiar y pegarlas en un archivo .env.

4. **Ejecutar el proyecto**:
   Después de instalar las dependencias, inicia el proyecto con el siguiente comando:

   ```bash
   npm run dev
   ```

   Esto ejecutará el servidor y el entorno de desarrollo, iniciando el programa.

5. **Acceder a la aplicación**:
   Una vez que el programa esté en ejecución, dirígete al enlace proporcionado por Vite en la terminal para visualizar la aplicación en tu navegador. Normalmente, este enlace será algo similar a:

   ```bash
    http://localhost:5173/
   ```
# Uso del api

## Obtener información del clima actual

**Method** : `GET`

**URL** : `http://api.weatherapi.com/v1/current.json`

**Auth required** : `True`

**URL Query** : `?key=[API Key]&q=Floridablanca&lang=es`

**Success Responses**

**Code** : `200 OK`



## Obtener pronostico del clima

**Method** : `GET`

**URL** : `http://api.weatherapi.com/v1/forecast.json`

**Auth required** : `True`

**URL Query** : `?key=[API Key]&q=Floridablanca&lang=es&days=14`

**Success Responses**

**Code** : `200 OK`



## Obtener el clima en un día específico 

**Method** : `GET`

**URL** : `http://api.weatherapi.com/v1/forecast.json`

**Auth required** : `True`

**URL Query** : `?key=[API Key]&q=Floridablanca&lang=es&dt=2024-10-01`

**Success Responses**

**Code** : `200 OK`