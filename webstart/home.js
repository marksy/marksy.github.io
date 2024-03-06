((JSConfetti, moment) => {
    const jsConfetti = new JSConfetti();

    function calcWidth() {
        const root = document.querySelector(':root');
        const el = document.querySelector('#beer .wrapper ul');
        const width = el.offsetWidth;
        root.style.setProperty('--amount', `-${width + 2}px`);
    }

    const greeting = document.querySelector('#greeting');
    const greetz = [
        'kia ora',
        'hëj',
        'hāllo',
        'hello',
        'Здравейте',
        'העלא',
        'مرحبا',
        'नमस्ते',
        'こんにちは',
        'heljo',
        'wjat',
        '🇳🇿',
        '🎅',
        '🍺',
        '🏖',
        '🤠',
        '💩',
        '🆒',
        'sup dog',
        'supé dogé',
        '¿que pasa?',
    ];
    let randGr33tz = greetz[Math.floor(Math.random() * greetz.length)];
    greeting.innerText = randGr33tz;
    document.title = randGr33tz;

    greeting.addEventListener('click', () => {
        let randGr33tz = greetz[Math.floor(Math.random() * greetz.length)];
        greeting.innerText = randGr33tz;
        document.title = randGr33tz;
        jsConfetti.addConfetti({
            confettiRadius: 4,
            confettiNumber: 300,
        })
    })


    function daysRemaining(eventDate) {
        return moment(eventDate).fromNow();
    }

    let beerDate

    const runTimestamp = Math.round(Date.now());
    function beerOclock(beerDay) {
        const dayOfWeek = beerDay || 5;
        const date = new Date(runTimestamp);
        let msg;
        const diff = date.getDay() - dayOfWeek;
        const beer = document.getElementById('beer');
        if (diff > 0) {
            date.setDate(date.getDate() + 6);
        }
        else if (diff < 0) {
            date.setDate(date.getDate() + ((-1) * diff));
        }
        date.setHours(16);
        date.setMinutes(0);
        date.setSeconds(0);

        const calendarEvents = [
            {
                title: `Beer o'clock`,
                date: date,
                emoji: `🍺`,
            },
            {
                title: `Easter`,
                date: '2024-03-29',
                emoji: `🐰`,
            },
            {
                title: `ANZAC day`,
                date: '2024-04-25',
                emoji: `🌺`,
            },
            {
                title: `Labour day`,
                date: '2024-10-23',
                emoji: `👷‍♂️`,
            },
            {
                title: `Christmas`,
                date: '2024-12-25',
                emoji: `🎄`,
            },
            {
                title: `New Year's Eve`,
                date: '2024-12-31',
                emoji: `🎆`,
            },
        ];

        const addedDates = JSON.parse(localStorage.getItem('marksyEvents'));
        if (addedDates) {
            addedDates.forEach((item) => {
                calendarEvents.push(item);
            });
        };

        const numberOfCalendarEvents = calendarEvents.length;
        const cssRoot = document.querySelector(':root');
        cssRoot.style.setProperty('--duration', `${14 * numberOfCalendarEvents}s`);

        const calendarCount = document.querySelector('.calendar-count');
        calendarCount.textContent = `${numberOfCalendarEvents} event${numberOfCalendarEvents > 1 ? 's' : ''}`

        const sortedArray = calendarEvents.sort((a,b) => new moment(a.date).format('X') - new moment(b.date).format('X'))
        const list = sortedArray.map((calendarEvent) => {
                const rightNow = new moment();
                let html = `<li class="${moment(calendarEvent.date) < rightNow ? 'display-none' :''}" title="${moment(calendarEvent.date).format('Do MMMM YYYY')}"><span class="${moment(calendarEvent.date) < rightNow ? 'strike-through dim' : ''}">${calendarEvent.title} ${daysRemaining(calendarEvent.date)}</span> <span class="${moment(calendarEvent.date) < rightNow ? 'dim' : ''}">${moment(calendarEvent.date) < rightNow ? '✅' : calendarEvent.emoji}</span></li>`;
                if (calendarEvent?.link) {
                    html = `<li class="${moment(calendarEvent.date) < rightNow ? 'display-none' :''}" title="${moment(calendarEvent.date).format('Do MMMM YYYY')}"><a href="${calendarEvent.link}" target="_blank"><span class="${moment(calendarEvent.date) < rightNow ? 'strike-through dim' : ''}">${calendarEvent.title} ${daysRemaining(calendarEvent.date)}</span> <span class="${moment(calendarEvent.date) < rightNow ? 'dim' : ''}">${moment(calendarEvent.date) < rightNow ? '✅' : calendarEvent.emoji}</span></a></li>`;
                }
                return html
            }).join('')

        beer.innerHTML = `<div class="wrapper">
            <ul>
            ${list}
        </ul>
        <ul class="copy">
            ${list}
        </ul></div>
        `;

        beerDate = date

        calcWidth();

        return false;
    }


    beerOclock();

    const months = [
        'January',
        'February',
        'March',
        'May',
        'April',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]

    const timeBox = document.querySelector('#time');
    const dateBox = document.querySelector('#date');

    function setTime() {
        const now = new Date();
        const withPmAm = now.toLocaleTimeString('en-US', {
            // en-US can be set to 'default' to use user's browser settings
            hour: '2-digit',
            minute: '2-digit',
        });
        let text = withPmAm.replace(':', '<span>:</span>')
        text.startsWith('0') ? text = text.substring(1) : text
        timeBox.innerHTML = text

        const formatDate = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
        dateBox.innerHTML = formatDate

        if (new Date().toDateString() === beerDate.toDateString() && new Date().getHours() === 16 && new Date().getMinutes() === 0) {
            jsConfetti.addConfetti({
                emojis: [
                    '🍻',
                    '🍺',
                    '🍷',
                    '🍸',
                    '🍹',
                    '🥂',
                    '🍾',
                    '🧉',
                ],
                confettiRadius: 1,
                confettiNumber: 200,
            })
        }

    }

    function doTime () {
        setTime();
        setTimeout(() => {
            doTime();
        }, 60000);
    }   
    doTime();

    const addCalendarButton = document.querySelector('.add-calendar-button');
    const addCalendarWrapper = document.querySelector('.add-calendar-event-wrapper');
    const addCalendarWrapperCancel = document.querySelector('.add-calendar-event-wrapper--cancel');
    const addCalendarWrapperAdd = document.querySelector('.add-calendar-event-wrapper--add');

    const newCalendarEventName = document.querySelector('#new-calendar-event-name');
    const newCalendarEventEmoji = document.querySelector('#new-calendar-event-emoji');
    const newCalendarEventDate = document.querySelector('#new-calendar-event-date');

    const editCalendarEventsButton = document.querySelector('.edit-calendar-button');
    const editCalendarEventsDialog = document.querySelector('.dialog');
    const dialogCancelButton = document.querySelector('.dialog-cancel');
    const dialogEventsContainer = document.querySelector('#dialog-events');

    let dialogEvents = JSON.parse(localStorage.getItem('marksyEvents')) || [];

    if (dialogEvents.length === 0) {
        editCalendarEventsButton.classList.add('hide');
    }

    addCalendarButton.addEventListener('click', () => {
        addCalendarButton.classList.add('hide');
        addCalendarWrapper.classList.add('show');
        editCalendarEventsButton.classList.add('hide');
        newCalendarEventName.focus();
    });

    addCalendarWrapperCancel.addEventListener('click', () => {
        newCalendarEventName.value = '';
        newCalendarEventEmoji.value = '';
        newCalendarEventDate.value = '';

        addCalendarButton.classList.remove('hide');
        addCalendarWrapper.classList.remove('show');
        editCalendarEventsButton.classList.remove('hide');

        newCalendarEventName.classList.remove('form-error');
        newCalendarEventEmoji.classList.remove('form-error');
        newCalendarEventDate.classList.remove('form-error');

    });

    addCalendarWrapperAdd.addEventListener('click', () => {
        const marksyEvents = JSON.parse(localStorage.getItem('marksyEvents')) || [];

        if (!newCalendarEventName.value) {
            newCalendarEventName.classList.add('form-error');
        }
        if (!newCalendarEventEmoji.value) {
            newCalendarEventEmoji.classList.add('form-error');
        }
        if (!newCalendarEventDate.value) {
            newCalendarEventDate.classList.add('form-error');
        }

        if (!newCalendarEventName.value || !newCalendarEventDate.value) {
            return
        }

        const newEvent = {
            title: newCalendarEventName.value,
            emoji: newCalendarEventEmoji.value,
            date: newCalendarEventDate.value,
        };

        marksyEvents.push(newEvent);

        localStorage.setItem('marksyEvents', JSON.stringify(marksyEvents));             

        addCalendarButton.classList.remove('hide');
        addCalendarWrapper.classList.remove('show');
        editCalendarEventsButton.classList.remove('hide');

        location.reload();
    });

    editCalendarEventsButton.addEventListener('click', () => {
        dialogEvents = JSON.parse(localStorage.getItem('marksyEvents')) || [];
        let html = ``;
        dialogEvents.forEach((item, index) => {
            html += `<div>${item.title} - ${item.date} <button type="button" class="delete-event" data-index="${index}">delete</button></div>`;
        });

        dialogEventsContainer.innerHTML = html;

        const deleteButtons = document.querySelectorAll('.delete-event');
        deleteButtons.forEach(buttonElement => {
            buttonElement.addEventListener('click', () => {
                const eventIndex = buttonElement.dataset.index;
                dialogEvents.splice(eventIndex, 1);
                // const parent = buttonElement.parentNode;
                // parent.classList.add('hide');
                localStorage.setItem('marksyEvents', JSON.stringify(dialogEvents));             
                editCalendarEventsDialog.close();
                location.reload();
            });
        });

        editCalendarEventsDialog.showModal();
    });

    dialogCancelButton.addEventListener('click', () => {
        editCalendarEventsDialog.close();
    });
})(JSConfetti, moment);
