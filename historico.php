<?php 
    session_start();
    $logado = $_SESSION['logado'];
    if($logado != 1){
        header('Location: index.php?aviso=3');
    }else{
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Histórico</title>
    <style>
         <?php include "css/styles.css"; ?>
    </style>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap" rel="stylesheet">
</head>

<body>

    <?php include "header.php"; ?>
    
    <div class="history-content">
        <h2>
            Histórico de Partidas
        </h2>
        <table class="table-history">
            <tr>
                <th>Nome</th>
                <th>Pontuação</th>
                <th>Nível atingido</th>
                <th>Tempo</th>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Difícil</td>
                <td>04:56</td>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Normal</td>
                <td>04:22</td>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Normal</td>
                <td>11:20</td>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Fácil</td>
                <td>21:41</td>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Difícil</td>
                <td>02:10</td>
            </tr>
        </table>
    </div>

    <?php include "footer.php"; ?>

</body>

</html>

<?php } ?>