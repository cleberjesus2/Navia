<?php
include 'db.php';

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && isset($data->description) && isset($data->price) && isset($data->stock) && isset($data->category) && isset($data->cpfCnpj) && isset($data->telefone)) {
    $sql = "INSERT INTO produtos (nome, descricao, preco, estoque, categoria, cpfCnpj, telefone) VALUES (:name, :description, :price, :stock, :category, :cpfCnpj, :telefone)";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':name', $data->name);
    $stmt->bindParam(':description', $data->description);
    $stmt->bindParam(':price', $data->price);
    $stmt->bindParam(':stock', $data->stock);
    $stmt->bindParam(':category', $data->category);
    $stmt->bindParam(':cpfCnpj', $data->cpfCnpj);
    $stmt->bindParam(':telefone', $data->telefone);

    if ($stmt->execute()) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Produto adicionado com sucesso"]);
    } else {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao adicionar produto"]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos"]);
}
?>
