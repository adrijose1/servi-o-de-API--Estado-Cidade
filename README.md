# serviço-de-API--Estado-Cidade
Serviço de API referente Estado e cidade.

Por que escolhi essa API do IBGE.GOV?
Escolhi a API do IBGE porque ela fornece informações oficiais sobre estados, cidades e regiões do Brasil.
Por conta que se relaciona diretamente com o tema da minha aplicação, que utiliza estados e cidades.

Utilizar uma API real e incluir parâmetro de busca na url: 
https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.id}/municipios

Parâmetro de Busca(estado.id)
O parâmetro utilizado foi o ID do estado (26 = Pernambuco, 29 = Bahia, 23 = Ceará).
Esse ID é inserido na URL para obter apenas as cidades daquele estado.

Resultado Esperado da Requisição:
A requisição retorna uma lista de cidades pertencentes aos três estado PE, CE, BA, exemplo: Cidade RECIFE(estado PE).

______________________________________________________________________________________________________________________________________
Ao imprimir na tela vai retornar as cidades pertencentes de cada estado e também a sigla no lado de cada cidade ou municipio pertencente
VAI IMPRIMIR AS CIDADES E SIGLA
