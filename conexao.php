<?php

	class db {
		private $host = 'localhost';
		private $usuario = 'root';
		private $senha = '';
		private $database = 'tetris';
	
		public function conecta_bd(){
			$conecta = mysqli_connect($this->host, $this->usuario, $this->senha, $this->database);
			mysqli_set_charset($conecta, 'utf8');

			if(mysqli_connect_errno()){
				echo "Eroo ao tentar se conectar com o banco de dados MYSQL" . mysqli_connect_error();
			}

			return $conecta;

		}

	}

?>