const express = require("express");
const countrySchema = require("../models/countryModel");
const router = express.Router();

router.post("/crearCountry", (req, res) => {
  const country = countrySchema(req.body);
  country
    .save()
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

router.get("/obtenerCountries", (req, res) => {
  countrySchema
    .find()
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

router.get("/obtenerCountryPorName/:name", (req, res) => {
  const { name } = req.params;
  const query = { name: name };
  countrySchema
    .find(query)
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

router.get("/obtenerCountryPorId/:id", (req, res) => {
  const { id } = req.params;
  countrySchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((er) => res.json({ message: er }));
});

router.put("/updateCountry/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, salary } = req.body;
    countrySchema
      .updateOne({_id: id}, { $set: {name, age, salary}})
      .then((data) => res.json(data))
      .catch((er) => res.json({ message: er }));
  });

router.delete("/deleteCountry/:id", (req, res) => {
    const { id } = req.params;
    countrySchema
      .deleteOne({_id: id})
      .then((data) => res.json(data))
      .catch((er) => res.json({ message: er }));
  });

module.exports = router;
