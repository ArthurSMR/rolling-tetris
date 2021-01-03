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

        // Creating table
        try {
            $conn = new PDO("mysql:host=localhost;dbname=matchesDB", "root", "");
            $createTableSQLCommand = "CREATE TABLE matches (
                user_id int PRIMARY KEY,
                username varchar(100),
                score int)";

            $conn->exec($createTableSQLCommand);
            echo "create with sucess";
        } catch(PDOException $e) {
            echo "Ocorreu um erro: " .$e->getMessage();
        }
        
        // Inserting mock
        // try {
        //     $conn = new PDO("mysql:host=localhost;dbname=matchesDB", "root", "");
        //     // $sql = "INSERT INTO matches values(
        //     //     Arthur"

        //     while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        //         echo "<p>Usuário: " .$row["usuario"]. " </p>";
        //     }
        // } catch(PDOException $e) {
        //     echo "Ocorreu um erro: " .$e->getMessage();
        // }

        // // Retriving data
        // try {
        //     $conn = new PDO("mysql:host=localhost;dbname=matchesDB", "root", "");
        //     $stmt = $conn->query("SELECT * FROM matches");

        //     while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        //         echo "<p>Usuário: " .$row["usuario"]. " </p>";
        //     }
        // } catch(PDOException $e) {
        //     echo "Ocorreu um erro: " .$e->getMessage();
        // }
    ?>

    <div class="history-content">
        <h2>
            Ranking Global
        </h2>
        <table class="table-history">
            <tr>
                <th>Username</th>
                <th>Pontuação</th>
                <th>Nível máximo</th>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Difícil</td>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Normal</td>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Normal</td>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Fácil</td>
            </tr>
            <tr>
                <td>Menino Ney</td>
                <td>5000pts</td>
                <td>Difícil</td>
            </tr>
        </table>
    </div>

    <?php include "footer.php"; ?>

</body>

</html>

<?php } ?>