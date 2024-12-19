document.addEventListener('DOMContentLoaded', loadEvents);

function loadEvents() {
  fetch('../../src/get_events.php')
    .then(response => response.json())
    .then(data => {
      data.forEach(event => {
        const eventDate = new Date(event.event_date);
        // Affiche l'événement sur le calendrier
        markEventOnCalendar(eventDate, event.title);
      });
    });
}

function markEventOnCalendar(date, title) {
  // Trouve l'élément de jour correspondant et ajoute l'événement
  const dayElem = document.querySelector(`.day[data-date='${date.toISOString().split('T')[0]}']`);
  if (dayElem) {
    const eventElem = document.createElement('div');
    eventElem.classList.add('event');
    eventElem.innerText = title;
    dayElem.appendChild(eventElem);
  }
}
