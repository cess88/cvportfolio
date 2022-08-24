import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import session from 'express-session';
import 'dotenv/config';

const db = process.env.BDD_URL;
const app = express();
const router = express.Router();

app.use(session({secret:process.env.SECRET_KEY,saveUninitialized: true,resave: true}));
app.use(express.static('./assets'));
app.use(express.urlencoded({extended: true}));
app.use(router);

app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`connected at ${process.env.APP_URL}`);
    }
})
router.use(userRouter);

mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log(`connected to database mongodb "connection mongo db OK"`);
    }
})

app.get("/presentation", async(req, res)=>{
    res.render("./presentation.twig")
})


app.get("/experiences", async(req, res)=>{
    res.render("./experiences.twig")
})

app.get("/contact", async(req, res)=>{
    res.render("./contact.twig",)
})

app.get("/portfolio", async(req, res)=>{
    res.render("./portFolio.twig")
})

app.all('*', (req, res) => {
    res.redirect('/presentation')
});




export default router;
