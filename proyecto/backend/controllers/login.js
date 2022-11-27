const Usuario = require("../model/usuario")
const bcrypt = require("bcrypt")

const login = async (req,res) =>{
    const correo = req.query.correo
    const contraseña = req.query.contraseña

    Usuario.findOne({correo}).then((usuario)=>{
        if(!usuario){
            return res.json({mensaje: "usuario no existe"})
        }
        bcrypt.compare(contraseña,usuario.contraseña).then((esCorrecta)=>{
            if (esCorrecta){
            const {id,nombre}=usuario;
            res.json({mensaje:"usuario logeado", usuario:{
                id,
                nombre,
                }
            })
            }else{
                return res.json({mensaje:"Contraseña incorrecta"})
            }
        })
    })
}



module.exports=login