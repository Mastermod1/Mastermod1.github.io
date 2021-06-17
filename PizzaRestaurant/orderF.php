<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Restauracja Fast N' Delicious</title>
  <meta name="description" content="Jedzenie szybsze i smaczniejsze niż kiedykolwiek!">
  <meta name="author" content="Daniel Kałmucki">

	<link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <header><h1>Italiano<br>Pizza</h1></header>
  <nav>
	<a href="index.php">Strona główna</a><a href="menu.php">Menu</a><a href="order.php">Zamów!</a><a href="about.php">O nas</a>
  </nav>
  <main>
	<?php
		$host = "localhost";
		$username = "root";
		$passwd = "";
		$dbname = "pizzeria";
		$connection = mysqli_connect($host,$username,$passwd,$dbname);
	
		$name =$_POST["name"];
		$mail = $_POST["mail"];
		$tel = $_POST["tel"];
		$address = $_POST["addr"];
		$food = $_POST["food"];
		echo "<div id='orderF'><h2>Twoje zamówienie</h2>";
		$cost = 0;
		$order = "";
		echo "<h3>Dane zamówienia</h3>
		<p><b>Imię, Nazwisko:</b> ".$name."</p><p><b>Mail:</b> ".$mail."</p><p><b>Telefon:</b> ".$tel."</p><p><b>Adres:</b> ".$address."</p><p><b>Zamówienie:</b></p><ol>";
		
		foreach($food as $value)
		{
			$query = "SELECT cena FROM menu WHERE  nazwa = '$value'";
			$result = mysqli_query($connection,$query);
			$price = mysqli_fetch_array($result);
			$order.=$value.", ";
			echo "<li>".$value." ".$price[0]." zł</li>";
			$cost+=$price[0];
		}
		echo "</ol><p><b>Ostateczny koszt:</b> ".$cost." zł</p></div>";
		$name = explode(" ",$name);
		$insert = "INSERT INTO zamowienia (id,imie,nazwisko,adres,tel,mail,zamowienie,koszt,czas) VALUES (NULL,'$name[0]','$name[1]','$address',$tel,'$mail','$order',$cost,current_timestamp())";
		mysqli_query($connection,$insert);
		mysqli_close($connection);
	?>
  </main>
  <footer>
	<p>Regulamin</p><p>Lokale</p><p>Godziny pracy:</p>
	<p></p>
	<ul>
	<li>Żmigrodzka 21</li>
	<li>Stachurska 1</li>
	<li>Walenrodzka 15</li>
	</ul>
	<ul>
	<li>Poniedziałek 12:00 - 01:00</li>
	<li>Wtorek 12:00 - 01:00</li>
	<li>Sroda 12:00 - 01:00</li>
	<li>Czwartek 12:00 - 01:00</li>
	<li>Piątek 12:00 - 06:00</li>
	<li>Sobota 12:00 - 06:00</li>
	<li>Niedziela 12:00 - 20:00</li>
	</ul>
  </footer>
</body>
</html>