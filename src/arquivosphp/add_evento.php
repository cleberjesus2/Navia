<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root"; // Seu usuário
$password = "";     // Sua senha
$dbname = "naviaapp"; // Nome do banco de dados

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Cria conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $titulo = $_POST['titulo'];
  $descricao = $_POST['descricao'];
  $data_hora = $_POST['data_hora'];
  $local = $_POST['local'];
  $categoria = $_POST['categoria'];
  $cpf_cnpj = $_POST['cpf_cnpj'];
  $telefone = $_POST['telefone'];
  $numero_segurancas = $_POST['numero_segurancas'];
  
  // Verifica se foi enviada uma imagem
  if (isset($_FILES['imagem'])) {
    $imagem = $_FILES['imagem']['name'];
    // Caminho onde a imagem será armazenada
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($imagem);
    move_uploaded_file($_FILES["imagem"]["tmp_name"], $target_file);
  } else {
    $imagem = NULL; // Caso não tenha imagem
  }

  $sql = "INSERT INTO eventos (titulo, descricao, data_hora, local, categoria, cpf_cnpj, telefone, numero_segurancas, imagem)
          VALUES ('$titulo', '$descricao', '$data_hora', '$local', '$categoria', '$cpf_cnpj', '$telefone', $numero_segurancas, '$imagem')";

  if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "sucesso", "mensagem" => "Evento criado com sucesso"]);
  } else {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao criar evento: " . $conn->error]);
  }

  $conn->close();
} else {
  echo json_encode(["status" => "erro", "mensagem" => "Método HTTP inválido"]);
}
?>
