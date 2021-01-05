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

    <?php include "header.php";

        $username = $_SESSION['usuario']; 
        $pontos = $_GET['pontos']; 
        $tempo = $_GET['tempo']; 

        $pontosAsString = strval($pontos);
        $tempoAsString = strval($tempo);

        // Saving match to database
        try {
            $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");
            $sql = "INSERT INTO matches
                VALUES('$username', $pontosAsString, 'Normal', $tempoAsString)";

            $conn->exec($sql);

        } catch(PDOException $e) {
            echo "Ocorreu um erro: " .$e->getMessage();
        }
    ?>
    <div class="conteudo">
        <div class="perdeu">
             <?php 
             echo '
                <h2>Acabou a partida de <span class="sucesso">' .$username.
                 '</span> com um total de <span class="sucesso">' .$pontos.
                  '</span> pontos, em um tempo de <span class="sucesso">' .$tempo. 
                  '</span> na dificuldade <span class="sucesso">Normal</span>.</h2>
                <p><a href="jogo.php"><button class="retry">Jogar Novamente</button></a></p> '
            ?>
        </div>
    </div>

    <?php include "footer.php"; ?>

</body>

</html>

<?php } ?>