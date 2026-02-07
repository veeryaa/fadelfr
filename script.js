const responses = {
    "whoami": "Fadel — DevOps Engineer @ <span style='color: #ff3333; font-weight: bold;'>[REDACTED]</span>, Cloud tinkerer, CI/CD craftsman, Kubernetes chaos coordinator."
};

function addPrompt() {
  $('#terminal').append(`
    <div class="line prompt">
      <span>&gt;</span><input type="text" id="input" autofocus />
    </div>
  `);
  $('#input').focus();
}

$(document).ready(function () {
  $(document).on('keydown', '#input', function (e) {
    const command = $(this).val().trim();

    if (e.key === 'Enter') {
      // If no command is entered (empty input), just add a new line without an error
      if (command === '') {
        $('.prompt').before(`<div class="line">&gt;</div>`);
        $('.prompt').remove(); 
        addPrompt(); 
        window.scrollTo(0, document.body.scrollHeight);
        return;
      }

      $('<div class="line"></div>').text('> ' + command).insertBefore('.prompt');
      $('.prompt').remove(); 

      if (command === 'clear') {
        $('#terminal').html(`<div class='line'>Welcome to Fadel's Terminal. Type <code>whoami to get to know me</code>.</div>`);
        addPrompt();
        return;
      }

      if (responses[command]) {
        $('#terminal').append(`<div class='line'>${responses[command]}</div>`);
      } else {
        $('#terminal').append(`<div class='line' style='color:#ff3333'>command not found: ${command}</div>`);
      }

      addPrompt();
      window.scrollTo(0, document.body.scrollHeight);
    }

    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault(); 
      $('<div class="line"></div>').text('> ' + command).insertBefore('.prompt'); 
      $('.prompt').remove(); 
      addPrompt(); 
      window.scrollTo(0, document.body.scrollHeight);
    }

    // Handle CTRL+D: Trigger a 3-second countdown and close the tab
    if (e.ctrlKey && e.key === 'd') {
      e.preventDefault();
      $('#terminal').append('<div class="line">Closing in 3...</div>');
      setTimeout(() => {
        $('#terminal').append('<div class="line">Closing in 2...</div>');
      }, 1000);
      setTimeout(() => {
        $('#terminal').append('<div class="line">Closing in 1...</div>');
      }, 2000);
      setTimeout(() => {
        window.close();
      }, 3000);
    }
  });
});
