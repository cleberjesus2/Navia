<?php
include 'db.php';

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $sql = "SELECT * FROM produtos";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "sucesso", "produtos" => $result]);
} elseif ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    if (isset($data->nome) && isset($data->preco) && isset($data->descricao)) {
        $sql = "INSERT INTO produtos (nome, preco, descricao) VALUES (:nome, :preco, :descricao)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':nome', $data->nome);
        $stmt->bindParam(':preco', $data->preco);
        $stmt->bindParam(':descricao', $data->descricao);
        if ($stmt->execute()) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Produto adicionado com sucesso"]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao adicionar produto"]);
        }
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos"]);
    }
}
?>
