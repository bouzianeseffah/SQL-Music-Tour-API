const stages = require('express').Router();
const db = require('../models');
const stage = require('../models/stage');
const {Stage, Event} = db;
//FIND ALL STAGES
const {Op} = require('sequelize');
const { STRING } = require('sequelize');
stages.get('/', async (req, res) => {
    try{
        const foundStages = await Stage.findAll()
        res.status(200).json(foundStages)
    } catch (error) {
        res.status(500).json(error)
    }
})
//FIND A SPECIFIC STAGE
stages.get('/:name', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: { stage_name: req.params.name },
            include:{ 
                model: Event, 
                as: "events",
                through: { attributes: [] }
            },
            order: [
                [{ model: Event, as: "events" }, 'date', 'ASC'],
            ]
        })
        res.status(200).json(foundStage)
    } catch (error) {
        res.status(500).json(error)
    }
})
//CREATE A STAGE
stages.post('/', async(req, res) => {
    try{
       const newStage = await Stage.create(req.body)
       res.status(200).json({
        message: 'successfully inserted a new stage',
        data:  newStage
       })
    } catch(error) {
       res.status(500).json(error)
    }
})
//UPDATE A STAGE
stages.put('/:id', async(req, res) => {
     try{ 
        const updateStages = await Stage.update(req.body, {
            where: {
                stage_id: req.params.id
            }
        })
            res.status(200).json({
               message: `successfully updated ${updateStages} stage(s)`
            })
        

     }catch(error) {
             res.status(200).json(error)
     }
})
// DELETE A STAGE
stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
module.exports = stages