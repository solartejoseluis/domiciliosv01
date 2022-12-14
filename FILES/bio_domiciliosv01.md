2022-12-13
# PROYECTO DOMICILIOSV01
En el día de ayer iba evaluando la oportunidad de montar una version muy basica de la aplicación.
esta es la versión cero, la version mas básica, que puedo poner a funcionar esta semana.

la estructura y funcionamiento de esta aplicación es el mismo que ya tengo eleborado y funcionando en google docs, voy a compañar una captura de pantalla de esta hoja.

los campos que mostraría la pantalla principal son:

[BARRIOS]barrio: select
[BARRIOS]comuna: autobusqueda de la comuna de cada barrio
[TRASPORTADORES]asignado a: select
valor: campo numerico
hora de salida: datapicker de fecha/hora
hora de llegada. datapocker de fecha/hora
[USERS]asignado por: select
observaciones: campo de texto largo.


## La base de datos estaria organizada de la siguiente manera:
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
Archivos incluidos:

datos.php
index.html

