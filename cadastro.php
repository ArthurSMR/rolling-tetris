<?php 
    session_start();
    $logado = $_SESSION['logado'];
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

    <?php include "raw_header.php"; ?> 

    <div class="main-container">
        <div class="corpo-cadastro">
            <h1 class="form-title">
                Cadastro
            </h1>
            <form class="cadastro"  method="post" action="registra_usuario.php" id="registra_usuario">
                <div>
                	<h3>Usuário</h3>
                    <input type="text" name="usuario" id="usuario" required="true">
                    
                    <h3>Senha</h3>
                    <input type="password" name="senha" id="senha" required="true">
                </div>
                <div class="column">
                    <h3>Nome Completo</h3>
                    <input type="text" name="nome" id="nome" required="true">
                   
                    <h3>Data de Nascimento</h3>
                    <input type="date" name="data" id="data" required="true">
                    
                    <h3>CPF</h3>
                    <input type="text" name="cpf" id="cpf" required="true">
                    
                    <h3>Telefone</h3>
                    <input type="text" name="telefone" id="telefone" required="true">
                    
                    <h3>Email</h3>
                    <input type="email" name="email" id="email" required="true">
                </div>
                <div class="buttons-container">
                	<a class="cancelar" href="index.php">Voltar</a>
                	<button type="submit">Cadastrar</button>
            	</div>
            </form>
	    </div>
    </div>
</body>

</html>

<?php } ?>