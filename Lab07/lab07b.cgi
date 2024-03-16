#!/usr/bin/perl


use strict;
use warnings;
use CGI qw(:standard);
use CGI::Carp qw(fatalsToBrowser);



print "Content-type: text/html\n\n";

my $firstName = param('firstName');
my $lastName = param('lastName');
my $street = param('street');
my $city = param('city');
my $postalCode = param('postalCode');
my $province = param('province');
my $phone = param('phone');
my $email = param('email');


my $photograph = param('photograph');
my $upload_filehandle = upload('photograph');
my $filename = param('photograph');

if (defined $photograph) {
    ($filename) = $photograph =~ /([^\\\/]+)$/;
}

if (defined $upload_filehandle) {
    # Define where to save the file
    my $target_dir = "../uploads";
    my $target_file = $target_dir . "/" . $filename;

    # Open a file handle to write the file
    open (my $out_file, '>', $target_file) or die "Can't open $target_file for writing: $!";
    binmode $out_file;

    # Read and save the file
    while (my $bytesread = read($upload_filehandle, my $buffer, 1024)) {
        print $out_file $buffer;
    }

    close $out_file;
}



my @errors;

if (!$firstName) {
    push (@errors, "First name is required");
}
if (!$lastName) {
    push (@errors, "Last name is required");
}
if (!$street) {
    push (@errors, "Street name is required");
}
if (!$city) {
    push (@errors, "City is required");
}

if ($postalCode !~ /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/) {
    push (@errors, "Invalid postal code format");
}

if (!$province) {
    push (@errors, "Province is required");
}

if ($phone !~ /^\d{10}$/) {
    push (@errors, "Invalid phone number format") 
}

if ($email !~ /^[^\s@]+@[^\s@]+\.[^\s@]+$/) {
    push (@errors, "Invalid email address format");
}

if (!$photograph) {
    push (@errors, "Photograph is required");
}

print "<style>";
print "li { color:red }";
print "h2 { color: blue }";
print "body {max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px;}";
print "</style>";

if (@errors) {
    print "<p>Errors:</p>";
    print "<ul>";
    foreach my $error (@errors) {
        print "<li>$error</li>";
    }
    print "</ul>";
}

print "<body>";
print "<h1>User Information:</h1>";
print "<p><h2>Name:</h2> $firstName $lastName</p>";
print "<p><h2>Address:</h2> $street, $city, $province, $postalCode</p>";
print "<p><h2>Phone:</h2> $phone</p>";
print "<p><h2>Email:</h2> $email</p>";
print "<p><h2>Photograph:</h2> <img style='width:100px;' src='../uploads/$filename'></p>";
print "</body>";
