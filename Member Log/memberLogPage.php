<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Member Log Page</title>
    <style>
		body{
			font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
			}
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: aquamarine;
        }
        
        td {
            background-color: gray;
        }
        
    </style>
</head>
<body>
<script>

</script>
<?php
    $hostname = "localhost";
    $username = "agewarge";
    $password = "EgXa9I57";
    $database = "agewarge";

    $connect = mysqli_connect($hostname, $username, $password, $database);

    if ($connect) 
    {
        print("Connected to <b>agewarge</b> <br>");
    } else {
        print("Connection Failed <br>");
    }

    if ($connect->connect_error) {
        die("<br> Connection failed: " . $connect->connect_error);
    }
    
    //updates all members' notes to remind of any discounts/penalties
    $penalties = "UPDATE members SET notes='+10% fee' WHERE missed_payment_total<1";

    $warnings = "UPDATE members SET notes='Remind of payment' WHERE missed_payment_total=1";

    $discounts = "UPDATE members SET notes='-10% discount' WHERE payment_total=12 AND missed_payment_total=0";

    mysqli_query($connect, $penalties);
    mysqli_query($connect, $discounts);
    mysqli_query($connect, $warnings);
    
    

    //begins building the tables
    $default = "SELECT * FROM members";
    $result = $connect->query($default);

    if ($result->num_rows > 0) {
    ?>
        <table>
            <tr>
                <th>Member Name</th>
                <th>Phone Number</th>
                <th>Classes Attended</th>
                <th>Amount Of Payments</th>
                <th>Amount of Missed Payments</th>
                <th>Notes</th>
            </tr>
    <?php
        while ($row = $result->fetch_assoc()) 
        {
            ?>
            <tr>
                <td><?php echo $row['member_name']; ?></td>
                <td><?php echo $row['phone_number']; ?></td>
                <td><?php echo $row['classes_attended']; ?></td>
                <td><?php echo $row['payment_total']; ?></td>
                <td><?php echo $row['missed_payment_total']; ?></td>
                <td><?php echo $row['notes']; ?></td>
            </tr>
            <?php
        }
        ?>
        </table>
        
    <?php
    } 
    
    else 
    {
        echo "0 results";
    }
    
    //Member log ordered by classes attended
    $attendance = "SELECT * FROM members ORDER BY classes_attended DESC";
    $resultCA = $connect->query($attendance);
    
    if ($resultCA->num_rows > 0) {
    ?>
        <table>
            <tr>
                <th>Member Name</th>
                <th>Phone Number</th>
                <th>Classes Attended</th>
                <th>Amount Of Payments</th>
                <th>Amount of Missed Payments</th>
                <th>Notes</th>
            </tr>
    <?php
        $count = 10;
        while ($row = $resultCA->fetch_assoc()) 
        {
            if ($count >= 1){
                $attendanceDiscount = "UPDATE members SET notes='-10% discount' WHERE member_name = " . $row['member_name'];
                mysqli_query($connect, $attendanceDiscount);
            }
            $count--;
    ?>
            <tr>
                <td><?php echo $row['member_name']; ?></td>
                <td><?php echo $row['phone_number']; ?></td>
                <td><?php echo $row['classes_attended']; ?></td>
                <td><?php echo $row['payment_total']; ?></td>
                <td><?php echo $row['missed_payment_total']; ?></td>
                <td><?php echo $row['notes']; ?></td>
            </tr>
    <?php
        }
    ?>
        </table>
        
    <?php
    } 
    
    else 
    {
        echo "0 results";
    }
    
    
    //Member log ordered by amount of payments
    $payments = "SELECT * FROM members ORDER BY payment_total DESC";
    $resultPM = $connect->query($payments);

    if ($resultPM->num_rows > 0) {
    ?>
        <table>
            <tr>
                <th>Member Name</th>
                <th>Phone Number</th>
                <th>Classes Attended</th>
                <th>Amount Of Payments</th>
                <th>Amount of Missed Payments</th>
                <th>Notes</th>
            </tr>
    <?php
        while ($row = $resultPM->fetch_assoc()) 
        {
    ?>
            <tr>
                <td><?php echo $row['member_name']; ?></td>
                <td><?php echo $row['phone_number']; ?></td>
                <td><?php echo $row['classes_attended']; ?></td>
                <td><?php echo $row['payment_total']; ?></td>
                <td><?php echo $row['missed_payment_total']; ?></td>
                <td><?php echo $row['notes']; ?></td>
            </tr>
    <?php
        }
    ?>
        </table>
        
    <?php
    }
    
    else 
    {

        
        echo "0 results";
    }

mysqli_close($connect);
?>

</body>
</html>
