<?php
/**
 * Created by PhpStorm.
 * User: uSkyQ
 * Date: 13.04.2017
 * Time: 17:01
 */
include "src/callback.php";
use CallBack\Submit;

ob_start();
session_start();
if (!isset($_SESSION['mail_send_tracker'])) {
    $_SESSION['mail_send_tracker'] = false;
}
if (!isset($_SESSION['time_tracker'])) {
    $_SESSION['time_tracker'] = time();
}

$submit = new Submit();

if ($submit->valid($_POST)) {
    $submit->email_to = ["mail@nikolaywerner.ru","256@skyq.ru"];
    $submit->send();
}else{
    $submit->getError();
}
//echo $submit->go($_POST);