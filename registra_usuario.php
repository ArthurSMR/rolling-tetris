<?php

	require_once('conexao.php');

	$usuario = $_POST['usuario'];
	$senha = $_POST['senha'];
	$nome = $_POST['nome'];
	$data = $_POST['data'];
	$cpf = $_POST['cpf'];
	$telefone = $_POST['telefone'];
	$email = $_POST['email'];

	$objDb = new db();
	$link = $objDb->conecta_bd();

	$inserir_aluno = "INSERT INTO tb_user(usuario, senha, nome, data, cpf, telefone, email) VALUES('$usuario', '$senha', '$nome', '$data', '$cpf', '$telefone', '$email')";

	$usuario_existe = "SELECT usuario FROM tb_user WHERE usuario = '$usuario'";

	$conecta_bd_usuario = mysqli_query($link, $usuario_existe);

	if($conecta_bd_usuario){
		$usuario_bd = mysqli_fetch_array($conecta_bd_usuario);

		if(isset($usuario_bd['usuario'])){
			header('Location: cadastro.php?erro=1');
		}else{
			if(mysqli_query($link, $inserir_aluno)){
				echo $usuario_existe;
				header('Location: cadastrado.php');
			}else{
				echo "Erro ao registrar";
			}
		}
	}else{
		echo "erro na consulta";
	}
	
?>