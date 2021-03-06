const router = require("express").Router();
const db = require("../models");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .sort({ day: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    console.log(new Date());
    db.Workout.create({ day: new Date() })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log("/api/workouts error: " + err);
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    db.Workout.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .sort({ day: -1 })
        .limit(7)
        .then(dbWorkout => {
            console.log(dbWorkout);
            dbWorkout.reverse();
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.delete("/api/deleteall", (req, res) => {
    db.Workout.deleteMany({})
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router;

