// SIMULATOR

let formSimulator = document.querySelector('#formSimulator')
const buttonSimulator = document.querySelector('#buttonSimulator')
const button_restartSimulation = document.querySelector('#buttonResult')
let content_simulator = document.querySelector('#content_simulator')
let content_result = document.querySelector('#content_result')
let result_text = document.querySelector('#result_text')


let inputNome = document.forms['formSimulator']['nome']
let inputMensalidade = document.forms['formSimulator']['mensalidade']
let inputJuros = document.forms['formSimulator']['juros']
let inputTempo = document.forms['formSimulator']['tempo']



buttonSimulator.onclick = function () {
  
  function inputValidation() {
    temErro= false
  
    const mensalidade = inputMensalidade.value.trim();
    const taxaJuros = inputJuros.value.trim();
    const tempoContribuicao = inputTempo.value.trim();
    
    // VALIDAÇÃO NOME
    
    if (!inputNome.value) {
      temErro = true
      inputNome.classList.add('inputError')
      
      inputNome.placeholder = " Digite o nome corretamente"
      
    } else {
      inputNome.classList.remove('inputError')
  
      inputNome.placeholder = ""
    }
    
    // VALIDAÇÃO MENSALIDADE  
  
    if (!mensalidade || isNaN(mensalidade) || Number(mensalidade) <= 0) {
      temErro = true;
      inputMensalidade.classList.add('inputError');
      
      inputMensalidade.placeholder = " Digite um valor válido (ex: 250.75)";
  
      inputMensalidade.value = "";
    } else {
      inputMensalidade.classList.remove('inputError');
      
      inputMensalidade.placeholder = "";
    }

    // VALIDAÇÃO TAXA DE JUROS 
    
    if (!taxaJuros || isNaN(taxaJuros) || Number(taxaJuros) <= 0) {
      temErro = true;
      inputJuros.classList.add('inputError');
      
      inputJuros.placeholder = " Digite uma taxa de juros válida (ex: 5.5)";
      
      inputJuros.value = "";
      
    } else {
      inputJuros.classList.remove('inputError');
      
      inputJuros.placeholder = "";
    }

    // VALIDAÇÃO DO TEMPO DE CONTRIBUIÇÃO  
  
    if (!tempoContribuicao) {
      temErro = true;
      inputTempo.classList.add('inputError');
      
      inputTempo.placeholder = " Digite um tempo de contribuição válido (ex: 10)";
      
      inputTempo.value = "";
  
    } else {
      inputTempo.classList.remove('inputError');
      
      inputTempo.placeholder = "";
    }
    
    if(!temErro) {
      content_simulator.classList.add('invisible')
      content_result.classList.remove('invisible')
    }  
  }
  
  inputValidation()

  let mensalidade = parseFloat(inputMensalidade.value);
  let taxaJuros = parseFloat(inputJuros.value) / 100;
  let tempo = parseInt(inputTempo.value);
  
  fetch ('http://api.mathjs.org/v4/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ 
      "expr": `${mensalidade} * (((1 + ${taxaJuros}) ^ ${tempo} - 1) / ${taxaJuros})` 
    })
  })
  .then(response => response.json())
  .then(data => { 
    let resultadoFormatado = parseFloat(data.result).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    let mensalidadeFormatada = mensalidade.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    result_text.innerHTML = `
        Olá ${inputNome.value}, investindo ${mensalidadeFormatada} todo mês, você terá <strong>${resultadoFormatado}</strong> em ${tempo} meses sob uma taxa de juros de ${inputJuros.value}% ao mês.
    `
  })
  .catch(error => { 
    result_text.innerHTML = `
      Ocorreu um erro na requisição da API
    `
  })
}

button_restartSimulation.onclick = function() {
  inputNome.value = ''
  inputMensalidade.value = ''
  inputJuros.value = ''
  inputTempo.value = ''

  content_simulator.classList.remove('invisible')
  content_result.classList.add('invisible')
}

