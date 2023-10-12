#ROUTER
El router en Express.js se utiliza para organizar y gestionar las rutas de una aplicación web. Te permite dividir tu aplicación en rutas más pequeñas y manejables, lo que facilita el enrutamiento de solicitudes HTTP a funciones controladoras específicas.

1. **Organización de rutas:** Cuando tu aplicación web tiene muchas rutas, puede volverse difícil de mantener si las defines todas en un solo lugar. El uso de un router te permite organizar tus rutas en grupos lógicos o módulos, lo que hace que tu código sea más claro y mantenible.

2. **Mantenimiento:** Los routers facilitan la adición o modificación de rutas sin tener que tocar el archivo principal de la aplicación. Esto es especialmente útil en aplicaciones más grandes, donde diferentes desarrolladores pueden trabajar en rutas diferentes sin interferir con el código de los demás.

3. **Reutilización de código:** Puedes reutilizar un mismo router en múltiples aplicaciones Express o en diferentes partes de la misma aplicación. Esto es útil cuando tienes módulos o funcionalidades que se pueden compartir entre varias partes de tu aplicación.

4. **Middleware específico:** Puedes aplicar middleware específico a un router en lugar de a toda la aplicación. Esto te permite definir middleware que afecta solo a un grupo de rutas en lugar de afectar a todas las rutas de la aplicación.

5. **Legibilidad:** El uso de routers mejora la legibilidad del código al separar las rutas y sus correspondientes controladores en archivos o módulos independientes.