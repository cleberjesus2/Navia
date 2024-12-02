<?php
header('Content-Type: application/json');

header('Access-Control-Allow-Origin: *'); // Permite todas as origens
header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); // Permite métodos específicos
header('Access-Control-Allow-Headers: Content-Type'); // Permite cabeçalhos específicos
// Conexão com o banco de dados
$conn = new mysqli('localhost', 'root', '', 'naviaapp'); // Altere 'banco_de_dados' para o nome real do seu banco

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Atualize a consulta SQL para usar as colunas corretas
$sql = "SELECT titulo AS nome, descricao, imagem, data_hora AS data, local AS endereco, categoria, telefone, numero_segurancas FROM eventos";
$result = $conn->query($sql);

// Verifique se a consulta foi bem-sucedida
if ($result === false) {
    die("Erro na consulta: " . $conn->error); // Exibe o erro da consulta
}

$eventos = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $eventos[] = $row;
    }
}

echo json_encode($eventos);
$conn->close();
?>