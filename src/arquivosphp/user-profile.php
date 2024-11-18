<?php
// Configurações de conexão ao banco de dados
$host = 'localhost';
$dbname = 'naviaapp';
$username = 'root';
$password = '';

// Conectar ao banco de dados
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erro na conexão: " . $e->getMessage());
}

// Define o cabeçalho para JSON
header('Content-Type: application/json');

// Verifica se o 'user_id' foi passado na URL
if (isset($_GET['user_id'])) {
    $user_id = $_GET['user_id'];

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
        'mensagem' => 'ID de usuário não fornecido'
    ]);
}
?>
