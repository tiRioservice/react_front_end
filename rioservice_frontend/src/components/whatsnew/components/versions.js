const version = [
    {
        version: '0.6.0-Pré-alpha',
        date: '24 de Novembro de 2022',
        minor: [
            {
                number: 1,
                desc: "Foi adicionada a funcionalidade de inserir novo item no estoque. Agora todo item que for inserido, estará registrado em um banco de dados."
            },
            {
                number: 2,
                desc: "Foi adicionada a funcionalidade de listar todos os itens do estoque na Área de estoque."
            },
            {
                number: 3,
                desc: "Foi adicionada a funcionalidade de ver detalhes dos itens do estoque. Clique no botão com icone de olho para ver estes detalhes."
            }
        ]
    },
    {
        version: '0.7.0-Pré-alpha',
        date: "30 de Novembro de 2022",
        minor: [
            {
                number: 1,
                desc: "Foi adicionada a Área de fornecedores."
            },
            {
                number: 2,
                desc: "Foi adicionada a funcionalidade de inserir novos fornecedores no banco de dados do sistema."
            },
            {
                number: 3,
                desc: "Foi adicionada a funcionalidade de salvar um item do estoque, apos a edição."
            }
        ]
    },
    {
        version: "0.8.1-Pré-alpha",
        date: "1 de Dezembro de 2022",
        minor: [
            {
                number: 1,
                desc: "Foi adicionada esta área de novidades, para que os usuarios descubram de forma clara o que mudou."
            },
            {
                number: 2,
                desc: "Foi adicionada a funcionalidade de listar todos os fornecedores. Os fornecedores que são inseridos no sistema, a partir de agora, ficarão listados na aárea de fornecedores."
            },
            {
                number: 3,
                desc: "Foi adicionada a funcionalidade de ver detalhes do fornecedor listado, através do botão com icone de olho. Agora, ao clicar neste botão, todas as inforações relacionadas ao fornecedor, será mostrada na tela."
            }
        ]
    },
    {
        version: "0.8.3-Pré-alpha",
        date: "2 de Dezembro de 2022",
        minor: [
            {
                number: 1,
                desc: "A partir de agora, durante a rolagem de qualquer página que tenha conteúdo extenso, o topo do app se mantem fixo para facilitar acesso ao menu."
            }
        ],
        bugfix: [
            {
                number: 1,
                desc: "Foi reparada, a função de listagem de cargos. Estava quebrando ao tentar mostrar a lista completa de cargos registrados no sistema."
            },
            {
                number: 2,
                desc: "Foi corrigido, o bug de atualização de item do estoque."
            },
            {
                number: 3,
                desc: "Foi corrigido, o bug de inserção de bases."
            }
        ]
    },
    {
        version: "0.9.0-Pré-alpha",
        date: "6 de Dezembro de 2022",
        bugfix: [
            {
                number: 1,
                desc: "Resolvido um bug de conexão com o banco de dados que estava impedindo qualquer operação. Foi um erro de programação, desculpe! Pretendo diminuir a ocorrência de erros do tipo."
            },
            {
                number: 2,
                desc: "Resolvido um bug de inserção de cargo."
            }
        ]
    },
    {
        version: "0.9.1-Pré-alpha",
        date: "7 de Dezembro de 2022",
        bugfix: [
            {
                number: 1,
                desc: "Corrigidos bugs da Área de cargos."
            },
            {
                number: 2,
                desc: "Corrigidos bugs da Área de bases."
            },
            {
                number: 3,
                desc: "Corrigidos bugs da Área de colaboradores."
            }
        ]
    },
    {
        version: "0.9.3-Pré-alpha",
        date: "28 de Dezembro de 2022",
        minor:[
            {
                number: 1,
                desc: "Na área de Estoque, foi adicionado um campo de seleção de fornecedor no formulário de inserção de item. Assim será possível, no momento do cadastro do item, vincular o fornecedor deste item. Será util para montar as cotações. Este mesmo dado será exibido ao ver detalhes sobre um item do estoque. Não é possível editar o vínculo sem remover o item e inserir novamente, pois cada vinculo possui um ID único para evitar a duplicação de registros em uma base e para possibilitar o registro de itens iguais em bases diferentes."
            }
        ],
        bugfix: [
            {
                number: 1,
                desc: "Mudança geral no esquema de conexão com banco de dados. O esquema anterior gerou um bug que encerrava a conexão e impedia a execução de operações básicas do sistema."
            },
            {
                number: 2,
                desc: "Correções na Interface de Usuário."
            },
            {
                number: 3,
                desc: "Link para Notas de atualização agora se encontra na área de credenciais."
            }
        ]
    },
    {
        version: "0.9.6-Pré-alpha",
        date: "28 de Fevereiro de 2023",
        minor:[
            {
                number: 1,
                desc: "Inserido um campo adicional à tabela de fornecedores. Agora é possível registrar uma chave PIX no cadastro de um fornecedor, caso o método de pagamento escolhido seja este."
            }
        ],
        bugfix: [
            {
                number: 1,
                desc: "Corrigidos bugs do formulário de inserção de fornecedores, que impediam o registro."
            },
            {
                number: 2,
                desc: "Corrigido bug do botão ver fornecedor."
            }
        ]
    },
    {
        version: "0.9.7-Pré-alpha",
        date: "2 de Março de 2023",
        minor:[
            {
                number: 1,
                desc: "O formulário de inserção de fornecedores foi revisado e alterado. Agora é possível registrar um fornecedor, selecionando uma forma de pagamento para completar o cadastro. Será possível também, registrar o mesmo sem forma de pagamento informada e editar estes dados posteriormente."
            }
        ],
        bugfix: [
            {
                number: 1,
                desc: "Resolvido o bug do tipo da forma de pagamento ao inserir um fornecedor."
            },
            {
                number: 2,
                desc: "Resolvido o bug do item duplicado no estoque. Antes ao adicionar um item, ele era exibido duas vezes na listagem, mesmo que no banco de dados conste um item adicionado. Agora só exibe o item que foi registrado."
            }
        ]
    },
    {
        version: "1.0-Beta1",
        date: "27 de Março de 2023",
        bugfix: [
            {
                number: 1,
                desc: "Refatoração das folhas de estilo."
            }
        ]
    },
    {
        version: "1.0.1-Beta1",
        date: "11 de Maio de 2023",
        bugfix: [
            {
                number: 1,
                desc: "Corrigido bug de inserção de colaboradores. Agora é possivel inserir um endereço sem numero e se ao enviar, o endereço inserido for repetido, a operação é cancelada e o colaborador não será registrado. Neste caso, uma mensagem na tela dirá se o endereço já foi inserido ou não."
            }
        ]
    },
    {
        version: "1.2.0-Beta1",
        date: "29 de Maio de 2023",
        bugfix: [
            {
                number: 1,
                desc: "Corrigido bug na edição de colaboradores."
            }
        ]
    },
    {
        version: "1.2.1-Beta1",
        date: "30 de Maio de 2023",
        minor: [
            {
                number: 1,
                desc: "Troca de senha: Agora é possivel trocar a senha padrão de acesso ao sistema. Durante o cadastro de colaboradores, o colaborador cadastrado recebe uma senha padrão que é o seu login junto com os 4 ultimos números do cpf. Essa senha pode a partir de agora ser modificada pelo proprio colaborador em seu perfil."
            }
        ]
    },
    {
        version: "1.3.0-Beta1",
        date: "17 de Dezembro de 2023",
        minor: [
            {
                number: 1,
                desc: "Cadastro de colaboradores, através do envio de um arquivo de Excel( .xlsx ). O arquivo é lido pelo app e não é salvo no servidor, os dados extraidos são automaticamente tratados e inseridos no banco de dados. O arquivo enviado é descartado e os colaboradores inseridos são listados imediatamente."
            },
            {
                number: 2,
                desc: "Ao inserir multiplos colaboradores, utilizando um arquivo Excel, se no arquivo, o colaborador não tiver endereço cadastrado, um endereço padrão será inserido. Porém, este endereço poderá agora ser editado através do painel de cada colaborador."
            },
            {
                number: 3,
                desc: "A edição de colaboradores foi melhorada. Agora é possivel adicionar um endereço para um colaborador que não tem endereço cadastrado."
            },
            {
                number: 4,
                desc: "Durante a edição do endereço do colaborador, ao inserir um CEP ele buscará automaticamente os dados do endereço."
            },
        ],
        bugfix: [
            {
                number: 1,
                desc: "Corrigido o texto do detalhe de fornecedores. Os campos Nome fantasia, Inscrição estadual e Inscrição municipal estavam com o texto errado."
            }
        ]
    }
];

export default version;