const express = require('express');
const db = require('../database');
const { routeToLogin } = require('../middlewares/middleware');
const userDetails = require('../middlewares/userDetails');
const router = express.Router();
const weekDays = require('../helper/weekdays');
const { validateSchedules } = require('../helper/validate');

router.use(userDetails,routeToLogin)

router.get('/', async (req, res,next) => {
    try {
        //  console.log({isshome:req.user})
    // console.log(res.locals)
    const users = res.locals.user
    //console.log(users)
        const allSchedules = await db.any('SELECT users.user_id,users.surname,users.firstname,schedules.start_time,schedules.end_time,schedules.day FROM users INNER JOIN schedules ON users.user_id = schedules.user_id')
        const groupsSchedules = []
        allSchedules.forEach(schedule => {
            const {user_id,firstname,surname,start_time,end_time,day}=schedule
            const foundUser=groupsSchedules.find((each => each.user_id === schedule.user_id));
            if (foundUser) {
                foundUser.user_schedule.push({start_time,end_time,day})
            }
            else {
                const data = { user_id, firstname, surname, user_schedule: [] }
                data.user_schedule.push({start_time,end_time,day})
                groupsSchedules.push(data)
            }
        })
    res.render('./pages/home', {
        user: users,
        allSchedules,
        groupsSchedules
    })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/manageschedules', async (req, res) => {
   // console.log(req.session.userId)
    try {
        const schedules = await db.any('SELECT * FROM schedules WHERE user_id = $1;', req.session.userId)
        //if(!schedules) res.redirect('/manageschedules/new?message=no%20%20schedules')
        schedules.forEach(schedule => {
            schedule.day = weekDays.find(weekDay => weekDay.id == schedule.day)
        })
        const users = res.locals.user
        res.render('./pages/manageschedules', {
            schedules,
            user: users[0].firstname,
            message: req.query.message
        })
    } catch (err) {
        console.log(err)
        res.send(err)
   }
})

router.get('/manageschedules/new', async (req, res) => {
    try {
        res.render('./pages/scheduleform', {
            weeks: weekDays
        })
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/manageschedules/new', async (req, res) => {
    try {
        const {day,start_at,end_at}= req.body
    //1. validation
        const errors = validateSchedules(req.body)

        if (Object.keys(errors).length) {
            return res.render('./pages/scheduleform', {
                day,
                start_at,
                end_at,
                weeks: weekDays,
                errors
            })
        }

    //2.adding the schedule to the user
    await db.none('INSERT INTO schedules (user_id, day, start_time, end_time) VALUES ($1,$2,$3,$4);',
        [req.session.userId, day, start_at, end_at])
    res.redirect('/manageschedules?message=A%20new%20schedule%20has%20been%20added.')
    } catch (err) {
        console.log(err)
        res.send(err)
    }

})

router.use(function (req, res) {
    res.status(405).json({
        error: {
            message: "not defined route"
        }
    })
})

module.exports = router;