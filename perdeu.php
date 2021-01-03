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
        <div class="perdeu">
                <h2>Acabou a partida de <span class="sucesso">(Nome do usuário)</span> com um total de <span class="sucesso">(1000)</span> pontos, em um tempo de <span class="sucesso">(00:00)</span> na dificuldade <span class="sucesso">(Normal)</span>.</h2>
                <p><a href="jogo.php"><button class="retry">Jogar Novamente</button></a></p>
        </div>
    </div>

    <?php include "footer.php"; ?>

</body>

</html>

<?php } ?>