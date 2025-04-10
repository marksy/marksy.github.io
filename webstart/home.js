((JSConfetti, moment, _) => {
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

    let beerDate;

    const runTimestamp = Math.round(Date.now());

    let sharedCalendarEvents;

    function beerOclock(beerDay) {
        const dayOfWeek = beerDay || 5;
        const date = new Date(runTimestamp);
        let msg;
        const diff = date.getDay() - dayOfWeek;
        const beer = document.getElementById('beer');


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
                date: '2024-10-28',
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

        sharedCalendarEvents = calendarEvents;

        if (diff > 0) {
            date.setDate(date.getDate() + 6);
        } else if (diff < 0) {
            date.setDate(date.getDate() + ((-1) * diff));
        }
        date.setHours(16);
        date.setMinutes(0);
        date.setSeconds(0);

        const addedDates = JSON.parse(localStorage.getItem('marksyEvents'));
        if (addedDates) {
            addedDates.forEach((item) => {
                calendarEvents.push(item);
            });
        }

        const numberOfCalendarEvents = calendarEvents.length;
        const cssRoot = document.querySelector(':root');
        cssRoot.style.setProperty('--duration', `${14 * numberOfCalendarEvents}s`);

        const calendarCount = document.querySelector('.calendar-count');
        calendarCount.textContent = `${numberOfCalendarEvents} event${numberOfCalendarEvents > 1 ? 's' : ''}`

        const sortedArray = calendarEvents.sort((a, b) => new moment(a.date).format('X') - new moment(b.date).format('X'))
        const list = sortedArray.map((calendarEvent) => {
            const rightNow = new moment();
            let html = `<li 
                class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'display-none' : ''}" 
                title="${moment(calendarEvent.date).format('ddd, Do MMMM YYYY')}">
                    <span class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'strike-through dim' : ''}">
                        ${calendarEvent.title} ${daysRemaining(calendarEvent.date)}
                    </span>
                    <span class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'dim' : ''}">
                        ${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? '✅' : calendarEvent.emoji}
                    </span>
                </li>`;
            if (calendarEvent?.link) {
                html = `<li 
                    class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'display-none' : ''}" 
                    title="${moment(calendarEvent.date).format('ddd, Do MMMM YYYY')}">
                        <a href="${calendarEvent.link}" target="_blank">
                            <span class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'strike-through dim' : ''}">
                                ${calendarEvent.title} ${daysRemaining(calendarEvent.date)}
                            </span>
                            <span class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'dim' : ''}">
                                ${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? '✅' : calendarEvent.emoji}
                            </span>
                        </a>
                    </li>`;
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

        dateBox.innerHTML = `${days[now.getDay()]} ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`

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
            });
            const img = './beer.png';
            const text = `Grab yourself a cold one!`;
            new Notification("Beer o'clock", { body: text, icon: img });
        }

        const marksyEvents = JSON.parse(localStorage.getItem('marksyEvents')) || [];
        marksyEvents.forEach((event) => {
            if (new Date().toDateString() === new Date(event.date).toDateString() && new Date().getHours() === 9 && new Date().getMinutes() === 30) {
                const img = './default.png';
                const text = `${event.title} ${event.emoji}`;
                new Notification(event.title, { body: text, icon: img });
            }
        });
    }

    function doTime() {
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
            html += `<div class="dialog-event"><span class="${moment(item.date).isBefore(new Date()) ? 'strike-through' : ''}">${item.title} - ${item.date}</span> <button type="button" class="delete-event" data-index="${index}">delete</button></div>`;
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

    const defaultBookmarks = [
        {
            id: 'sharesies',
            emoji: "🍍",
            title: "Sharesies",
            url: "https://app.sharesies.nz"
        },
        {
            id: 'tv1-news',
            emoji: "📰",
            title: "TV1 news",
            url: "https://www.tvnz.co.nz/shows/one-news-at-6pm"
        },
        {
            id: 'hacker-news',
            emoji: "🏴‍☠️",
            title: "Hacker news",
            url: "https://news.ycombinator.com"
        },
        {
            id: 'rnz-news',
            emoji: "📻",
            title: "RNZ news",
            url: "https://www.rnz.co.nz"
        },
        {
            id: 'chat-gpt',
            emoji: "🤖",
            title: "Chat GPT",
            url: "https://www.chatgpt.com"
        },
        {
            id: 'reddit',
            emoji: "👽",
            title: "Reddit",
            url: "https://www.reddit.com"
        },
    ];

    const getMarksyBookmarks = () => {
        return JSON.parse(localStorage.getItem('marksyBookmarks')) && JSON.parse(localStorage.getItem('marksyBookmarks')).length > 0 ? JSON.parse(localStorage.getItem('marksyBookmarks')) : [];
    }

    const renderBookmarks = () => {
        const linksContainer = document.querySelector('.links');
        let bookmarkHTML = ``;
        if (getMarksyBookmarks().length === 0) {
            bookmarkHTML = `<p>No bookmarks found. <button type="button" class="load-bookmarks">Load defaults</button> </p>`;
        } else {
            getMarksyBookmarks().forEach((item, index) => {
                bookmarkHTML += `<p>${item.emoji} <a href="${item.url}">${item.title}</a></p>`
            });
        }

        linksContainer.innerHTML = bookmarkHTML;

        const loadDefaultsButton = document.querySelector('.load-bookmarks');
        loadDefaultsButton && loadDefaultsButton.addEventListener('click', () => {
            localStorage.setItem('marksyBookmarks', JSON.stringify(defaultBookmarks));
            renderBookmarks();
        });
    }
    renderBookmarks();


    const editBookmarkButton = document.querySelector('.edit-bookmarks');
    const editBookmarkDialog = document.querySelector('.bm-dialog');
    const editBookmarkDialogContainer = document.querySelector('.bookmark-contents');

    let bookmarkEditHTML = ``;

    let bookmarksToDelete = [];

    const renderEditBookmarks = () => {
        bookmarkEditHTML = ``;
        getMarksyBookmarks().forEach((item) => {
            bookmarkEditHTML += `<div class="row-item" id="${item.id}">${item.emoji} <span title="${item.url}">${item.title}</span> <button type="button" class="btn delete-event delete-bookmark">delete</button> </div>`
        });
        editBookmarkDialogContainer.innerHTML = bookmarkEditHTML;

        const deleteBookmarkButton = document.querySelectorAll('.delete-bookmark');
        deleteBookmarkButton.forEach((item, index) => {
            item.addEventListener('click', () => {
                if (item.parentElement.classList.contains('strike-through')) {
                    item.parentElement.classList.remove('strike-through','dim');
                    bookmarksToDelete.pop(item.parentElement.id);
                } else {
                    item.parentElement.classList.add('strike-through', 'dim');
                    bookmarksToDelete.push(item.parentElement.id);
                }
            });
        });
    }

    const bmSaveButton = document.querySelector('.bm-dialog-save');
    bmSaveButton.addEventListener('click', () => {
        let newBookmarks = [];
        getMarksyBookmarks().forEach((bookMarkItem) => {
            if (!bookmarksToDelete.includes(bookMarkItem.id)) {
                newBookmarks.push(bookMarkItem);
            }
        });

        // save to LS
        localStorage.setItem('marksyBookmarks', JSON.stringify(newBookmarks));
        renderBookmarks();
        bookmarkEditHTML = ``;
        editBookmarkDialog.close();
    });

    const bmCancelButton = document.querySelector('.bm-dialog-cancel');
    bmCancelButton.addEventListener('click', () => {
        editBookmarkDialog.close();
        bookmarksToDelete = [];
    })

    editBookmarkButton.addEventListener('click', () => {
        renderEditBookmarks();
        editBookmarkDialog.showModal();
    });

    const addBookmarkButton = document.querySelector('.add-bookmark');
    const addBookmarkDialog = document.querySelector('.add-bm-dialog');
    addBookmarkButton.addEventListener('click', () => {
        addBookmarkDialog.showModal();
    });

    const addBookmarkDialogForm = document.querySelector('#bookmark-form');

    addBookmarkDialogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emoji = document.getElementById('new-bookmark-emoji');
        const bookmarkName = document.getElementById('new-bookmark-name');
        const url = document.getElementById('new-bookmark-url');



        const newObject = {
            id: _.kebabCase(bookmarkName.value),
            title: bookmarkName.value,
            url: url.value,
            emoji: emoji.value,
        }
        console.log(newObject);

        const newBookmarks = getMarksyBookmarks();
        newBookmarks.push(newObject);

        localStorage.setItem('marksyBookmarks', JSON.stringify(newBookmarks));

        bookmarkName.value = '';
        url.value = '';
        emoji.value = '';

        renderBookmarks();
        addBookmarkDialog.close();
    })

    const addBookmarkDialogButtonCancel = document.querySelector('.add-bm-dialog-cancel');
    addBookmarkDialogButtonCancel.addEventListener('click', () => {
        addBookmarkDialog.close();
    });

    const askNotificationPermission = () => {
        // Check if the browser supports notifications
        if (!("Notification" in window)) {
            console.log("This browser does not support notifications.");
            return;
        }
        Notification.requestPermission().then((permission) => {
            enableNotificationsButton.hidden = permission === "granted";
        });
    }

    const enableNotificationsButton = document.querySelector('#enable-notifications');
    enableNotificationsButton.addEventListener('click', askNotificationPermission);

    if (Notification.permission === 'granted') {
        enableNotificationsButton.hidden = true;
    }

    const calculateTemperatureButton = document.querySelector('#calculate-temperature-button');
    const temperatureInput = document.querySelector('#temperature-input');
    const calculatedTemperatureValueDiv = document.querySelector('#calculated-temperature-value-div');
    const clearTemperatureInputButton = document.querySelector('#calculate-temperature-clear-button');
    let convertedTemperatureValue;

    const convertToFahrenheit = (celciusValue) => {
        celciusValue = Number(celciusValue);
        if (isNaN(celciusValue)) {
            temperatureInput.classList.add('form-error');
            return ''
        } else {
            temperatureInput.classList.remove('form-error');
        }
        const returnValue = (celciusValue * 1.8) + 32;
        return `${returnValue.toFixed()}˚f`;
    }
    const convertToCelcius = (fahrenheitValue) => {
        fahrenheitValue = Number(fahrenheitValue);
        if (isNaN(fahrenheitValue)) {
            return ''
        } else {
            temperatureInput.classList.remove('error');
        }
        const returnValue = (fahrenheitValue - 32) / 1.8;
        return `${returnValue.toFixed()}˚c`;
    }

    calculateTemperatureButton.addEventListener('click', (e) => {
        e.preventDefault();
        const temperatureUnit = document.querySelector('[name="temperature-unit"]:checked');

        const temperatureInputValue = temperatureInput.value;
        const temperatureUnitValue = temperatureUnit.value;

        convertedTemperatureValue = temperatureUnitValue === 'f'
            ? convertToFahrenheit(temperatureInputValue)
            : convertToCelcius(temperatureInputValue);
        
        calculatedTemperatureValueDiv.innerText = convertedTemperatureValue;
    });

    temperatureInput.addEventListener("keyup", (event) => {
        clearTemperatureInputButton.disabled = temperatureInput.value.length <= 0
        calculateTemperatureButton.disabled = temperatureInput.value.length <= 0
    });


    clearTemperatureInputButton.addEventListener('click', () => {
        temperatureInput.classList.remove('form-error');
        temperatureInput.value = '';
        calculatedTemperatureValueDiv.innerText = '';
        clearTemperatureInputButton.disabled = true;
        calculateTemperatureButton.disabled = true;
    });

})(window.JSConfetti, window.moment, window._);
