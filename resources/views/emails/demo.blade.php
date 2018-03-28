<!DOCTYPE html>
<html>
<head>
    <title>Welcome Email</title>
</head>
 
<body>

    <div><h1>Budget Management</h1></div>
    <div><label>Hello <b><?php echo $name; ?></b>,</label></div>
    <div><p>you are successfully registered with us.</p></div>
    <div>Your Login credentials are : </div>
    <div>
        <p>
            <b>Email :</b> <?php echo $email; ?><br>
            <b>Passowrd :</b> <?php echo $password; ?>
        </p>
    </div>
    <div>Thanks & Regards,<br>Budget Management</div>
</body>
 
</html>