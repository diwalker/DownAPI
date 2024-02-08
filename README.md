# DownAPI

Ferramenta de Recuperação de Dados de CPF
Esta ferramenta foi desenvolvida para obter informações associadas a números de CPF brasileiros por meio de uma API específica. Itera por uma faixa de CPFs, realiza requisições à API e salva as respostas em formato XML ou JSON.

Recursos
Iteração de CPF: O script percorre uma faixa de CPFs, realizando requisições à API para cada um.

Requisições HTTP: Gerenciamento de requisições à API utilizando a biblioteca Axios, com suporte a cabeçalhos de autenticação e tratamento de diferentes tipos de resposta (XML ou JSON).

Tratamento de Respostas: Análise e salvamento das respostas da API conforme o tipo de conteúdo. Em caso de XML, salva como arquivo XML; caso contrário, salva como arquivo JSON.

Tratamento de Erros: Registra erros em caso de falhas nas requisições ou respostas inesperadas.

Intervalo entre Requisições: Inclui um intervalo de 2 segundos entre as requisições para evitar sobrecarregar a API.
Copy code
node script.js
Dependências
axios: Usado para fazer requisições HTTP à API.
fs-promises: Promessas do sistema de arquivos para operações de leitura e gravação de arquivos.
path: Para trabalhar com caminhos de arquivos.
xml2js: Biblioteca para analisar respostas XML.
Notas
O script inclui um atraso de 2 segundos entre as requisições (await sleep(2000)) para evitar sobrecarregar a API.

Certifique-se de lidar corretamente com os cabeçalhos de autenticação ("x-auth") de acordo com os requisitos da API.

O script registra informações sobre os dados obtidos e quaisquer erros encontrados durante o processo.

Aviso
Use esta ferramenta de maneira responsável e certifique-se de estar em conformidade com os termos de uso da API sendo acessada. O uso não autorizado ou excessivo pode violar os termos de serviço.
