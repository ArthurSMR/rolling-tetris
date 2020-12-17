<!DOCTYPE html>
<html lang="pt">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rolling Tetris</title>
    <link rel="stylesheet" type="text/css" href="css/styles.css" />
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

            <form>
                <div class="first-column">
                    <h3>
                        Usuário
                    </h3>
                    <input>
                    <h3>
                        Nome
                    </h3>
                    <input> <br>
                    <h3>
                        Senha
                    </h3>
                    <input type="password"> <br>
                </div>

                <div class="second-column">
                    <h3>
                        Email
                    </h3>
                    <input type="email"> <br>
                    <h3>
                        Sobrenome
                    </h3>
                    <input> <br>
                </div>
            </form>

            <div class="buttons-container">
                <a class="cancelar" href="index.php">Cancelar</a>
                <a class="cadastrar" href="index.php">Cadastrar</a>
            </div>
        </div>
    </div>
</body>

</html>