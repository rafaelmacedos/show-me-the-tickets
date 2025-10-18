HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="utf-8">
<style>
  html, body {
      margin: 0;
      padding: 0;
      background: white;
      width: 384px;
  }

  body { 
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: flex-start;
  }

  .container { 
      width: 384px;
      text-align: center;
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }

  .emoji { font-size: 120px; margin-bottom: 5px; }
  .urgency { font-size: 50px; font-weight: bold; margin: 5px 0; }
  .task { font-size: 36px; margin: 5px 0; }
  .due-label { font-size: 24px; margin-top: 10px; }
  .due-date { font-size: 40px; font-weight: bold; margin-top: 3px; }
  .due-hour { font-size: 36px; font-weight: bold; margin-top: 3px; margin-bottom: 0px; }
  .separator {width: 100%; height: 2px; background-color: black; margin: 20px 0; }

  @media print {
      html, body {
          width: 384px;
      }
      body {
          align-items: flex-start;
      }
  }
</style>
</head>
<body>
  <div class="container">
    <div class="emoji">{{ emoji }}</div>
    <div class="urgency">{{ urgency }}</div>
    <div class="separator"></div>
    <div class="task">{{ task }}</div>
    <div class="separator"></div>
    <div class="due-label">Prazo Máximo</div>
    <div class="due-date">{{ due_date }}</div>
    <div class="due-hour">{{ due_hour }}</div>
  </div>
</body>
</html>
"""