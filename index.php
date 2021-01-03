<?php 
    session_start();
    if(isset($_SESSION['logado'])){
        $logado = $_SESSION['logado'];
    }else{
        $logado = 0;
    }
    if($logado != 0){
        header('Location: menu.php');
    }else{
?>
<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rolling Tetris</title>
    <style>
         <?php include "css/styles.css"; ?>
    </style>
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Goldman:wght@400;700&display=swap" rel="stylesheet">
</head>

<body>
    <?php $aviso = isset($_GET['aviso']) ? ($_GET['aviso']) : 0; ?>

    <?php include "raw_header.php"; ?>

    <div class="corpo-login">
        <h2 class="login-label h2-login">
            Login
        </h2>
        <?php if($aviso == 2){ ?>    
            <p class="sucesso">O Usuário Foi Deslogado com Sucesso.</p>
        <?php } ?>
        <?php if($aviso == 3){ ?>    
            <p class="erro">É Necessário Realizar o Login para Acessar esta Página.</p>
        <?php } ?>
        <form class="input-cadastro" method="post" action="verifica_usuario.php" id="verifica_usuario">
            <input placeholder="Usuário" name="usuario" id="usuario"> <br>
            <input type="password" name="senha" id="senha" placeholder="Senha"> <br>
            <?php if($aviso == 1){ ?>    
                <p class="erro">O Usuário ou Senha Digitados Estão Incorretos.</p>
            <?php } ?>
            <div class="links-container">
                <button type="submit" class="entrar">
                    Entrar
                </button>
                <a href="cadastro.php">
                    Não possui uma conta? Faça o cadastro
                </a>
            </div>
        </form>
    </div>
</body>

</html>

<?php } ?>