<?php
/**
 * SMS Terraplenagem – Contact form endpoint
 * 
 * COMO USAR:
 * 1. Suba este arquivo para a raiz do seu site (junto com a pasta dist).
 * 2. Crie uma API Key no Resend (https://resend.com/api-keys):
 *    - Escolha a opção "Full Access" OU permissão para o domínio smsterraplenagem.com.br
 * 3. Configure o domínio smsterraplenagem.com.br no Resend:
 *    - Vá em Resend > Domains > Add Domain
 *    - Adicione os registros DNS (MX, SPF, DKIM) no painel da Hostinger
 *    - Aguarde a verificação (pode levar minutos a horas)
 * 4. Substitua 'SUA_RESEND_API_KEY_AQUI' abaixo pela sua chave.
 * 5. Aponte o formulário do site para este arquivo:
 *    - Crie um arquivo .env ou defina VITE_CONTACT_ENDPOINT=/mail.php antes do build
 *    - OU edite Contato.tsx e troque "/api/contato" por "/mail.php"
 * 
 * IMPORTANTE: A chave API NUNCA deve aparecer no front-end.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// ===== CONFIGURAÇÃO =====
$RESEND_API_KEY = 'SUA_RESEND_API_KEY_AQUI'; // Substitua pela sua chave
$TO_EMAIL       = 'contato@smsterraplenagem.com.br';
$FROM_EMAIL     = 'site@smsterraplenagem.com.br'; // Deve ser do domínio verificado no Resend
// =========================

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || empty($input['name']) || empty($input['email']) || empty($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Campos obrigatórios: name, email, message']);
    exit;
}

$name     = htmlspecialchars($input['name']);
$phone    = htmlspecialchars($input['phone'] ?? '');
$email    = htmlspecialchars($input['email']);
$location = htmlspecialchars($input['location'] ?? '');
$service  = htmlspecialchars($input['serviceType'] ?? '');
$message  = htmlspecialchars($input['message']);

$html = "
<h2>Novo contato pelo site</h2>
<table style='border-collapse:collapse;width:100%'>
  <tr><td style='padding:8px;border:1px solid #ddd;font-weight:bold'>Nome</td><td style='padding:8px;border:1px solid #ddd'>$name</td></tr>
  <tr><td style='padding:8px;border:1px solid #ddd;font-weight:bold'>Telefone</td><td style='padding:8px;border:1px solid #ddd'>$phone</td></tr>
  <tr><td style='padding:8px;border:1px solid #ddd;font-weight:bold'>E-mail</td><td style='padding:8px;border:1px solid #ddd'>$email</td></tr>
  <tr><td style='padding:8px;border:1px solid #ddd;font-weight:bold'>Local da obra</td><td style='padding:8px;border:1px solid #ddd'>$location</td></tr>
  <tr><td style='padding:8px;border:1px solid #ddd;font-weight:bold'>Serviço</td><td style='padding:8px;border:1px solid #ddd'>$service</td></tr>
  <tr><td style='padding:8px;border:1px solid #ddd;font-weight:bold'>Mensagem</td><td style='padding:8px;border:1px solid #ddd'>$message</td></tr>
</table>
<p style='margin-top:16px;color:#666;font-size:12px'>Enviado pelo formulário do site smsterraplenagem.com.br</p>
";

$payload = json_encode([
    'from'    => "SMS Terraplenagem <$FROM_EMAIL>",
    'to'      => [$TO_EMAIL],
    'subject' => "Novo contato: $name - $service",
    'html'    => $html,
    'reply_to' => $email,
]);

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_HTTPHEADER     => [
        'Content-Type: application/json',
        "Authorization: Bearer $RESEND_API_KEY",
    ],
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true, 'message' => 'Email enviado com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Falha ao enviar email', 'details' => $response]);
}
