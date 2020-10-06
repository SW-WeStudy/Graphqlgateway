# Graphqlgateway

npm install <br/>
node lib/index.js

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
