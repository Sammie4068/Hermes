const { res, req, next } = require("express");
const { getRunners } = require("../../models/index")

exports.getRunners = async (req, res, next) => {
    try {
        const taskParam = req.params.task.replace(/_/g, " ");
        const results = await getRunners(taskParam, req.params.location)
        console.log(taskParam)
        res.json(results.rows)
    } catch (err) {
      return  next(err)
    }
}