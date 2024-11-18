<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "naviaapp";

// Adicionar cabeçalhos CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["status" => "erro", "mensagem" => "Conexão falhou: " . $e->getMessage()]);
    exit(); // Sair se a conexão falhar
}
?>
