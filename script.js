
let cadastroArray = []
var flag = 0;
const form = document.getElementById('theForm')

//Functions
function verifynomecompleto(){
  if(document.getElementById("nomecompleto").value.length>=101 && document.getElementById("nomecompleto").value != ''){
    alert(` Na seção [Nome Completo]: Limite atingido, digite novamente abreviando...`);
  }
}

function verifyendereco(){
  if(document.getElementById("endereco").value.length>=101 && document.getElementById("endereco").value != ''){
    alert(` Na seção [Endereço]: Limite atingido, digite novamente abreviando...`);
  }
}

function validateRenda(){
  document.getElementById("rendamensal").value = document.getElementById("rendamensal").value.replace(/[^0-9,.]+/g,'');
}

function validateCPF(){
  document.getElementById("cpf").value = document.getElementById("cpf").value.replace(/[^0-9]+/g,'');
  if(document.getElementById("cpf").value.length!=11 && document.getElementById("cpf").value != ''){
    alert(` Na seção [CPF]: Incorreto, digite novamente...`);
  }

}

function idadeUser(birthDate)
{
  let ano = birthDate.substring(0, 4);
  let mes = birthDate.substring(5, 7);
  let dia = birthDate.substring(8, 10);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth()+1;
  const currentDate = new Date().getDate();

  let age = currentYear - ano-1;
  if(parseInt(currentMonth)>=parseInt(mes))
  {
    if(parseInt(currentMonth)==parseInt(mes))
    {
      if(parseInt(currentDate)>=parseInt(dia))
      {
        age = age+1;
      }
    }else{
      age = age+1;
    }
  }
  
  return age;
}

function renda(rendamensal)
{
  rendamensal= rendamensal.replace(/[^0-9,]+/g,'')
  rendamensal= rendamensal.replace(/,/g, '.')
  rendamensal = parseFloat(rendamensal)
  if(rendamensal>=2787.00)
  {
    alert("Renda acima da média mensal do brasileiro.")
  }else{
    alert("Renda abaixo da média mensal do brasileiro.")
  }
}

//Listeners
document.getElementById("enviar").addEventListener('mouseover',function(){
  if(flag != 1)
  {
    document.getElementById("enviar").style.backgroundColor = 'red'
  }
});

document.getElementById("enviar").addEventListener('mouseleave',function(){
  if(flag != 1)
  {
    document.getElementById("enviar").style.backgroundColor = ''
  }
});

form.addEventListener('submit',function(e){

  cadastroArray [0] = document.getElementById("nomecompleto").value;
  cadastroArray [1] = document.getElementById("cpf").value;
  cadastroArray [2] = document.getElementById("endereco").value;
  cadastroArray [3] = document.getElementById("datanasc").value;
  cadastroArray [4] = document.getElementById("rendamensal").value;
  cadastroArray [5] = document.getElementById("profissao").value;
  
  if(cadastroArray [0].length>=101||cadastroArray [1].length!=11||cadastroArray [2].length>=101||cadastroArray [4]<0)
  {
    var mensagem=""
    if(cadastroArray [0].length>=101){
      mensagem=mensagem+`
Na seção [Nome Completo]:
Limite atingido, digite novamente abreviando...
`;
    }
    if(cadastroArray [1].length!=11){
      mensagem=mensagem+`
Na seção [CPF]:
Incorreto, digite novamente...
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
  }else if(cadastroArray [5] == 'Opção não selecionada'){
    alert("Profissão não selecionada!")
    e.preventDefault();
  }
  else
  {
      //alerts
      var ageUser = idadeUser(cadastroArray [3]);
      renda(cadastroArray [4]);
      
      //disable "enviar" and return all imput sections to default values
      document.getElementById("nomecompleto").value = ''
      document.getElementById("cpf").value = ''
      document.getElementById("endereco").value = ''
      document.getElementById("datanasc").value = ''
      document.getElementById("rendamensal").value = ''
      document.getElementById("profissao").value = 'Opção não selecionada'
      
      //show user info
      document.querySelector('#infouser').style.display = "block";
      //2021-11-01
      document.querySelector('#infouser').innerHTML = `<b>Informações:</b><br><br>
      Nome Completo: ${cadastroArray[0]}<br>
      CPF: ${cadastroArray[1]}<br>
      Endereço: ${cadastroArray[2]}<br>
      Data de nascimento: ${cadastroArray[3].substring(8, 10)}/${cadastroArray[3].substring(5, 7)}/${cadastroArray[3].substring(0, 4)} (${ageUser} anos)<br>
      Renda Mensal: ${cadastroArray[4]}<br>
      Profissão: ${cadastroArray[5]}`;

      //modify submit button and prevent default submit
      document.querySelector('#enviar').disabled = 'true'
      document.querySelector('#enviar').value = 'Enviado';
      document.querySelector('#enviar').style.backgroundColor = '#42f55d';
      flag=1;
      e.preventDefault();
  }
});
