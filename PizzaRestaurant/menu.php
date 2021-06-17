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
	<div class="container">
	<?php 
		$host = "localhost";
		$username = "root";
		$passwd = "";
		$dbname = "pizzeria";
		$connection = mysqli_connect($host,$username,$passwd,$dbname);
		$query = "SELECT nazwa,skladniki,cena FROM menu WHERE 1";
		$result = mysqli_query($connection,$query);
		$menu = "<dl>";
		while($row = mysqli_fetch_array($result))
		{
			$menu.="<dt>".$row[0]."</dt><span>".$row[2]." zł</span><br>";
			$menu.= "<dd>".$row[1]."</dd>";
		}
		$menu.="</dl>";
		echo $menu;
		mysqli_close($connection);
	?>
	</div>
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