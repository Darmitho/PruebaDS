const bcrypt = require("bcrypt")
const Usuario = require("../model/usuario")

const register = async (req,res) =>{
    const {nombre,rol,correo,contraseña} = req.body;

    const rol1 = rol || "Investigador"
    Usuario.findOne({correo}).then((usuario) =>{
        if (usuario){
            return res.json({mensaje: "Ya existe el usuario con ese correo"});
        } else if (!nombre || !correo || !contraseña){
            return res.json({mensaje: "Falta datos"});
        } else {
            bcrypt.hash(contraseña,10,(error, contraseñaHasheada)=>{
                if (error) res.json({error})
                else{
                    const nuevoUsuario = new Usuario({
                        nombre,
                        rol: rol1,
                        correo,
                        contraseña: contraseñaHasheada,
                    });
                    nuevoUsuario.save()
                    .then((usuario)=>{
                    res.json({mensaje: "Usuario creado",usuario})
                    })
                    .catch(error => console.error(error));
                }
            })
        }
    })
}



module.exports=register