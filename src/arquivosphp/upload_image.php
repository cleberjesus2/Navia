<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

$target_dir = "uploads/";
if (!is_dir($target_dir)) {
    mkdir($target_dir, 0777, true);
}
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

// Verifica se o arquivo é uma imagem real ou uma imagem falsa
$check = getimagesize($_FILES["file"]["tmp_name"]);
if ($check !== false) {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {
        echo json_encode(["status" => "sucesso", "mensagem" => "Imagem enviada com sucesso!", "caminho" => $target_file]);
    } else {
        error_log("Erro ao mover o arquivo para: " . $target_file);
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao fazer upload da imagem."]);
    }
} else {
    error_log("O arquivo não é uma imagem.");
    echo json_encode(["status" => "erro", "mensagem" => "O arquivo não é uma imagem."]);
}
?>
