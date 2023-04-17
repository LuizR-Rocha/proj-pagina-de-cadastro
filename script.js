
let cadastroArray = []


//funções
function validateRenda(){
  document.getElementById("rendamensal").value = document.getElementById("rendamensal").value.replace(/[^0-9,.]+/g,'');
}

function validateCPF(){
  document.getElementById("cpf").value = document.getElementById("cpf").value.replace(/[^0-9-.]+/g,'');
}

function idadeUser(birthDate)
{
  let ano = birthDate.substring(0, 4);
  let mes = birthDate.substring(6, 8);
  let dia = birthDate.substring(10, 12);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth()+1;
  const currentDate = new Date().getDate();

  let age = currentYear - ano -1;
  if(currentMonth>=mes && currentDate>=dia)
  {
    age = age+1;
  }
  alert("Idade: "+age+" anos")
}

function renda(rendamensal)
{
  rendamensal= rendamensal.replace(/[^0-9,]+/g,'')
  rendamensal= rendamensal.replace(/,/g, '.')
  rendamensal = parseFloat(rendamensal)
  if(rendamensal>=2787.00)
  {
    alert("Salário abaixo da média mensal do brasileiro!")
  }
}

//codigo principal
const form = document.getElementById('theForm')
form.addEventListener('submit',function(e){

  cadastroArray [0] = document.getElementById("nomecompleto").value;
  cadastroArray [1] = document.getElementById("cpf").value;
  cadastroArray [2] = document.getElementById("endereco").value;
  cadastroArray [3] = document.getElementById("datanasc").value;
  cadastroArray [4] = document.getElementById("rendamensal").value;
  cadastroArray [5] = document.getElementById("profissao").value;
  
  if(cadastroArray [0].length>=101||cadastroArray [2].length>=101||cadastroArray [4]<0)
  {
    var mensagem=""
    if(cadastroArray [0].length>=101){
      mensagem=mensagem+`
Na seção [Nome Completo]:
Limite atingido, digite novamente abreviando...
`;
    }
    if(cadastroArray [2].length>=101)
    {
      mensagem=mensagem+`
Na seção [Endereço]:
Limite atingido, digite novamente abreviando...
`;
    }
    if(cadastroArray [4]<0){
      mensagem=mensagem+`
Na seção [Renda Mensal]:
Valor inválido.
`;
    }
    alert(mensagem);
    e.preventDefault();
  }
  else
  {
      alert(cadastroArray);
      idadeUser(cadastroArray [3]);
      renda(cadastroArray [4]);
  }
});