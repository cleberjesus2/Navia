<?php
include 'db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email) && isset($data->senha)) {
    $sql = "SELECT * FROM usuarios WHERE email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $data->email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($data->senha, $user['senha'])) {
        echo json_encode([
            "status" => "sucesso",
            "mensagem" => "Login realizado com sucesso",
            "user_id" => $user['id'],
            "userName" => $user['nome'],
            "userEmail" => $user['email'],
            "userPhone" => $user['telefone'] // Certifique-se de que o nome da coluna está correto
        ]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Email ou senha incorretos"]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos"]);
}
?>
