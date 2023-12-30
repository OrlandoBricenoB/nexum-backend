<h1 align="center">
  💪 Hexagonal Architecture + DDD
</h1>

El proyecto se compone de Bounded context, cada Bounded context se componen por las siguientes carpetas:

- routes: Contiene las rutas de la API del dominio.
- controllers: Contiene la lógica para obtener los datos desde el servicio del dominio.
- services: Representa la lógica de negocio y utiliza el repositorio para obtener los datos.
- repositories: Representa la lógica que obtiene la información desde la base de datos.
- domain: Es la capa de dominio de Ports & Adapters.
- application: Es la capa de aplicación de Ports & Adapters.
- infrastructure: Es la capa de infra de Ports & Adapters.

## Bounding Contexts

Nuestros contexts se basan en el dominio, siguiendo las reglas del Domain Drive Design, entre los dominios contamos con los fundamentales:

- config: Es un context enfocado en los datos de configuración del servidor.
- server: Es un context que se enfoca en el servidor de NodeJS y su conexión a las bases de datos.
- shared: Es un context que comparte todas sus capas con los demás context.

## CRUD

Al momento de crear o editar un elemento, los controladores se encargarán de verificar la data recibida.
Los repositorios de las bases de datos solo escriben información, no la validan, es responsabilidad de cada controlador validar que la data que se vaya a escribir sea conforme al modelo del dominio.

Por ejemplo, createCharacter, ese controlador debe crear una instancia de Character() con todos sus campos.
Luego, enviar al repositorio de la base de datos el create, con la instancia de Character como data, utilizando el util getObjectProperties() que convierte una instancia de clase en un objeto.
