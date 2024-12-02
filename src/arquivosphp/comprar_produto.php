<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $dados = json_decode(file_get_contents("php://input"), true);

    $nomeCompleto = $dados['nomeCompleto'];
    $cpf = $dados['cpf'];
    $cnpj = $dados['cnpj'];
    $endereco = $dados['endereco'];
    $telefone = $dados['telefone'];
    $email = $dados['email'];
    $produto = $dados['produto'];

    $sql = "INSERT INTO vendas (nome_completo, cpf, cnpj, endereco, telefone, email, produto_nome, produto_preco, produto_descricao) VALUES (:nomeCompleto, :cpf, :cnpj, :endereco, :telefone, :email, :produtoNome, :produtoPreco, :produtoDescricao)";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':nomeCompleto', $nomeCompleto);
    $stmt->bindParam(':cpf', $cpf);
    $stmt->bindParam(':cnpj', $cnpj);
    $stmt->bindParam(':endereco', $endereco);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':produtoNome', $produto['nome']);
    $stmt->bindParam(':produtoPreco', $produto['preco']);
    $stmt->bindParam(':produtoDescricao', $produto['descricao']);

    try {
        if ($stmt->execute()) {
            echo json_encode(["status" => "sucesso", "mensagem" => "Compra confirmada!"]);
        } else {
            echo json_encode(["status" => "erro", "mensagem" => "Erro ao confirmar compra."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["status" => "erro", "mensagem" => "Erro ao inserir dados: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "erro", "mensagem" => "Método de requisição não suportado."]);
}
?>
