 Analisador de Hierarquia de Palavras

Analisador de Hierarquia de Palavras
====================================

Este programa permite analisar frases contando palavras em um nível de profundidade específico dentro de uma estrutura hierárquica. É útil para analisar dados hierárquicos, como objetos aninhados, onde você deseja descobrir quantas vezes certas palavras aparecem em um determinado nível da hierarquia.

Índice
------

*   [Instalação](#instalacao)
*   [Uso](#uso)
*   [Opções](#opcoes)
*   [Exemplos](#exemplos)
*   [Como Funciona](#como-funciona)

Instalação
----------

1.  Clone o repositório:
    
        git clone https://github.com/LuizFernando991/wa
    
2.  Navegue até o diretório do projeto:
    
        cd backend
    
3.  Instale as dependências:
    
        npm install
    

Uso
---

O programa é executado via linha de comando. Ele fornece um comando para analisar uma frase e contar as ocorrências de palavras em um nível específico da hierarquia.

    bun run cli.ts analyze –depth <n> –verbose (optional) “{phrase}”

Opções
------

*   `-d, --depth <número>`: Especifica o nível de profundidade na hierarquia para buscar palavras (índice começando em 1). O padrão é 1 se não for fornecido.
*   `-v, --verbose`: Exibe informações adicionais, incluindo o tempo gasto para carregar os parâmetros e analisar a frase.

Exemplos
--------

1.  **Análise Básica:**
    
    Analise a frase "Eu vi gorilas e papagaios" no nível de profundidade 3:
    
      bun run src/cli.ts analyze --depth 3 "Eu vi gorilas e papagaios”
    
2.  **Saída Verbosa:**
    
    Analise a frase "Eu amo papagaios" no nível de profundidade 2 com saída detalhada:
    
        bun run src/cli.ts analyze --depth 2 "Eu amo papagaios” --verbose
    

Como Funciona
-------------

1.  **Carregamento da Hierarquia:** O programa carrega uma hierarquia em JSON de um arquivo localizado em `dicts/hierarchy.json`.
2.  **Indexação da Hierarquia:** A hierarquia é indexada por profundidade, organizando os dados hierárquicos em níveis.
3.  **Contagem de Palavras:** O programa então conta as ocorrências das palavras especificadas na profundidade desejada na hierarquia.
4.  **Saída:** O programa exibe a contagem de cada palavra na profundidade especificada. Se nenhuma palavra for encontrada no nível, ele exibe `0`. No modo verboso, ele também exibe o tempo gasto para carregar a hierarquia e realizar a análise.
