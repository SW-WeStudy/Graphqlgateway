# Graphqlgateway

npm install <br/>
node lib/index.js

## Notas a tener en cuenta
- En los archivos donde definan sus esquemas, los nombres de cada type, input, queries y mutations tienen que ser unicos. En caso de que por ejemplo alguien cree un type Foro en algun esquema, y alguien lo cree en otro lugar, al iniciar el servidor ocurrira un error. 

Ejemplo de Querys

```javascript
mutation{
    createResource(resource:{idUser:"1",idClase:1,content:"Contenido creado"}){
      res
      message
      id
    }
  }

mutation{
  updateResource(resource:{idUser:"1",idClase:1,content:"Contenido creado"},id:25){
    res
    message
  }
}  


query{
  allComentsOfNote(id:1){
    content
  }
}
```
