# App PIX_NA_MAO
OBS:segundo projeto da materia
## Controle pessoal e MEI de pix
um app para cadastro rapido de clientes e gerenciamento de pix 

💡 Sobre o app
o usuário vai poder cadastrar sua chave pix da sua instituição financeira e poder gerar um QRCODE com o valor da venda para o cliente podendo anotar os <b>STATUS</b> 
<ul>
<li>PAGO</li>
<li>Agendado</li>
<li>Não Recebido</li>
</ul>

Exemplo (Cliente:Fulana, pix:banco nacional, valor:250)

com isso o usuário vai poder ter um controle melhor sobra as vendas realizadas via pix , pois muitos pequenos vendedores não utilizam maquinas (fazem fiado )

✅ Funcionalidades básicas
 
 [x] Criar um cliente 

 [x] Cadastrar a chave PIX

 [x] Gerar QRCODE com chave pix + valor venda

 [] Controlar pix agendados

 [] Cadastrar Clientes na aba de devedores

 [] Exportar em CSV

## [Link Wiki](https://github.com/Pett97/App_PIX_NA_MAO/wiki)
## [Dowload Apk ](https://drive.google.com/file/d/1PCKywiyOwnK69E8q-14ieynSsVgHA82K/view?usp=sharing)


## 🧠 Protótipos
Figma

[Protótipo](https://www.figma.com/design/6Qqmo27nODbexl5blpjA4s/PixNaMao?node-id=1-16&p=f&t=lZLvzoMGYl7d3dkE-0)

## Principais Telas 
_listagem de pix cadastrados
_lista de clientes que estão com o status devedor

## 🗃️ Modelagem do Banco
[Link Representação Banco visual ](https://app.brmodeloweb.com/#!/publicview/6826a2cda81ba6e1612056e4)


Tabela: Cliente
| ID |      Nome     | Contato | devedor |
|--------------------|----------|----------|--|
| 1  | Fulana        | 42 9999 9999  | Sim(1)|
| 2  | Ciclana       | 42 9999 9999  | Nao(0)|

Tabela: de pixs recebidos

| ID |      Cliente     | Status | Valor | chave pix|data_agendamento|
|---------------|----------|----------|-----|--|--|
| 1  | id_cliente       | Pago  | 250    | id_chave|  |
| 2  | id_cliente       | Agendado  | 175    |id_chave|2025-12-31|

Tabela: Chaves PIXs

|ID| nome instuição | chave        |
|--|----------------|--------------|
|1| banco nacional  | exemplo-chave|



## 🗓️ Planejamento de Sprints
#### [] Sprint 1
   [x]Protótipos no Figma
   
   [x]Modelagem do banco

   [x] Setup do repositório Expo

#### [] Sprint 2
   [x] Cadastro de PR

   [x] Lista com filtros simples

   [] Edição de status e observações

#### [] Sprint 3
   [] Histórico de alterações

   [] Validações e testes

   [] Notificações locais

#### [] Sprint 4
   [] Polimento visual

   [] Ajustes finais

   [] Testes

   [x] Publicação do projeto

