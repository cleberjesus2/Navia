<?php
header('Content-Type: application/json');
include 'db.php'; // Conexão com o banco de dados

$usuario_id = $_POST['usuario_id'] ?? null;

if ($usuario_id) {
    $sql = "SELECT status FROM organizadores WHERE usuario_id = ? AND status = 'aprovado'";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $usuario_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'aprovado']);
    } else {
        echo json_encode(['status' => 'nao_aprovado']);
    }
} else {
    echo json_encode(['status' => 'erro', 'mensagem' => 'ID do usuário não enviado.']);
}
?>
