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

<?php 
        include "header.php"; 

        // Retriving data
        try {
            $conn = new PDO("mysql:host=localhost;dbname=tetris", "root", "");
            $stmt = $conn->query("SELECT * FROM matches ORDER BY score DESC LIMIT 10");
        } catch(PDOException $e) {
            echo "Ocorreu um erro: " .$e->getMessage();
        }
    ?>

    <div class="history-content">
        <h2>
            Ranking Global
        </h2>
        <table class="table-history">
            <tr>
                <th>Username</th>
                <th>Pontuação</th>
                <th>Dificuldade</th>
                <th>Tempo</th>
            </tr>
            
            <?php
            
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                echo '<tr>
                        <td>' .$row["username"]. ' </td>
                        <td>' .$row["score"]. ' </td>
                        <td>' .$row["difficulty"]. ' </td>
                        <td>' .$row["time_played"]. ' </td>
                    </tr>';
            } 
            ?>
            
        </table>
    </div>

    <?php include "small_footer.php"; ?>

</body>

</html>

<?php } ?>