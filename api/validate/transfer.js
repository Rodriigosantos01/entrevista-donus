// Config
const config = require("../config_system/configs.json");

exports.validacoes = [
  {
    "campo": "numeroOrigem",
    "validates": ["notEmpty"]
  },
  {
    "campo": "numeroDestino",
    "validates": ["notEmpty"]
  },
  {
    "campo": "valor",
    "validates": ["notEmpty", "minValue"],    
    "minValue": 0,
  }
]
