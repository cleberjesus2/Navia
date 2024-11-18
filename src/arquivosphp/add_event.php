<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Adicione logs para verificar os dados recebidos
    error_log(print_r($_POST, true));

    $cpf_cnpj = $_POST['cpf_cnpj'] ?? null;
    $titulo = $_POST['titulo'] ?? null;
    $descricao = $_POST['descricao'] ?? null;
    $data_hora = $_POST['data_hora'] ?? null;
    $local = $_POST['local'] ?? null;
    $categoria = $_POST['categoria'] ?? null;
    $telefone = $_POST['telefone'] ?? null;
    $numero_segurancas = $_POST['numero_segurancas'] ?? null;

    // Verificar se todos os campos obrigatórios estão preenchidos
    if (!$cpf_cnpj || !$titulo || !$descricao || !$data_hora || !$local || !$categoria || !$telefone || !$numero_segurancas) {
        error_log("Erro: Todos os campos obrigatórios devem ser preenchidos.");
        echo json_encode(["status" => "erro", "mensagem" => "Todos os campos obrigatórios devem ser preenchidos."]);
        exit();
    }

    if ($numero_segurancas < 2) {
        error_log("Erro: O número mínimo de seguranças é 2.");
        echo json_encode(["status" => "erro", "mensagem" => "O número mínimo de seguranças é 2."]);
        exit();
    }

    $sql = "INSERT INTO eventos (cpf_cnpj, titulo, descricao, data_hora, local, categoria, telefone, numero_segurancas) VALUES (:cpf_cnpj, :titulo, :descricao, :data_hora, :local, :categoria, :telefone, :numero_segurancas)";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':cpf_cnpj', $cpf_cnpj);
    $stmt->bindParam(':titulo', $titulo);
    $stmt->bindParam(':descricao', $descricao);
    $stmt->bindParam(':data_hora', $data_hora);
    $stmt->bindParam(':local', $local);
    $stmt->bindParam(':categoria', $categoria);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':numero_segurancas', $numero_segurancas);

    try {
        if ($stmt->execute()) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Evento anunciado com sucesso!"]);
        } else {
            error_log("Erro: Falha ao executar a declaração SQL.");
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao anunciar evento."]);
        }
    } catch (PDOException $e) {
        error_log("Erro ao inserir dados: " . $e->getMessage());
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao inserir dados: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Método de requisição não suportado."]);
}
?>
