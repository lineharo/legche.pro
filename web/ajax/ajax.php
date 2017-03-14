<?php
const MAIL_TO = 'stanislav-polyakov236@yandex.ru, info@legche.pro, kolored@yandex.ru';
const MAIL_FROM = 'info@legche.pro';

class Form
{
    public $fields;

    function __construct($request)
    {
        $this->fields = $request;
    }
}

class Log
{
    public $handle;
    public $message = '';

    function __construct($path)
    {
        $path = $_SERVER['DOCUMENT_ROOT'] .'/'. $path;
        if (!$this->handle = fopen($path, 'a')) exit;
        $this->message = '=====> ' . date('Y:m:d H:i:s') . ' ['.$_SERVER['REMOTE_ADDR'] . '] <=====' . PHP_EOL;
    }

    function __destruct()
    {
        fclose($this->handle);
    }

    function add($mess)
    {
        $this->message .= $mess;
    }

    function flush(){
        $this->message .= '======================================= END ===' . PHP_EOL. PHP_EOL;
        fwrite($this->handle, $this->message);
        $this->message = '';
    }
}

class Mailo
{
    public $message = '';
    public $subject = '';
    public $to = '';
    public $from = '';
    public $headers = '';

    function __construct($resp)
    {
        $this->to = $resp;
        $this->headers = 'Content-type: text/html; charset=utf-8' . PHP_EOL;
        $this->headers .= 'From: LEGCHE <' . MAIL_FROM . '>';
    }

    function send()
    {
        return mail($this->to, $this->subject, $this->message, $this->headers, '-f'.MAIL_FROM);
    }
}

$err = array();
$flog = new Log('log/mail.log');

if (!isset($_POST)) {
    $err[] = 'Отсутствует POST';
    $flog->add('errors: ' . implode($err));
    $flog->flush();
} else {
    $form = new Form($_POST);
}

$mail = new Mailo(MAIL_TO);
$ajax_notify = '';

switch($form->fields['action']) {
    case 'call':
        $mail->subject = 'Заказ обратного звонка';
        $mail->message = 'Заказ обратного звонка (кнопка) <br>' . PHP_EOL .
            'Имя: ' . $form->fields['name'] . '<br>' . PHP_EOL .
            'Телефон: ' . $form->fields['phone'] . '<br>' . PHP_EOL;
        $ajax_notify = 'Заявка отправлена.';
        break;
    case 'order':
        $mail->subject = 'Заявка';
        $mail->message = 'Заявка (кнопка) <br>' . PHP_EOL .
            'Email: ' . $form->fields['email'] . '<br>' . PHP_EOL .
            'Имя: ' . $form->fields['name'] . '<br>' . PHP_EOL .
            'Телефон: ' . $form->fields['phone'] . '<br>' . PHP_EOL .
            'Текст: ' . $form->fields['comment'] . PHP_EOL;
        $ajax_notify = 'Заявка отправлена.';
        break;
    case 'order-request':
        $mail->subject = 'Заявка';
        $mail->message = 'Заявка (форма снизу) <br>' . PHP_EOL .
            'Email: ' . $form->fields['email'] . '<br>' . PHP_EOL .
            'ФИО: ' . $form->fields['name'] . '<br>' . PHP_EOL .
            'Телефон: ' . $form->fields['phone'] . '<br>' . PHP_EOL;
        $ajax_notify = 'Заявка отправлена.';
        break;
    case 'popup-individual':
        $mail->subject = 'Запрос на индивидуальный пакет';
        $mail->message = 'Запрос на индивидуальный пакет (попап) <br>' . PHP_EOL .
            'Email: ' . $form->fields['email'] . '<br>' . PHP_EOL .
            'ФИО: ' . $form->fields['name'] . '<br>' . PHP_EOL .
            'Телефон: ' . $form->fields['phone'] . '<br>' . PHP_EOL;
        $ajax_notify = 'Заявка отправлена.';
        break;
    default:
        $err[] = 'action не указан';
}

$flog->add('to: ' . $mail->to . PHP_EOL);
$flog->add('from: ' . $mail->from . PHP_EOL);
$flog->add('subject: ' . $mail->subject . PHP_EOL);
$flog->add('message: ' . $mail->message . PHP_EOL);


if (count($err) > 0) {
    $flog->add('errors: ' . implode($err));
} else {
    if ($mail->send()) {
        echo json_encode(Array('RESULT' => 'OK', 'DESC' => $ajax_notify));
        $flog->add('sendmail: Ok' . PHP_EOL);
    } else {
        echo json_encode(Array('RESULT' => 'FAIL', 'DESC' => 'На сервере произошла ошибка. К сожалению, заявка не отправлена. Отправьте вашу контактную информацию на почту sales@angstremip.ru'));
        $flog->add('sendmail: Not ok' . PHP_EOL);
    }
}
$flog->flush();
