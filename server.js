const express = require("express");
const app = express();
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')
const todoRoutes = require('./routes/todos')


require('dotenv').config({path: './config/.env'})

connectDB();


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', homeRoutes);
app.use('/todos', todoRoutes);


// app.get('/', async (req, res) => {
//     const todoItems = await db.collection('Item_List').find().toArray();
//     const itemsLeft = await db.collection('Item_List').countDocuments({completed: false});

//     res.render('index.ejs', { items: todoItems, left: itemsLeft})
// })

// app.post('/addTodo', async(req, res) => {
//     db.collection('Item_List').insertOne({task: req.body.todoItem, completed: false})
//     .then(result => {
//         console.log('Todo Added');
//         res.redirect('/');
//     })
//     .catch(error => console.log(error))
// })

// app.put('/setComplete', async(req,res)=> {
//     const item = await req.body.item;
    
  
//     db.collection('Item_List').updateOne(
//         { "task" : item },
//         [
//             {
//                 $set: {
//                     'completed': {
//                         $cond: {
//                             if: {
//                                 $eq: ['$completed', false]
//                             },
//                             then: true,
//                             else: false
//                         }
//                     }
//                 }
//             }
//         ]
        
//     )
    // db.collection('Item_List').findOne({task: item})
    // .then(result => {
    //     console.log(result.completed)
    //     if (result.completed) {
    //         try {
    //             db.collection('Item_List').updateOne(
    //                 {"task": item},
    //                 {$set: {"completed" : false}}
    //             )
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     else {
    //         try {
    //             db.collection('Item_List').updateOne(
    //                 {"task": item},
    //                 {$set: {"completed" : true}}
    //             )
    //         }
    //         catch (e) {
    //             console.log(e);
    //         }
    //     }
    //     console.log(result);
    // })
//     res.json('Task has been updated');
// })

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`)
});