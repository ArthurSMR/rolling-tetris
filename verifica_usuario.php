<?php
	
	session_start();
	
	require_once('conexao.php');

	$usuario = $_POST['usuario'];
	$senha = $_POST['senha'];

	$sql = " SELECT * FROM tb_user WHERE usuario = '$usuario' AND senha = '$senha' ";

	$objDb = new db();
	$link = $objDb->conecta_bd();

	$conecta_user = mysqli_query($link, $sql);

	if($conecta_user){
		$user = mysqli_fetch_array($conecta_user);

		if(isset($user['usuario'])){
			
			$_SESSION['logado'] = 1;
			$_SESSION['usuario'] = $usuario;

			header('Location: menu.php');
		}else{
			header('Location: index.php?aviso=1');
		}

	}else{
		echo "Erro na consulta";
	}
	
?>