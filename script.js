
        //gera um vetor com números aleátorios
        function geradorDeVetor() {
            var vetor = [];
            var tamanho = 32;
            var numero;
            var verificacao = false;
            var quantidade;
            for (let i = 0; i < tamanho; i++) {
                while (verificacao == false) {
                    quantidade = 0;
                    numero = (Math.floor((Math.random() * tamanho)));
                    for (let j = 0; j < vetor.length; j++) {
                        if (vetor[j] == numero) {
                            quantidade++;
                        }
                    }
                    if (quantidade == 0) {
                        vetor.push(numero);
                        verificacao = true;
                    }
                }
             verificacao = false;
            }
            return vetor;
        }

        //função para sortear os confrontos dos 16avos de final
        function sorteiaConfrontos(nomes) {

            var vetorAleatorio = geradorDeVetor();
            var card16avos = $(".col_16avos").find("li"); //pegar todos os "li" das 16-avos de final

            for (let i = 0; i < vetorAleatorio.length; i++) {
                $(card16avos[i]).html("" + nomes[vetorAleatorio[i]] + "");
            }
        }

        $(document).ready(function () {
            
            var nomes = ["Artur",
            "Fofão",
            "Bryan",
            "Caio",
            "Dener",
            "Veazey",
            "Germano",
            "Gui",
            "Futebol",
            "Paloma",
            "Ícaro",
            "Caxueira",
            "Bernola",
            "Biscoito",
            "Mari",
            "Matheus",
            "Mathias",
            "Rei",
            "Rita",
            "Will",
            "Piu-Piu",
            "Vitor",
            "Chrys",
            "Phelps",
            "Pedro",
            "Raquel",
            "Gustavo",
            "Angelo",
            "Miguel",
            "Maromba",
            "Lola",
            "Henrique"]

            sorteiaConfrontos(nomes);
            // Atribui id //
            var listas = []

            listas[0] = $(".col_16avos").find("ul");
            listas[1] = $(".col_oitavas").find("ul");
            listas[2] = $(".col_quartas").find("ul");
            listas[3] = $(".col_semis").find("ul");
            listas[4] = $(".col_final").find("ul");
            
            for(let i=0; i<listas.length; i++){
                for (let j=0; j<listas[i].length; j++){
                    if(j>=listas[i].length/2){
                        $(listas[i][j]).attr("id", j - listas[i].length/2);
                    }else{
                        $(listas[i][j]).attr("id", j);
                    }
                }
            }


            var chave = [];
            chave[0] = "diferente de nada";
            chave[1] = "diferente de nada";

            // Clique no nome
            $(".card li").click(function(){
                chave[0] = $(this); // Primeira opcao
                chave[1] = $($(this).siblings()[0]); // Segunda opcao
                
                if(chave[1].text() != "" && chave[0].text() != ""){ // Se os campos não estiverem vazios
                    // Animacao do confronto
                    var width100 = 100;
                    $("#confronto").css({"display":"block", "height":$("body").height()-$("#titulo").height()}); 
                    $(".opcao img").animate({
                        "width": width100+'%',
                        "height": 480,
                    }, 1000 );
                
                    // Coloca os nomes
                    if(chave[1].text() == chave[0].next().text()){
                        $($(".opcao").children()[1]).text(chave[0].text());
                        $($(".opcao").children()[3]).text(chave[1].text());
                    }else{
                        $($(".opcao").children()[1]).text(chave[1].text());
                        $($(".opcao").children()[3]).text(chave[0].text());     
                    }
                    
                    // Coloca as imagens
                    $("#imagem_um").attr("src", "alunos/" + nomes.indexOf($("#imagem_um").next().text()) +".jpeg");  //coloca a imagem correta
                    $("#imagem_dois").attr("src", "alunos/" + nomes.indexOf($("#imagem_dois").next().text()) +".jpeg"); //coloca a imagem correta
                }
           });

        //Escolha do vencedor
        var j=0;

           $(".opcao").click(function(){
                var champ =  $(this).find("h3").text() == chave[0].text() ? chave[0] : chave[1];   // Vencedor do duelo 
                var looser = $(this).find("h3").text() != chave[0].text() ? chave[0] : chave[1];    // Perdedor do duelo
                var proximo; // Armazena a coluna posterior a em que houve o confronto
                var position // Posicao onde sera inserido o nome do campeao;
                
                // Se estiver do lado direito
                if ($($(champ).parents()[2]).attr("class").includes("direita")){
                        proximo = $($(champ).parents().prev()).children();
                }else{ // Se não
                    if ($(champ).attr("class").includes("ultimo")){
                        proximo = $(champ).parents().next()[0];
                    }else{
                        proximo = $(champ).parents().next()[1];
                    }
                }

                if ($($(proximo).parents()[0]).attr("class") != undefined){
                    position = parseInt($(champ).parent().attr("id")); // Posicao onde sera colocado o campeao
                    // Coloca nome do vencedor no proximo
                    if($($(proximo).parents()[0]).attr("class").includes("col_final")){
                        if($($(champ).parents()[2]).attr("class").includes("direita")){
                            $($(proximo).find("li")[position+1]).text(champ.text());    
                        }else{
                            $($(proximo).find("li")[position]).text(champ.text());
                        }
                    }else{
                        $($(proximo).find("li")[position]).text(champ.text());
                    }
                    
                    // Troca todos os nomes do perdedor pelo do vencedor, exceto os que estão antes do confronto 
                    var participantes = [];
                    var i;
                    if ($($(looser).parents()[2]).attr("class").includes("col_16avos")){
                        participantes = participantes.concat($(".col_oitavas").children().find("li").toArray());
                        participantes = participantes.concat($(".col_quartas").children().find("li").toArray());
                        participantes = participantes.concat($(".col_semis").children().find("li").toArray());
                        participantes = participantes.concat($(".col_final").children().find("li").toArray());
                    }else if ($($(looser).parents()[2]).attr("class").includes("col_oitavas")){
                        participantes = participantes.concat($(".col_quartas").children().find("li").toArray());
                        participantes = participantes.concat($(".col_semis").children().find("li").toArray());
                        participantes = participantes.concat($(".col_final").children().find("li").toArray());
                    }else if($($(looser).parents()[2]).attr("class").includes("col_quartas")){
                        participantes = participantes.concat($(".col_semis").children().find("li").toArray());
                        participantes = participantes.concat($(".col_final").children().find("li").toArray());
                    }else if($($(looser).parents()[2]).attr("class").includes("col_semis")){
                        participantes = participantes.concat($(".col_final").children().find("li").toArray());
                    }
                    for(i=0; i<participantes.length; i++){
                        if($(participantes[i]).text() == $(looser).text()){
                            $(participantes[i]).text($(champ).text());
                        }
                    }

                }
                // Se for final
                if($($(champ).parents()[2]).attr("class").includes("col_final")){
                    $(".campeao h1").text("Parabéns " + $(champ).text() + ", nosso(a) campeão(ã)!"); // Coloca o nome do campeao
                    $(".campeao img").attr("src", "alunos/" + nomes.indexOf($(champ).text()) +".jpeg");
                    $(".pyro").attr("class", "pyro d-block"); // Dispara a animacao
                    
                    // Usuário é forçado à recarregar a página para jogar de novo
                    $(".card").css("pointer-events", "none");
                }

                // Volta pro jogo
                $("#confronto").css("display", "none");
                $("#confronto .opcao img").css({"width":"10px", "height":"10px"});

           });

           //sistema para autoria de elaboração do bracket e compartilhamento(não finalizado)
            $("#Autoria div").children("button").click(function () {
                $("#NomeAutor").prop("disabled", true);
                $(this).text("Compartilhar");
            })

        });

