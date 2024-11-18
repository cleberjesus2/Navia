<?php
// Inclui o arquivo de conexão ao banco de dados diretamente
include 'db.php'; // Certifique-se de que o arquivo db.php está no mesmo diretório que get_user.php

// Verifica se o 'user_id' foi passado na requisição
if (isset($_POST['user_id'])) {
    $user_id = $_POST['user_id'];

    // Consulta para pegar as informações do usuário
    $sql = "SELECT id, nome, email, telefone FROM usuarios WHERE id = :user_id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    // Verifica se o usuário foi encontrado
    if ($stmt->rowCount() > 0) {
        // Retorna os dados como JSON
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode([
            'status' => 'sucesso',
            'userName' => $user['nome'],
            'userEmail' => $user['email'],
            'userPhone' => $user['telefone']
        ]);
    } else {
        echo json_encode([
            'status' => 'erro',
            'mensagem' => 'Usuário não encontrado'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'erro',
        'mensagem' => 'user_id não fornecido'
    ]);
}
