# PRINCIPIOS Y RESTRICCIONES API REST
Imagina que la arquitectura REST es como un conjunto de reglas y principios para construir y organizar servicios web de una manera eficiente y ordenada.

**1. Cada cosa tiene su nombre:**
   - En REST, cada pedazo de información o servicio tiene una especie de tarjeta de identificación única llamada URI. Es como la matrícula de un coche, pero para datos en la web.

**2. No guardamos secretos:**
   - Cuando le pides algo al servidor web, debes contarle todo lo que necesita saber para hacer lo que le estás pidiendo. No guarda memoria de lo que le has dicho antes, cada vez es como si empezaras desde cero.

**3. Como el caché de tu navegador:**
   - Imagina que puedes guardar una copia de la información que obtienes del servidor para no tener que pedírsela cada vez. Eso es la caché, algo así como cuando tu navegador guarda imágenes para que las páginas carguen más rápido.

**4. El juego de dos equipos:**
   - REST separa las funciones entre el cliente (tú) y el servidor (el lugar donde está la información). Ambos equipos pueden evolucionar y cambiar sin depender demasiado el uno del otro.

**5. Nada de chismes entre jugadas:**
   - Cada vez que le hablas al servidor, le hablas desde cero, como si no te conociera. No guarda ninguna información tuya entre conversaciones.

**6. Descarga de aplicaciones (si quieres):**
   - En algunos casos, puedes enviarle al servidor una especie de "aplicación" pequeña para que la ejecute. Pero esto no es obligatorio, es como si eligieras enviarle un mensajito especial para que haga algo extra.

Estos principios ayudan a que la comunicación entre los servicios web sea clara, eficiente y ordenada. Es como tener reglas simples para que todos puedan entenderse y trabajar juntos sin complicaciones.