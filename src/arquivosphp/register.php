<?php
include 'db.php'; 

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header(header: "Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dados = json_decode(file_get_contents("php://input"));

if (isset($dados->nome) && isset($dados->telefone) && isset($dados->email) && isset($dados->senha)) {
    try {
        $sql = "INSERT INTO usuarios (nome, telefone, email, senha) VALUES (:nome, :telefone, :email, :senha)";
        $stmt = $conn->prepare($sql);
        
        // Usando variáveis para evitar o aviso
        $nome = $dados->nome;
        $telefone = $dados->telefone;
        $email = $dados->email;
        $senha = password_hash($dados->senha, PASSWORD_BCRYPT);

        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':senha', $senha);

        if ($stmt->execute()) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Usuário cadastrado com sucesso!"]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar o usuário!"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro no banco de dados: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos!"]);
}
?>