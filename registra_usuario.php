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

	if(mysqli_query($link, $inserir_aluno)){
		header('Location: cadastrado.php');
	}else{
		echo "Erro ao registrar";
	}


	
?>