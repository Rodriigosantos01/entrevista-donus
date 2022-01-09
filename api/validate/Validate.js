class Validate {
  static main(validacoes, json) {
    let retorno = {
      erros: {},
    };

    validacoes.forEach((validacao) => {
      const { validates } = validacao;
      let erros = [];

      validates.forEach((validate) => {
        let isValido = this[validate](validacao, json);

        if (isValido) erros.push(isValido);
      });

      if (erros.length > 0) retorno.erros[validacao.campo] = erros;
    });

    return {
      erros: Object.keys(retorno.erros).length ? retorno.erros : false,
    };
  }

  // Validar se é vazio
  static notEmpty(validacao, json) {
    let { campo } = validacao;

    if (!json[campo] || json[campo] == "")
      return `Deve ser preenchido`;

    return "";
  }

  // Validar quantidade de caracteres que tem
  static minLength(validacao, json) {
    let { campo } = validacao;

    if (!json[campo] || json[campo].length < validacao.minLength)
      return `Deve conter pelo menos ${validacao.minLength} caracteres`

    return "";
  }

  // validar valor minimo
  static minValue(validacao, json) {
    let { campo } = validacao;

    if (!json[campo] || json[campo] < validacao.minValue)
      return `Deve ser maior que ${validacao.minValue}`;

    return "";
  }  
  
  // validar valor maximo
  static maxValue(validacao, json) {
    let { campo } = validacao;

    if (!json[campo] || json[campo] > validacao.maxValue)
      return `Deve ser menor que ${validacao.maxValue}`;

    return "";
  }  

  // mudar valor para vazio
  static leaveEmpty(validacao, json) {
    let { campo } = validacao;

    json[campo] = '';

    return "";
  }
  
  // mudar valor para zero
  static leaveZero(validacao, json) {
    let { campo } = validacao;
    
    json[campo] = 0;

    return "";
  }
}

module.exports = Validate;
