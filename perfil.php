<?php
    ob_start();

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

        $userId = $_SESSION['user_id'];

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
                            $usuario = $row['usuario'];
                            echo "<input name='usuario' value='$usuario'>";
                        ?>
                        <h3>
                            Nome *
                        </h3>
                        <?php 
                            $nome = $row['nome'];
                            echo "<input name='nome' value='$nome'>";
                        ?>
                         <h3>
                            Email *
                        </h3>
                        <?php 
                            $email = $row['email'];
                            echo "<input name='email' value='$email'>";
                        ?>
                        <h3>
                            CPF *
                        </h3>
                        <?php 
                            $cpf = $row['cpf'];
                            echo "<input name='cpf' value='$cpf'>";
                        ?>
                    </div>

                    <div class="second-column">
                        <h3>
                            Senha *
                        </h3>
                        <?php 
                            $senha = $row['senha'];
                            echo "<input name='senha' value='$senha'>";
                        ?>
                        <h3>
                            Telefone
                        </h3>
                        <?php 
                            $telefone = $row['telefone'];
                            echo "<input name='telefone' value='$telefone'>";
                        ?>
                        <h3>
                            Data
                        </h3>
                        <?php 
                            $data = $row['data'];
                            echo "<input name='data' type='date' value='$data'>";
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
                $user = array($_POST["usuario"], $_POST["nome"], $_POST["senha"], $_POST["telefone"], $_POST["email"], $_POST["cpf"], $_POST["data"]);
    
                $sql = "UPDATE tb_user SET usuario='$user[0]', nome='$user[1]', senha='$user[2]', telefone='$user[3]', email='$user[4]', cpf='$user[5]', data='$user[6]' WHERE user_id=$userId";
    
                $conn->exec($sql);

                header("Refresh:0");
            }
        } catch (PDOException $e) {
            echo "Update error: " . $e->getMessage();
        }
    ?>

    <?php include "footer.php"; ?>

</body>

</html>

<?php } ?>