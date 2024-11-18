<?php
include 'db.php';

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->user_id) && isset($data->nome) && isset($data->email) && isset($data->telefone)) {
    $sql = "UPDATE usuarios SET nome = :nome, email = :email, telefone = :telefone WHERE id = :user_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $data->user_id);
    $stmt->bindParam(':nome', $data->nome);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':telefone', $data->telefone);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Dados atualizados com sucesso"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao atualizar dados"]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos"]);
}
?>
