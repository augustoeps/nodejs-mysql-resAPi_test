import {pool} from "../db.js"

export const getEmployees= async(req,res)=>{

    try {
        
        const [rows]= await pool.query('SELECT * FROM employee');
        res.json(rows)
        
        
    } catch (error) {
    return res.status(500).json({message:"something wrong"})   
    }

}

export const getEmployee= async(req,res)=>{

   
   
    const x = req.params.id

    const [rows]= await pool.query('SELECT * FROM employee WHERE id = ?' ,[x] );

    if( rows.length <=  0){
         res.status(404).send("El id no se encuentra en la BBDD")
        
    }else{
    res.json(rows[0])
    }



}



export const createEmployee= async (req,res)=>{
    
    const {name,salary} = req.body
    const [rows]=await pool.query('INSERT INTO employee (name,salary) VALUES(?,?)',[name,salary]);
    res.send({id:rows.insertId,
        name,
        salary,

    })

}

export const updateEmployee= async (req,res)=>{

    const id =  req.params.id
    const name = req.body.name
    const  salary = req.body.salary
    const [result] = await pool.query('UPDATE employee SET name = IFNULL(?, name),salary = IFNULL(?, salary) WHERE id = ?',[name,salary,id] )

    if(result.affectedRows == 0){

        return res.status(404).send("Usuario no encontrado")
    }else{
        
        const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?' ,[id] )
        res.json(rows[0])



    }

}   

export const eliminarEmpleado= async(req,res)=>{

    const id = req.params.id

    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [id])

    if (result.affectedRows == 0){
            
        res.send("No existe ningun empleado con ese ID")

    }else{
        
        res.status(204)// elimando correctamente pero el servidor no envia nada al cliente(status 204)

    }
   
}