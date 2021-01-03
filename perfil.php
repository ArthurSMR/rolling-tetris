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
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap" rel="stylesheet">
    <title>Rolling Tetris</title>
    <style>
         <?php include "css/styles.css"; ?>
    </style>
</head>

<body>

    <?php include "header.php"; ?>

    <?php 
        $sname = "localhost";
        $uname = "root";

        // to change
        $userId = 2;

        try {
            $conn = new PDO("mysql:host=$sname;dbname=tetris", $uname, null);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql = "SELECT * FROM tb_user WHERE user_id = $userId";

            $result = $conn->query($sql);
            
            $row = $result->fetch(PDO::FETCH_ASSOC);
            
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    ?>

    <div class="main-container">
        <div class="corpo-cadastro">
            <h1 class="form-title">
                Seus dados
            </h1>

            <form method="POST">
                <div class="form-content">
                    <div class="first-column">
                        <h3>
                            Usuário *
                        </h3>
                        <?php 
                            $username = $row['username'];
                            echo "<input name='username' value='$username'>";
                        ?>
                        <h3>
                            Nome *
                        </h3>
                        <?php 
                            $name = $row['name'];
                            echo "<input name='name' value='$name'>";
                        ?>
                        <h3>
                            Senha *
                        </h3>
                        <?php 
                            $password = $row['password'];
                            echo "<input name='password' value='$password'>";
                        ?>
                    </div>

                    <div class="second-column">
                        <h3>
                            Email *
                        </h3>
                        <?php 
                            $email = $row['email'];
                            echo "<input name='email' value='$email'>";
                        ?>
                        <h3>
                            Sobrenome
                        </h3>
                        <?php 
                            $surname = $row['surname'];
                            echo "<input name='surname' value='$surname'>";
                        ?>
                    </div>
                </div>
                <div class="buttons-container">
                        <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    </div>

    <?php
        try {
            if ($_SERVER["REQUEST_METHOD"] == "POST") {
                $user = array($_POST["username"], $_POST["name"], $_POST["surname"], $_POST["email"], $_POST["password"]);
    
                $sql = "UPDATE tb_user SET username='$user[0]', name='$user[1]', surname='$user[2]', email='$user[3]', password='$user[4]' WHERE user_id=$userId";
    
                $conn->exec($sql);
            }
        } catch (PDOException $e) {
            echo "Update error: " . $e->getMessage();
        }
    ?>

    <?php include "footer.php"; ?>

</body>

</html>

<?php } ?>