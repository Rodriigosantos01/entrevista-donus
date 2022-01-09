exports.validacoes = [
  {
    "campo": "nome",
    "validates": ["notEmpty", "minLength"],
    "minLength": 3
  },
  {
    "campo": "cpf",
    "validates": ["notEmpty"]
  }
]
