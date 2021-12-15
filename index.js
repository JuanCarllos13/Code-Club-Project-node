const { request, response, query } = require('express')
const uuid = require('uuid')
const express = require('express')
const port = 3000


const app = express()
app.use(express.json())

/*
    - Query params => meusite.com/users?nome=rodolfo&age=28  //FILTROS
    - Route Params =>users/2   // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECÍFICO

*/ 

const users = []

const checkUserId = (request, response, next) =>{
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({messagem: 'User ot found'})
    }

    request.index = index
    request.UserId = id
    next()

}


app.get('/users', (request, response) =>{
    //const name = request.query.name
     //const age = request.query.age
    // console.log(name,age)

   // const {telefone} = request.params
   // const {name, age} = request.query

   // return response.json({name: name, age:age}

   return response.json(users)
})


app.post('/users', (request,response) =>{

    const{ name, age} = request.body

    const user = {id:uuid.v4(),  name, age}
  
    users.push(user)
    return response.status(201).json(user)
})



app.put('/users/:id',checkUserId, (request, response) =>{
    
    const { name, age} = request.body
    const index = request.index
    const id = request.UserId
    const updateUser= { id, name, age}


    users[index] = updateUser

   return response.json(updateUser)
})

app.delete('/users/:id',checkUserId, (request, response) =>{

    const index = request.index

    users.splice(index,1)

       return response.status(204).json(users)
})













app.listen(port, () =>{
    console.log(`👏 server started on port ${port}`)
})