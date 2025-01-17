//DEPENDENCIES
const events = require('express').Router();
const db = require('../models');
const event = require('../models/event');
const {Event, MeetGreet, Band, Set_Time} = db;
const {Op} = require('sequelize')
//FIND ALL EVENT
events.get('/', async (req, res) => {
    try{
        const foundEvents = await Event.findAll({
            order: [['available_start_time', 'ASC']]
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})
//FIND A SPECIFIC EVENT
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name },
            include: [
                { 
                    model: MeetGreet, 
                    as: "meet_greets", 
                    attributes: { exclude: [ "event_id", "band_id" ] },
                    include: {
                         model: Band, 
                         as: "band", 
                    } 
                },
                { 
                    model: Set_Time, 
                    as: "set_times",
                    attributes: { exclude: [ "event_id", "stage_id", "band_id" ] },
                    include: [
                        { model: Band, as: "band" },
                        { model: Stage, as: "stage" }
                    ]
                },
                { 
                    model: Stage, 
                    as: "stages",
                    through: { attributes: [] }
                }
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})
//CREATE AN EVENT
events.post('/', async(req, res) => {
    try{
       const newEvent = await Event.create(req.body)
       res.status(200).json({
        message: 'successfully inserted a new event',
        data:  newEvent
       })
    } catch(error) {
       res.status(500).json(error)
    }
})
//UPDATE AN EVENT
events.put('/:id', async(req, res) => {
     try{ 
        const updateEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
            res.status(200).json({
               message: `successfully updated ${updateEvents} event(s)`
            })
        

     }catch(error) {
             res.status(200).json(error)
     }
})
// DELETE A BAND
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})
module.exports = events

