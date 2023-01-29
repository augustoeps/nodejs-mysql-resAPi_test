import {Router} from "express"

import { getEmployees, createEmployee,eliminarEmpleado,updateEmployee,getEmployee} from "../controllers/employees.controller.js"

const router = Router()

router.get("/employees",getEmployees)

router.get("/employees/:id",getEmployee)

router.post("/employees",createEmployee)

router.patch("/employees/:id",updateEmployee)

router.delete("/employees/:id",eliminarEmpleado)

export default router

