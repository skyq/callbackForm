<?php

namespace CallBack;

class Submit
{
    private $data;
    public $error;
    public $code;

    public $okText = "Отлично. Скоро позвоним!";
    public $errorTextTime = "Второй раз форму отправляешь.";
    public $FatalityError = "Кажется форма сломалась. Скоро починю.";
    public $errorTextPhone = "Ну хоть телефон укажи, чтобы форма отправилась";
    public $errorTextErrorSend = "Проблемы с отправкой письма.";
//
//    public $okText = "ok";
//    public $errorTextTime = "errorTextTime";
//    public $FatalityError = "FatalityError";
//    public $errorTextPhone = "errorTextPhone";
//    public $errorTextErrorSend = "errorTextErrorSend";

    public $fromText = "Тестовое письмо из записи в лаборатории";
    public $mailheaders = "Content-type: text/html; charset=utf-8 \r\n";
    public $email_to = [];

    private $lang = [
        "name"  => 'Имя: ',
        "phone" => 'Телефон: ',
        "email" => 'Эл.почта: ',
        "text"  => 'Текст сообщения: ',
    ];

    public function send()
    {
        $message = '';
        foreach ($this->data as $key => $value) {
            if ($key != 'name') {
                $message .= "<p>" . $this->lang[$key] . $value . "</p>";
            }
        }
        $json = [];
        foreach ($this->email_to as $mail) {
            if (mail($mail, $this->fromText, $message, $this->mailheaders)) {
                $_SESSION['mail_was_send'] = true;
                $_SESSION['time_tracker'] = time();
                $json = [
                    "code"     => '200',
                    "response" => $this->okText,
                ];
            } else {
                $_SESSION['mail_was_send'] = false;
                $this->error = $this->errorTextErrorSend;
                $this->code = '404';
                $json = $this->getError();
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
            if (isset($data['phone']) AND $data['phone'] != '') {
                if (!$_SESSION['mail_was_send']) {
                    $can_send = true;
                } else {
                    if (time() - $_SESSION['time_tracker'] > 1 * 60) {
                        $can_send = true;
                    } else {
                        $this->error = $this->errorTextTime;
                        $this->code = '404';
                        $can_send = false;
                    }
                }
            } else {
                $this->error = $this->errorTextPhone;
                $this->code = '404';
                $can_send = false;
            }
        } else {
            $this->error = $this->FatalityError;
            $this->code = '404';
            $can_send = false;
        }
        if ($can_send) {
            $this->data = $data;
        }
        return $can_send;
    }
}

