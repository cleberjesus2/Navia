<?php
// Configurações do banco de dados
$servername = "localhost";
$username = "root"; // Substitua pelo seu usuário
$password = ""; // Substitua pela sua senha
$dbname = "naviaapp"; // Substitua pelo nome correto do seu banco de dados

header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["status" => "erro", "mensagem" => "Conexão falhou: " . $conn->connect_error]));
}

// Recebe os dados do produto
$nome = $_POST['name'] ?? '';
$descricao = $_POST['description'] ?? '';
$preco = $_POST['price'] ?? 0;
$estoque = $_POST['stock'] ?? 0;
$categoria = $_POST['category'] ?? '';
$cpfCnpj = $_POST['cpfCnpj'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$image = $_FILES['image'] ?? null;

// Validação básica dos dados
if (empty($nome) || empty($descricao) || empty($preco) || empty($estoque) || empty($categoria) || empty($cpfCnpj) || empty($telefone) || !$image) {
    echo json_encode(["status" => "erro", "mensagem" => "Todos os campos são obrigatórios."]);
    exit;
}

// Diretório onde as imagens serão salvas
$target_dir = "uploads/";
$target_file = $target_dir . basename($image["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Verifica se a imagem é um arquivo de imagem real
if (isset($_POST["submit"])) {
    $check = getimagesize($image["tmp_name"]);
    if ($check === false) {
        echo json_encode(["status" => "erro", "mensagem" => "O arquivo não é uma imagem."]);
        exit;
    }
}

// Move o arquivo para o diretório de uploads
if (move_uploaded_file($image["tmp_name"], $target_file)) {
    // Insere os dados do produto no banco de dados
    $sql = "INSERT INTO produtos (nome, descricao, preco, estoque, categoria, cpfCnpj, telefone, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdissss", $nome, $descricao, $preco, $estoque, $categoria, $cpfCnpj, $telefone, $image["name"]);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Desculpe, ocorreu um erro ao fazer o upload da imagem."]);
}

$conn->close();
?>