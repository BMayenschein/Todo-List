const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8101;
require('dotenv').config();


let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Todo_App'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(async client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName);
    })

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', async (req, res) => {
    const todoItems = await db.collection('Item_List').find().toArray();
    const itemsLeft = await db.collection('Item_List').countDocuments({completed: false});

    res.render('index.ejs', { items: todoItems, left: itemsLeft})
})

app.post('/addTodo', async(req, res) => {
    db.collection('Item_List').insertOne({task: req.body.todoItem, completed: false})
    .then(result => {
        console.log('Todo Added');
        res.redirect('/');
    })
    .catch(error => console.log(error))
})

app.put('/setComplete', async(req,res)=> {
    const item = await req.body.item;
    db.collection('Item_List').updateOne(
        { "task" : item },
        [
            {
                $set: {
                    'completed': {
                        $cond: {
                            if: {
                                $eq: ['$completed', false]
                            },
                            then: true,
                            else: false
                        }
                    }
                }
            }
        ]
        
    )
    res.json('Task has been updated');
})

app.delete('/removeItem', async(req,res) => {
    const item = await req.body.item;
    db.collection('Item_List').deleteOne({"task": item})
    .then(result => {
        console.log(`${item} has been deleted`);
        res.json(`${item} has been deleted`);
    })
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
});