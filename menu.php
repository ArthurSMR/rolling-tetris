<?php session_start(); ?>
<?php 
    $logado = $_SESSION['logado'];
    if($logado != 1){
        header('Location: index.php?aviso=3');
    }else{
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <title>Rolling Tetris</title>
    <meta charset="utf-8">
    <style>
         <?php include "css/styles.css"; ?>
    </style>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap" rel="stylesheet">
</head>

<body>

    <?php include "header.php"; ?>

    <div class="conteudo">
        <div class="pagina-logado">
            <div class="title">
                <h2>Rolling Tetris</h2>
            </div>
            <ul>
                <li><a href="jogo.php">Tetris</a></li>
                <li><a href="ranking_global.php">Ranking Global</a></li>
                <li><a href="historico.php">Histórico de Partidas</a></li>
                <li><a href="perfil.php">Minha Conta</a></li>
                <li><a href="deslogar.php">Sair</a></li>
            </ul>
        </div>
    </div>

    <?php include "small_footer.php"; ?>

</body>

</html>

<?php } ?>