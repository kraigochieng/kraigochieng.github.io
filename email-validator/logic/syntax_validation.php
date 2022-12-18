<?php
function validate($uncheckedEmail) {
    $pattern = "/[a-z0-9]@students\.uonbi\.ac\.ke/";
    $isValid = preg_match($pattern, $uncheckedEmail);
    return $isValid;
}
?>