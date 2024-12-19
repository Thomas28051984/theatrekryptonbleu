document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'fr',
      headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      resources: {
          url: '../../src/controller/get-events.php',
          method: 'POST'
      },
      events: '../../src/controller/get-events.php', // Charge les événements depuis la base de données
      eventClick: function (info) {
          if (confirm(`Voulez-vous supprimer l'événement "${info.event.title}" ?`)) {
              deleteEvent(info.event.id);
          }
      }
  });

  calendar.render();

// Gestion du formulaire
document.getElementById('eventForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const title = document.getElementById('eventTitle').value;
  const startDate = document.getElementById('startDate').value;
  const startTime = document.getElementById('startTime').value;
  const endDate = document.getElementById('endDate').value;
  const endTime = document.getElementById('endTime').value;

  if (title && startDate && startTime && endDate && endTime) {
      addEvent(title, startDate, endDate, startTime, endTime, calendar);
  } else {
      alert('Veuillez remplir tous les champs.');
  }
});

  // Fonction pour ajouter un événement
  function addEvent(title, date, startTime, endTime, calendar) {
    fetch('../../src/controller/add-event.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `title=${encodeURIComponent(title)}&date=${date}&startTime=${startTime}&endTime=${endTime}`
    })
        .then(response => response.json())
        .then(data => {
            console.log('Réponse du serveur:', data);
            if (data.success) {
                alert(data.message);
                calendar.refetchEvents();
            } else {
                alert(data.message || 'Erreur lors de l\'ajout.');
            }
        })
        .catch(error => console.error('Erreur:', error));
}


  // Fonction pour supprimer un événement
  function deleteEvent(id) {
      fetch('../../src/controller/delete-event.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `id=${id}`
      })
          .then(response => response.json())
          .then(data => {
              alert(data.message);
              calendar.refetchEvents(); // Recharge les événements
          })
          .catch(error => console.error('Erreur:', error));
  }
});
