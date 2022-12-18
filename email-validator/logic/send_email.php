<?php
// PHPMailer classes to global function. Should NOT be in a function.
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require './PHPMailer-master/PHPMailer-master/src/Exception.php';
require './PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require './PHPMailer-master/PHPMailer-master/src/SMTP.php';


function sendEmail($checkedEmail) {
    //CReate an instance 
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 0;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'kraigochieng@gmail.com'; // The email address to send the mail
        $mail->Password = 'etcrjqvpmzitsawi'; //  The email app password to send the mail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port = 465;
    
        // Set sender and receiver
        $mail->setFrom('kraigochieng@gmail.com', 'Uon Email Validator'); // The gmail to send the mail
        $mail->addAddress($checkedEmail); // Recipients of email
        
        // Set content
        $mail->isHTML(true);
        $mail->Subject = 'Email Validated';
        $mail->Body = 'Thank you for using the <b>UON Email Validator.</b>';
        $mail->AltBody = 'This is no HTML.';
        $mail->send();
        return true;
    } catch (Exception $e) {
        return false;
    }
}
?>