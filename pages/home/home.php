<html>

<head>
  <link type="text/css" rel="stylesheet" href="./home.css" />
  <link type="image/x-icon" rel="icon" href="../../images/favicon.svg" />
  <title>KeyBattle Royale</title>
</head>

<body>
  <?php
  $erro = false;
  $erro_password = "";
  $erro_username = "";
  $erro_email = "";
  $erro_confsenha = "";
  $erro_usernameReg = "";
  $erro_passwordReg = "";

  if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["form_name"] == "login") {
    $erro = false;
    if (empty($_POST["username"])) {
      $erro_username = "Usuário não pode estar vazio";
      $erro = true;
    } else {
      $usuario = $_POST["username"];
    }
    if (empty($_POST["password"])) {
      $erro_password = "Senha não pode estar vazia";
      $erro = true;
    } else {
      $senha = $_POST["password"];
    }
    if (!$erro) {
      $conn = mysqli_connect("localhost", "root", "", "keybattle");
      $sql = "SELECT password from auth_user WHERE username = '$usuario';";
      $result = mysqli_query($conn, $sql);
      if ($result) {
        if (mysqli_num_rows($result) > 0) {
          $linha = mysqli_fetch_assoc($result);
          if ($linha["password"] == md5($senha)) {
            echo "Você está logado";
          }
        }
        mysqli_close($conn);
      }
    }
  }
  if ($_SERVER["REQUEST_METHOD"] == "POST" && $_POST["form_name"] == "registro") {
    $erro = false;
    if (empty($_POST["usernameReg"])) {
      $erro_usernameReg = "Usuário não pode estar vazio";
      $erro = true;
    } else {
      $user_reg = $_POST["usernameReg"];
    }
    if (empty($_POST["emailReg"])) {
      $erro_email = "Email não pode estar vazio";
      $erro = true;
    } else {
      $email_reg = $_POST["emailReg"];
    }
    if (empty($_POST["passwordReg"])) {
      $erro_passwordReg = "Senha não pode estar vazia";
      $erro = true;
    } else {
      $password_reg = md5($_POST["passwordReg"]);
    }
    if (empty($_POST["passwordConfReg"])) {
      $erro_confsenha = "Confirmaçao da senha não pode estar vazia";
      $erro = true;
    } else {
      $password_conf_reg = ($_POST["passwordConfReg"]);
    }
    if ($_POST["passwordConfReg"] != $_POST["passwordReg"]) {
      $erro_confsenha = "Senhas não conferem";
      $erro = true;
    } else {
      $password_conf_reg = $_POST["passwordConfReg"];
    }
    if (!$erro) {
      $conn = mysqli_connect("localhost", "root", "", "keybattle");
      $sql = "INSERT INTO auth_user (email, username, password) VALUES ('$email_reg', '$user_reg', '$password_reg');";
      if (mysqli_query($conn, $sql)) {
        echo "ok";
      } else {
        echo mysqli_error($conn);
      }

      mysqli_close($conn);
    }
  }
  ?>
  <div id="content">
    <div class="card inShelf">
      <div class="cover">
        <form id="login" action="./home.php" method="post">
          <input name="form_name" hidden value="login" />
          <div class="label-input">
            <h1 id="User">Usuário</h1>
            <input id="username-login" name="username" type="text" />
            <?php
            if ($erro) {
              echo "<p class='erro'>$erro_username</p>";
            }
            ?>
          </div>
          <div class="label-input">
            <h1 id="Password">Senha</h1>
            <input id="password-login" type="password" name="password" />
            <?php
            if ($erro) {
              echo "<p class='erro'>$erro_password</p>";
            }
            ?>
          </div>
          <div class="label-input">
            <button class="btn" type="submit">
              <img src="../../images/cute-skull.png" style="width: 60px; height: 60px" />Login
            </button>
          </div>
          <p id="registrar">Não tem uma conta? Crie uma</p>
        </form>
      </div>
      <div class="page"></div>
      <div class="page"></div>
      <div class="page">
        <div class="labels">
          <div class="label-input">
            <h2 id="User">Usuário</h2>
          </div>
          <div class="label-input">
            <h2 id="User">Email</h2>
          </div>
          <div class="label-input">
            <h2 id="User">Senha</h2>
          </div>
          <div class="label-input">
            <h2 id="User">Confirme sua Senha</h2>
          </div>
        </div>
        <p id="Voltar" class="label-input">Ja tem uma conta? Entre com ela</p>
      </div>
      <div class="page"></div>
      <div id="backcover">
        <div id="side" class="">
          <form id="registro" action="./home.php" method="post">
            <input name="form_name" hidden value="registro" />
            <div>
              <input id="userinput" name="usernameReg" type="text" />
              <?php
              if ($erro) {
                echo "<p class='erro'>$erro_usernameReg</p>";
              }
              ?>
            </div>
            <div>
              <input id="emailinput" name="emailReg" type="text" />
              <?php
              if ($erro) {
                echo "<p class='erro'>$erro_email</p>";
              }
              ?>
            </div>
            <div>
              <input id="passwordinput" name="passwordReg" type="password" />
              <?php
              if ($erro) {
                echo "<p class='erro'>$erro_passwordReg</p>";
              }
              ?>
            </div>
            <div>
              <input id="passwordconfirm" name="passwordConfReg" type="password" />
              <?php
              if ($erro) {
                echo "<p class='erro'>$erro_confsenha</p>";
              }
              ?>
            </div>
            <div>
              <button class="btn" type="submit">
                <img src="../../images/cute-skull.png" style="width: 80px; height: 80px" />Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div id="shelf">
    <div class="books">
      <div class="books-cover"></div>
      <div class="books-side"></div>
      <div class="books-backcover"></div>
    </div>
    <div class="books">
      <div class="books-cover"></div>
      <div class="books-side"></div>
      <div class="books-backcover"></div>
    </div>
    <div class="books">
      <div class="books-cover"></div>
      <div class="books-side"></div>
      <div class="books-backcover"></div>
    </div>
    <div class="books">
      <div class="books-cover"></div>
      <div class="books-side"></div>
      <div class="books-backcover"></div>
    </div>
    <div class="books">
      <div class="books-cover"></div>
      <div class="books-side"></div>
      <div class="books-backcover"></div>
    </div>
    <div id="shelf-bottom"></div>
  </div>
</body>
<script src="home.js"></script>

</html>