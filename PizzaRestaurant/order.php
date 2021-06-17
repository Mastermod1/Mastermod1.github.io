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
		$query = "SELECT nazwa FROM menu WHERE 1";
		$result = mysqli_query($connection,$query);
		$option = "";
		while($row = mysqli_fetch_array($result))
		{
			$option.="<option>".$row[0]."</option>";
		}
		mysqli_close($connection);
	?>
	<form id="orderForm" method="post" action="orderF.php" >
		<label>Imie Nazwisko: </label><input name="name" type="text">
		<label>Mail: </label><input name="mail" type="mail">
		<label>Tel: </label><input name="tel" type="number" min="100000000" max="999999999">
		<label>Adres: </label><input name="addr" type="text">
		<label>Potrawa: </label><select name='food[0]'><?php echo $option?></select>
		<button id="addButton" onClick="moreFood(); return false;">+</button><input type="submit" value="Zamów!">
	</form>
	<script>
			var menuListPHP = <?php echo '"'.$option.'"'?>;
			var newSelect = null;
			var form = document.getElementById("orderForm");
			var button = document.getElementById("addButton");
			var i=1;
			function moreFood()
			{
				newSelect = document.createElement("select");
			newSelect.name = "food["+i+"]";
				i++;
				newSelect.innerHTML = menuListPHP;
				form.insertBefore(document.createElement("br"),button);
				form.insertBefore(newSelect,button);
			}
		</script>
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