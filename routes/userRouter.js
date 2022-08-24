import Router from "express";
import PFModel from "../models/portFolioModel.js";
import nodemailer from 'nodemailer'
import multer from 'multer'
const userRouter = Router()


//*******multer for images*******/


const storage = multer.diskStorage({
    destination:function(req,file,callback){
      callback(null,'./assets/uploads/images' )
    },
    filename:function (req,file,callback) {
      callback(null,Date.now() + file.originalname)
    },
  })

  const upload = multer({
    storage:storage,
    limits:{
      fieldSize:102410243,
    },
  })



//*************gestion carrousel************ */

userRouter.get('/experiences', async (req, res) => {
    try {
        res.render('experiences.twig', {

        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

userRouter.get('/addUser', async (req, res) => {
    try {
        res.render('contact.twig', {
            action: "contact"
        })
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})



//********routes portFolio****** */

userRouter.get('/portFolio', async (req, res) => {
    try {
        let projects = await PFModel.find();
        res.render('portFolio.twig', {
            projects: projects,
        })
    } catch (error) {
        console.log(error);
    }
})

userRouter.get('/pf', async (req, res) => {
    try {
        res.render('pf.twig', {
           
        })
    } catch (error) {
        console.log(error);
    }
})

userRouter.post('/projects',upload.single('image'), async ( req, res)=>{
    try{
        req.body.image = req.file.filename
        const newProject = new PFModel(req.body) 
        newProject.save()
        res.redirect('/projects')
    }catch (error){

    }
})
//*************gestion mail************ */


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fonsat.nodemailer@gmail.com',
      pass: 'dlclhbrybfcawlgi'
    }
  });

userRouter.post('/contact',  async ( req, res)=>{
    const mailOptions = {
        from: req.body.mail,              // sender
        to: 'cecilecolo88@gmail.com',              // list of receivers
        subject: req.body.name + 'veux vous contacter',            // Mail subject
        html: req.body.message // HTML body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, function (err, info) {
         if(err)
           console.log(err)
         else
           console.log(info);
      });
      res.redirect("/presentation")
})



export default userRouter