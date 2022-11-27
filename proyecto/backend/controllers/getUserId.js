const Usuario = require("../model/usuario")

const getUserId = async (req,res) =>{
    const{userId} = req.params
    if(userId.length===24){
        Usuario.findById(userId).then((usuario)=>{
            if(!usuario){
                return res.json({mensaje: "usuario no encontrado"})
            }
            else{
                const {_id, contraseña, __v,...resto}=usuario._doc
                res.json(resto);
            }
        })
    }
    else{
        return res.json({mensaje: "id incorrecta"})
    }
}



module.exports=getUserId