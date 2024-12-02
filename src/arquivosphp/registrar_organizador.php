<?php
include 'db.php'; 

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dados = json_decode(file_get_contents("php://input"));

// Verificando se os dados necessários estão presentes
if (isset($dados->id_usuario) && isset($dados->cargo) && isset($dados->empresa) 
    && isset($dados->documento_empresa) && isset($dados->area_atuacao) && isset($dados->descricao)) {
    
    try {
        // Inserção na tabela organizadores
        $sql_organizador = "INSERT INTO organizadores (id_usuario, cargo, empresa, documento_empresa, area_atuacao, descricao) 
                            VALUES (:id_usuario, :cargo, :empresa, :documento_empresa, :area_atuacao, :descricao)";
        $stmt_organizador = $conn->prepare($sql_organizador);

        // Dados do organizador
        $id_usuario = $dados->id_usuario;
        $cargo = $dados->cargo;
        $empresa = $dados->empresa;
        $documento_empresa = $dados->documento_empresa;
        $area_atuacao = $dados->area_atuacao;
        $descricao = $dados->descricao;

        $stmt_organizador->bindParam(':id_usuario', $id_usuario);
        $stmt_organizador->bindParam(':cargo', $cargo);
        $stmt_organizador->bindParam(':empresa', $empresa);
        $stmt_organizador->bindParam(':documento_empresa', $documento_empresa);
        $stmt_organizador->bindParam(':area_atuacao', $area_atuacao);
        $stmt_organizador->bindParam(':descricao', $descricao);

        // Executa a inserção do organizador
        if ($stmt_organizador->execute()) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Organizador cadastrado com sucesso!"]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao cadastrar o organizador!"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro no banco de dados: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Dados incompletos!"]);
}
?>
