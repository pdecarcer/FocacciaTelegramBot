Este es el servicio de usuario

Para correr este servicio local:

`sls dynamodb start --migrate` al menos una vez para que cree la table local
`sls offline start` queda la apigateway en localhost
`sls local invoke` invoca una funcionalidad local
`sls deploy -v --profile "tu perfil"` hace deploy hacia tu perfil de AWS

En el servicio se tiene que poner las direcciones locales

```
 const documentClient = new DynamoDB.DocumentClient({
          region: 'localhost',
          endpoint: 'http://localhost:8000'
        });
```
