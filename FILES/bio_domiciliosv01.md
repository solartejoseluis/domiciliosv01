2022-12-13_Mar
# PROYECTO DOMICILIOSV01
En el día de ayer iba evaluando la oportunidad de montar una versión muy basica de la aplicación.
esta es la versión cero, la versión mas básica, que puedo poner a funcionar mas pronto que la mas elaborada, la idea es ajustar la evolucion de proyecto a la metodologia ágil.

La estructura y funcionamiento de esta aplicación es el mismo que ya tengo elaborado y funcionando en google docs de la drogueria Suricentro, voy a compañar una captura de pantalla de esta hoja.

## pantalla principal
los campos que mostraría la pantalla principal son:

[BARRIOS]barrio: select
[BARRIOS]comuna: autobusqueda de la comuna de cada barrio
[TRASPORTADORES]asignado a: select
valor: campo numerico
hora de salida: datapicker de fecha/hora
hora de llegada. datapocker de fecha/hora
[USERS]asignado por: select
observaciones: campo de texto largo.

## La base de datos
nombre de la base de datos: domicilios_v01

### TABLA: DOMICILIOS
domi_id
domi_valor ()
domi_hora_salida
domi_hora_llegada
domi_observaciones
[FK]barrio_id
[FK]trans_id
[FK]users_id

### TABLA: BARRIOS
barrio_id (int 5) autoincrement
barrio_nombre (vachar 50)
barrio_comuna (varchar 50)

### TABLA: TRANSPORTADORES
trans_id
trans_nombre
trans_apellido

### TABLA: USERS
user_id
user_nombre
user_apellido

### Relaciones entre tablas
Ahora vamos a crear los index y las foreign keys en la tabla domicilios

#### CREACION DE LOS INDEX:

para construir las relación de las tablas se deben primero crear los indices y luego las llaves foráneas.

primero creamos el index de cada una de las tablas foraneas
```
CREATE INDEX user_id ON domicilios (user_id);
CREATE INDEX trans_id ON domicilios (trans_id);
CREATE INDEX barrio_id ON domicilios (barrio_id);
```

Luego creamos las llaves foráneas para cada una de las tablas:
```
ALTER TABLE domicilios ADD FOREIGN KEY (user_id) REFERENCES users(user_id);
ALTER TABLE domicilios ADD FOREIGN KEY (trans_id) REFERENCES transportadores(trans_id);
ALTER TABLE domicilios ADD FOREIGN KEY (barrio_id) REFERENCES barrios(barrio_id);
```
Vamos a crear el nuevo proyecto en una carpeta de htdocs

## Resumen de lo hecho
- se copiaron los archivos del crud del proyecto app_domicilios que tiene un enfoque mas adelantado.
- se adapta el archivo pdo para acceder a la conexion.
- se adecua el archivo domi_data.php
- se adecua el archivo domi index.html
- se crean nuevos archivos para manejo de los selects: getBarrio.php, getUser.php y getTransportador.php
- se crea la base de datos y las relaciones
- se sube el proyecto al github con el nombre domiciliosv01. incluyendo el codigo de la base de datos hasta el momento.

### 2022-12-14_mie
- Ajustes de la sección de validación del modal
- Estandarizando los nombres en la aplicacion:
nomeclaturas para asignar nombres a los elementos en la aplicación:
### los campos de la base de datos
	nombretabla_nombrecampo
### Elementos del Dom
	tblDomicilios
	frmPrincipal
	mdlPrincipal
	Uso camelCase, en la primera parte va el tipo de elemento y en la segunda parte va el
### Elementos del dom que continen datos.
	por ejemplo estos: input, select, checkbox, creo abreviaturas suprimiendo las vocales por ejemplo: input = npt, select = slct, checkbox = chckbx
	npt-nombre_campo
	aqui uso  abreviatura luego el guión medio y luego el nombre de la variable o campo de la base de datos.

2022-12-14_mie
14:24
### Plan de trabajo:

- Completar los procesos de comunicación del Crud.
- Ajustar el diseño del Modal

## PROBLEMA CON EL SELECT
Al pulsar el BOTON EDITAR en la pantalla principal aparecen los datos de los input pero no cargan los select.

Resulta que los select de este modal de EDICION están asociados al código que los carga en el formulario de AGREGAR. La función de carga es getBarrio.php por dar un ejemplo.

Por ejemplo en la función de get se indica un codigo para que se pueda mostrar en el selct como opcion predeterminada

### ¿Que Necesito?
Necesito que select se cargue con el valor de una consulta.

¿Cómo poner un valor en el select?

2022-12-15jue_10:10
voy haciendo pruebas con el select, me parece que hay que hacer pruebas para cargar el valor que sale de la consulta sql en el select, porque lo puedo cargar facilmente en un input, pero para el select ya ofrece problemas.. o no.. y que tal si compraro la carga que se hace en el input y la asimilo al select.
Al resolver esto quedaria listo porque el select cargaria el valor consultado con el sql y tendria disponible la lista de opciones para modificarla, esto de la modificacion ya se ha construido en la funcion de llenado del modal por primera vez.

### 2022-12-15jue_14-10
Otra de las posibilidades sería:
crear un formulario diferente para la edición que muestre los datos originales y que al lado derecho muestre otro formulario en blanco con los campos para modificar.

Entonces debería hacer una consulta del grupo de datos teniendo en cuenta el domi_id y presentar los datos en un modal que al lado derecho tenga todos los campos en blanco.

Estoy buscando información sobre esto del select, pero no obtengo algo que funcione de manera rapida, hay muchos ejemplos pero hasta ahora no me funciona asi que voy a irma por la otra solucion:

Mostrar el modal en dos partes a la izquierda los datos que recojo y a la derecha los campos para introducir un cambio.

Entonces en esta jornada voy a hacer dos cosas:
La primera es rediseñar el formulario de domicilio nuevo, y lo voy a poner a funcionar porque no está enviando los datos a la base de datos.


## ARREGLO DE LA CONEXION DEL FORMULARIO MODAL.


### 2022-12-15jue_18:44
hoy se realizo:

- se arregla el acceso al formulario de agregar
- se elimina del formulario de agregar el campo de hora de llegada
- Se divide el formulario de agregar y el de editar
- Ajuste de la distribución del formulario modal de nuevos domicilios
- Se coloca un botón para agregar automáticamente la hora de salida

### paso siguientes:
- Crear un boton para agregar las horas de llegada, que podria ser nmostrnaod un boton en el campo que este vacio, cuando se pulse se agrega la hora de llegada automaticamente al campo y desaparece el boton.

- construir el formulario de edicion de los registro, com ose ha planteado mas arriba.

- se podria comenzar con la construccion del modulo de validacion el cual permitiria ahorrar mas tiempo en el  agregado de nuevos registros y abre la posibilidad para ir activando otras funciones por perfiles.

### 2022-12-16vie_10:57
- Se adecua diseño a dos columnas para el formulario de edición.
- Se adecua el diseño de los campos de presentación del registro a editar y los campos de edicion.

Queda claro que para mostrar los datos de los select debo usar el campo de nombres, pero para introducir el dato a la base de datos de la modificacion que hace el select debo hacerlo con el campo de los id, esto lo manejo con inputs ocultos para poner y mover los datos.

### 2022-12-16vie_14:15
 trabajo en esta jornada:
 - Arreglar la comunicacion del formulario de edición para que grabe los datos.
 - Colocar el botón de hora de llegada





