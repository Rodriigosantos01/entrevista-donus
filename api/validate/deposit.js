// Config
const config = require("../config_system/configs.json");

exports.validacoes = [
  {
    "campo": "conta",
    "validates": ["notEmpty"]
  },
  {
    "campo": "valor",
    "validates": ["notEmpty", "maxValue", "minValue"],
    "maxValue": config.valueMaxDeposit,
    "minValue": 0,
  }
]
