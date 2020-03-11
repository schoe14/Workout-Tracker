const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Number,
    unique: true,
    default: new Date().setDate(new Date().getDate())
  },
  exercises: Array,
  totalDuration: {
    type: Number,
    default: 0
  }
});

WorkoutSchema.pre("save", function (next) {
  if (this.exercises.length > 0) {
    console.log("line19 Workout.js")
    this.exercises.map(element => {
      this.totalDuration += element.duration;
    })
  }
  next();
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
