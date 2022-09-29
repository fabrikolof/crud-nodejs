const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));
const express = require("express");
const trabajadorSchema = require("../models/trabajadorModel");
const router = express.Router();

router.get("/obtenerTrabajadorYSueldoById/:id", (req, res) => {
  const { id } = req.params;

  trabajadorSchema
  .findById(id)
  .then(async (trabajador) => {
    const country = await fetch(
      `http://localhost:3001/api/obtenerCountryPorName/${trabajador.country}`
    );
    const data = await country.json();
    //console.log(data[0].maximumSalary);
    const newTrabajador = new trabajadorSchema({
      name: trabajador.name,
      age: trabajador.age,
      salary: trabajador.salary,
      country: trabajador.country,
      maximumSalary: data[0].maximumSalary,
      minimumSalary: data[0].minimumSalary
    })

    res.json(newTrabajador)
  });
});

router.post("/crearTrabajador", (req, res) => {
  const trabajador = trabajadorSchema(req.body);
  trabajador
    .save()
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

router.get("/obtenerTrabajadores", (req, res) => {
  trabajadorSchema
    .find()
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

router.get("/obtenerTrabajadorPorId/:id", (req, res) => {
  const { id } = req.params;
  trabajadorSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

router.put("/updateTrabajador/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, salary } = req.body;
  trabajadorSchema
    .updateOne({ _id: id }, { $set: { name, age, salary } })
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

router.delete("/deleteTrabajador/:id", (req, res) => {
  const { id } = req.params;
  trabajadorSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

module.exports = router;
