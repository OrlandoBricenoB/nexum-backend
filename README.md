<h1 align="center">
  💪 Hexagonal Architecture + DDD
</h1>

El proyecto se compone de Bounded context, cada Bounded context se componen por las siguientes carpetas:

- controllers: Contiene la lógica para obtener los datos desde el servicio del dominio.
- routes: Contiene las rutas de la API del dominio.
- services: Representa la lógica de negocio y utiliza el repositorio para obtener los datos.
- domain: Es la capa de dominio de Ports & Adapters.
- application: Es la capa de aplicación de Ports & Adapters.
  - repositories:
- infrastructure: Es la capa de infra de Ports & Adapters.
  - repositories:

## CRUD

Al momento de crear o editar un elemento, los controladores se encargarán de verificar la data recibida.
Los repositorios de las bases de datos solo escriben información, no la validan, es responsabilidad de cada controlador validar que la data que se vaya a escribir sea conforme al modelo del dominio.

Por ejemplo, createCharacter, ese controlador debe crear una instancia de Character() con todos sus campos.
Luego, enviar al repositorio de la base de datos el create, con la instancia de Character como data, utilizando el util getObjectProperties() que convierte una instancia de clase en un objeto.
