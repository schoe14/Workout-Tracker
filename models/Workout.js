const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const opts = { toObject: { virtuals: true }, toJSON: { virtuals: true } };
const WorkoutSchema = new Schema({
  day: {
    type: Number,
    unique: true,
    default: new Date().setDate(new Date().getDate())
  },
  exercises: Array
}, opts);

WorkoutSchema.virtual("totalDuration").get(function () {
  let total = 0;
  console.log(total);

  this.exercises.forEach((exercise, i) => {
    console.log(i + 1 + ". exercise.duration in Workout.js: " + exercise.duration);
    total += exercise.duration;
  });

  console.log(total);
  return total;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
