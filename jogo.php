<?php 
    session_start();
    $logado = $_SESSION['logado'];
    if($logado != 1){
        header('Location: index.php?aviso=3');
    }else{
?>
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
         <?php include "css/styles.css"; ?>
    </style>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap" rel="stylesheet">
    <title>Rolling Tetris</title>
</head>

<body>

    <?php include "header.php"; ?>

    <div class="table-picker" id="table-picker">
        <p>Escolha o tamanho do tabuleiro:</p>
        <form id="table-picker-form">
            <div class="table-picker-input">
                <!-- <p>Largura:</p> -->
                <!-- <input id="width" type="number" required> -->
            </div>
            <div class="table-picker-input">
                <!-- <p>Altura:</p> -->
                <!-- <input id="height" type="number" required> -->
            </div>
            <button id="btn-table-picker">Jogar</button>
        </form>
    </div>

    <div class="container">
        <div class="content">
            <div class="grid">
                <!--game table-->
            </div>
            <div class="game-stats">
                <h3 id="time"><span id="minutes">00</span> : <span id="seconds">00</span> </h3>
                <div class="wrapper">
                    <div class="fields">
                        <h3>Pontuação: </h3>
                        <h3>Linhas Eliminadas: </h3>
                        <h3>Dificuldade: </h3>
                    </div>
                    <div class="values">
                        <h3><span class="score">0</span></h3>
                        <h3><span class="lines">0</span></h3>
                        <h3>Normal</h3>
                    </div>
                </div>
                <div class="actions">
                    <a href="menu.php" id="btn-secondary">
                        Voltar
                    </a>
                    <a href="ranking_global.php" id="btn-primary">
                        Ver Ranking
                    </a>
                </div>
            </div>
        </div>
    </div>

    <?php include "footer.php"; ?>

    <script src="scripts.js"></script>
</body>

</html>

<?php } ?>