<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include 'db.php';

try {
    $sql = "SELECT * FROM eventos ORDER BY data_hora DESC";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $eventos = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($eventos);
} catch (PDOException $e) {
    echo json_encode(["status" => "erro", "mensagem" => "Erro ao buscar eventos: " . $e->getMessage()]);
}
?>
