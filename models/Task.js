const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "タスク名を入れてください。"],
    maxlength: [20, "タスク名は20文字以内で入力してください。"],
  },
  memo: {
    type: String,
    maxlength: [500, "メモは500文字以内で入力してください。"],
    default: "",
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Task", TaskSchema);
