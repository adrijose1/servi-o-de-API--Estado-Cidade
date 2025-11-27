const https = require('https');
const http = require('http');

const estados = [
  { id: 26, nome: 'Pernambuco' },
  { id: 29, nome: 'Bahia' },
  { id: 23, nome: 'Ceará' }
];

/*
id 29 referente a bahia
id 26 referente a pernambuco
id 23 referente a Ceará
*/

function buscarCidades(estado, callback) {
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios`;

  /* IPI DO IBGE ESCOLHIDO: https://servicodados.ibge.gov.br/api/v1/localidades/estados/{id}/municipios

  Por que escolhi essa API?
Escolhi a API do IBGE porque ela fornece informações oficiais sobre estados, cidades e regiões do Brasil.
Por conta que se relaciona diretamente com o tema da minha aplicação, que utiliza estados e cidades.

Parâmetro de Busca

O parâmetro utilizado foi o ID do estado (26 = Pernambuco, 29 = Bahia, 23 = Ceará).
Esse ID é inserido na URL para obter apenas as cidades daquele estado.

Resultado Esperado da Requisição:
A requisição retorna uma lista de cidades pertencentes ao estado informado, exemplo: Cidade RECIFE(estado PE)

  */

  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const cidades = JSON.parse(data);
      callback(estado.nome, cidades);
    });
  }).on('error', err => console.error(err));
}

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

  let html = `
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      h1 { text-align: center; }
      .estado { margin-bottom: 30px; }
      .lista {
        max-height: 250px; 
        overflow-y: scroll; 
        border: 1px solid #ccc; 
        padding: 10px; 
        background: #f9f9f9;
        column-count: 3; /* divide em 3 colunas */
        column-gap: 20px;
      }
      li { list-style: none; margin: 3px 0; }
    </style>
    <h1>Cidades por Estado</h1>
  `;

  let count = 0;
  estados.forEach(estado => {
    buscarCidades(estado, (nome, cidades) => {
      html += `<div class="estado"><h2>${nome}</h2><div class="lista"><ul>`;
      cidades.forEach(cidade => {
  html += `<li>${cidade.nome} (Estado: ${cidade.microrregiao.mesorregiao.UF.sigla})</li>`;
});
/* Mostrar na tela as cidades de cada estado pertencente e também vai imprimir a sigla correspondente a cada estado.
*/
      html += '</ul></div></div>';

      count++;
      if (count === estados.length) {
        res.end(html);
      }
    });
  });
}).listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});