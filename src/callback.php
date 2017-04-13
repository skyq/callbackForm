<?php

namespace CallBack;

class Submit
{
    private $data;
    public $error;
    public $code;
    public $errorTextTime = "Второй раз форму отправляешь.";
    public $errorTextErrorSend = "Кажется форма сломалась. Скоро починю.";
    public $fromText = "Тестовое письмо из записи в лаборатории";
    public $mailheaders = "Content-type: text/html; charset=utf-8 \r\n";
    public $email_to = ["mail@nikolaywerner.ru"];
    private $lang = [
        "name"  => 'Имя: ',
        "phone" => 'Телефон: ',
        "email" => 'Эл.почта: ',
        "text"  => 'Текст сообщения: ',
    ];

    public function send()
    {
        $message = "<p>";
        foreach ($this->data as $key => $value) {
            if ($key != 'name') {
                $message .= $this->lang[$key].$value."</br>";
            }
        }
        $message .= "</p>";
        $json = [];
        foreach ($this->email_to as $mail){
            if (mail($mail,$this->fromText,$message,$this->mailheaders)) {
                $_SESSION['mail_send_tracker'] = true;
                $_SESSION['time_tracker'] = time();
                $json = [
                    'code'=>'200'
                ];
            } else {
                $_SESSION['mail_send_tracker'] = false;
                $this->error = $this->errorTextErrorSend;
                $json = [
                    "code"     => "404",
                    "response" => $this->error,
                ];
            }
        }
        header("Content-type: application/json");
        return json_encode($json);
    }

    public function getError()
    {
        $json = [
            "code"     => $this->code,
            "response" => $this->error,
        ];
        header("Content-type: application/json");
        return json_encode($json);
    }

    public function valid($data)
    {
        $this->error = '';
        if (isset($data['name']) AND $data['name'] == '') {
            if (!$_SESSION['mail_send_tracker']) {
                if (time() - $_SESSION['time_tracker'] > 1 * 60) {
                    $can_send = true;
                } else {
                    $this->error = $this->errorTextTime;
                    $this->code = '404';
                    $can_send = false;
                }
            } else {
                $this->error = $this->errorTextErrorSend;
                $this->code = '404';
                $can_send = false;
            }
        } else {
            $this->code = $this->errorTextErrorSend;
            $this->error = '';
            $can_send = false;
        }
        if ($can_send) {
            $this->data = $data;
        }
        return $can_send;
    }
}

