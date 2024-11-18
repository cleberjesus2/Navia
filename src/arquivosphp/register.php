<?php
include 'db.php';

// Configuração para resposta em JSON
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Verificar se é uma requisição OPTIONS
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Captura os dados enviados via JSON
$dados = json_decode(file_get_contents("php://input"));

if (isset($dados->nome) && isset($dados->telefone) && isset($dados->email) && isset($dados->senha)) {
    // Verifica se a tabela tem os campos corretos
    $sql = "INSERT INTO usuarios (nome, telefone, email, senha) VALUES (:nome, :telefone, :email, :senha)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nome', $dados->nome);
    $stmt->bindParam(':telefone', $dados->telefone);
    $stmt->bindParam(':email', $dados->email);
    $stmt->bindParam(':senha', password_hash($dados->senha, PASSWORD_BCRYPT));

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Usuário cadastrado com sucesso!"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar o usuário!"]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos!"]);
}
?>
