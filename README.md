## TODO Application
![Badge Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDO&color=GREEN&style=for-the-badge)
![Badge Java](http://img.shields.io/static/v1?label=JAVA&message=17.0.9&color=yellow&style=for-the-badge)
![Badge Spring](http://img.shields.io/static/v1?label=SPRING&message=4.0.0&color=GREEN&style=for-the-badge)
![Badge PostgreSQL](http://img.shields.io/static/v1?label=POSTGRESQL&message=14.12&color=blue&style=for-the-badge)
![Badge NodejS](http://img.shields.io/static/v1?label=NODEJS&message=14.12&color=lightgreen&style=for-the-badge)
![Badge Angular](http://img.shields.io/static/v1?label=Angular&message=14.2.10&color=red&style=for-the-badge)

<p align="center">
  <img src="https://github.com/user-attachments/assets/e7b7962c-f320-42a7-8b3b-64fa7a1f3c06" />
</p>


## Índice 

* [Índice](#índice)
* [Descrição do Projeto](#descrição-do-projeto)
* [Funcionalidades](#funcionalidades)
* [Métodos](#métodos)
* [Pessoas Desenvolvedoras do Projeto](#pessoas-desenvolvedoras)
* [Conclusão](#conclusão)

## Descrição do Projeto

TODO Application é uma aplicação Web onde você consegue gerir tarefas do seu dia-a-dia. A aplicação foi desenvolvida usando dois backends, sendo um em Java e outro em Javascript (Atualmente está sendo utilizado o feito em Javascript). Além disso, o frontend é em Angular.

## Funcionalidades
As funcionalidades foram divididas em: criar, editar, excluir, listar e concluir as tarefas.

## Métodos
&emsp;&emsp; As requisições para a API devem seguir os padrões:

<center>
  
| Método   | Descrição                                             |
|:---------|-------------------------------------------------------|
| `GET`    | Retorna informações de um ou mais registros.          |
| `POST`   | Utilizado para criar unm novo registro.               |
| `PATCH`  | Atualiza dados de um registro ou altera sua situação. |
| `DELETE` | Remove um registro do sistema.                        |

</center>

### Criar Atividade
* Método HTTP
  * POST
* API Endpoint
  * /api/activity
* Request (application/json)
  ```json
    {
        "description": "Fazendo Backend em Java"  
    }
  ```
* Response 200 (application/json)
  ```json
    {
        "id": 1,
        "description": "Fazendo Backend em Java" ,
        "isCompleted": false,
        "creationDate": 2024-07-15,
        "conclusionDate": null 
    }
  ```

### Editar Atividade
* Método HTTP
  * POST
* API Endpoint
  * api/activity/{id}
* Request (application/json)
  ```json
  {
      "description": "Fazendo Backend em Javascript"
  }
  ```
* Response 200 (application/json)
 ```json
    {
        "id": 1,
        "description": "Fazendo Backend em Javascript" ,
        "isCompleted": false,
        "creationDate": 2024-07-15,
        "conclusionDate": null 
    }
  ```

### Listar Atividades
* Método HTTP
  * GET
* API Endpoint
  * api/activity/get
  ```json
  [
    {
        "id": 1,
        "description": "Fazendo Backend em Javascript" ,
        "isCompleted": false,
        "creationDate": 2024-07-15,
        "conclusionDate": null 
    },
    {
        "id": 2,
        "description": "Fazendo Frontend em Angular" ,
        "isCompleted": false,
        "creationDate": 2024-07-15,
        "conclusionDate": null 
    }
  ]
  ```

### Excluir Atividade
* Método HTTP
  * DELETE
* API Endpoint
  * api/activity/delete/{id}
* Response 200 (application/json)
  * O body da resposta é vazio

### Marcar Atividade como Completa
* Método HTTP
  * POST
* API Endpoint
  * api/activity/complete/{id}
* Request
  * O body da requisição é vazio
* Response 200 (application/json)
 ```json
    {
        "id": 1,
        "description": "Fazendo Backend em Javascript" ,
        "isCompleted": true,
        "creationDate": 2024-07-15,
        "conclusionDate": 2024-07-15
    }
  ```

### Pessoas Desenvolvedoras

[<p align="center"><img src="https://avatars.githubusercontent.com/u/48693812?s=400&u=e3b46f180b450fc7e0bdc65bbbf68e4a77f8d121&v=4" width=115 ><br><sub>Yan Andrade de Sena</sub>](https://github.com/yandrade1305)</p>

### Conclusão

Quando eu recebi a proposta deste desafio da Decisão Sistemas eu fiquei muito empolgado em poder mostrar toda a minha capacidade em programar em pouco tempo. Acredito que meu grande diferencial foi justamente fazer em um curto tempo (Levei cerca de dois dias para fazer os dois backends e 1 frontend). Eu tive um pouco mais de dificuldade no Angular, já que faz um tempinho que eu não mexo nele (Mas bastou ver uns vídeos de tutoriais no YouTube que consegui desenvolver). 

Foi divertido e muito interessante fazer esse desafio utilizando NodeJS, a diferença de Node para Java é gritante (Principalmente na quantidade de linhas de código). Fiquei ainda mais interessado em fazer diversos cursos e estudos para me aprofundar nele. 

Por fim, agradeço ao desafio proposto e a oportunidade que me ofereceram para eu mostrar meu verdadeiro potencial!