<?php

    // Displayed Message
    $validation_message = "";

    // Email Address
    $email = "";

    if($_SERVER["REQUEST_METHOD"] === "POST") {
        $email = $_POST['email'];
        
        include("logic/syntax_validation.php");

        // Blank Email
        if($email === "") {
            $validation_message = "The email field is blank";
        } else {
            // Email with text
            if(validate($email)) {
                $validation_message = "";

                // Check if email is real
                include("logic/send_email.php");

                if(sendEmail($email)) {
                    $validation_message = "{$email} is real";
                } else {
                    $validation_message = "The email doesn't exist";
                }
            } else {
                $validation_message = "The email has incorrect format";
            }
        }
        
    }

    
   
?>
<!DOCTYPE html>
<html>
    <head>
        <?php include("components/link.php");?>
        <?php include("components/meta.php");?>
        <title>
            UoN Email Validator
        </title>
    </head>
    <body>
        <form method="POST" action="">
            <input type="text" name="email">
            <button>Submit</button>
            <br>
            <p><?php echo $validation_message; ?></p>
        </form>
    </body>
</html>