((JSConfetti, moment, _) => {

    const qs = (s) => document.querySelector(s);
    const qa = (s) => document.querySelectorAll(s);

    function calcWidth() {
        const root = qs(':root');
        const el = qs('#beer .wrapper ul');
        const width = el.offsetWidth;
        root.style.setProperty('--amount', `-${width + 2}px`);
    }

    const greeting = qs('#greeting');
    const greetz = [
        'kia ora',
        'hëj',
        'hāllo',
        'hello',
        'Здравейте',
        'como estás',
        'مرحبا',
        'नमस्ते',
        'สวัสดี',
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
        const jsConfetti = new JSConfetti();
        jsConfetti.addConfetti({
            confettiRadius: 4,
            confettiNumber: 300,
        });
        setTimeout(() => {
            jsConfetti.clearCanvas();
            const canvasTags = qa('canvas');
            canvasTags[0].remove();
        }, 5000);
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
        const cssRoot = qs(':root');
        cssRoot.style.setProperty('--duration', `${14 * numberOfCalendarEvents}s`);

        const calendarCount = qs('.calendar-count');
        calendarCount.textContent = `${numberOfCalendarEvents} event${numberOfCalendarEvents > 1 ? 's' : ''}`

        const sortedArray = calendarEvents.sort((a, b) => new moment(a.date).format('X') - new moment(b.date).format('X'))
        const list = sortedArray.map((calendarEvent) => {
            const rightNow = new moment();
            return `<li 
                class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'display-none' : ''}" 
                title="${moment(calendarEvent.date).format('ddd, Do MMMM YYYY')}">
                    <span class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'strike-through dim' : ''}">
                        ${calendarEvent.title} ${daysRemaining(calendarEvent.date)}
                    </span>
                    <span class="${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? 'dim' : ''}">
                        ${moment(calendarEvent.date) < rightNow && calendarEvent.title !== 'Beer o\'clock' ? '✅' : calendarEvent.emoji}
                    </span>
                </li>`;
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

    const timeBox = qs('#time');
    const dateBox = qs('#date');

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
            const jsConfetti = new JSConfetti();
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
            setTimeout(() => {
                jsConfetti.clearCanvas();
                const canvasTags = qa('canvas');
                canvasTags[0].remove();
            }, 5000);
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

    const addCalendarButton = qs('.add-calendar-button');
    const addCalendarWrapper = qs('.add-calendar-event-wrapper');
    const addCalendarWrapperCancel = qs('.add-calendar-event-wrapper--cancel');
    const addCalendarWrapperAdd = qs('.add-calendar-event-wrapper--add');

    const newCalendarEventName = qs('#new-calendar-event-name');
    const newCalendarEventEmoji = qs('#new-calendar-event-emoji');
    const newCalendarEventDate = qs('#new-calendar-event-date');

    const editCalendarEventsButton = qs('.edit-calendar-button');
    const editCalendarEventsDialog = qs('.dialog');
    const dialogCancelButton = qs('.dialog-cancel');
    const dialogEventsContainer = qs('#dialog-events');

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

        const deleteButtons = qa('.delete-event');
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
        const linksContainer = qs('.links');
        let bookmarkHTML = ``;
        if (getMarksyBookmarks().length === 0) {
            bookmarkHTML = `<p>No bookmarks found. <button type="button" class="load-bookmarks">Load defaults</button> </p>`;
        } else {
            getMarksyBookmarks().forEach((item, index) => {
                bookmarkHTML += `<p><a href="${item.url}">${item.emoji} ${item.title}</a></p>`
            });
        }

        linksContainer.innerHTML = bookmarkHTML;

        const loadDefaultsButton = qs('.load-bookmarks');
        loadDefaultsButton && loadDefaultsButton.addEventListener('click', () => {
            localStorage.setItem('marksyBookmarks', JSON.stringify(defaultBookmarks));
            renderBookmarks();
        });
    }
    renderBookmarks();


    const editBookmarkButton = qs('.edit-bookmarks');
    const editBookmarkDialog = qs('.bm-dialog');
    const editBookmarkDialogContainer = qs('.bookmark-contents');

    let bookmarkEditHTML = ``;

    let bookmarksToDelete = [];

    const renderEditBookmarks = () => {
        bookmarkEditHTML = ``;
        getMarksyBookmarks().forEach((item) => {
            bookmarkEditHTML += `<div class="row-item" id="${item.id}">${item.emoji} <span title="${item.url}">${item.title}</span> <button type="button" class="btn delete-event delete-bookmark">delete</button> </div>`
        });
        editBookmarkDialogContainer.innerHTML = bookmarkEditHTML;

        const deleteBookmarkButton = qa('.delete-bookmark');
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

    const bmSaveButton = qs('.bm-dialog-save');
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

    const bmCancelButton = qs('.bm-dialog-cancel');
    bmCancelButton.addEventListener('click', () => {
        editBookmarkDialog.close();
        bookmarksToDelete = [];
    })

    editBookmarkButton.addEventListener('click', () => {
        renderEditBookmarks();
        editBookmarkDialog.showModal();
    });

    const addBookmarkButton = qs('.add-bookmark');
    const addBookmarkDialog = qs('.add-bm-dialog');
    addBookmarkButton.addEventListener('click', () => {
        addBookmarkDialog.showModal();
    });

    const addBookmarkDialogForm = qs('#bookmark-form');

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

    const addBookmarkDialogButtonCancel = qs('.add-bm-dialog-cancel');
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

    const enableNotificationsButton = qs('#enable-notifications');
    enableNotificationsButton.addEventListener('click', askNotificationPermission);

    if (Notification.permission === 'granted') {
        enableNotificationsButton.hidden = true;
    }

    const calculateTemperatureButton = qs('#calculate-temperature-button');
    const temperatureInput = qs('#temperature-input');
    const calculatedTemperatureValueDiv = qs('#calculated-temperature-value-div');
    const clearTemperatureInputButton = qs('#calculate-temperature-clear-button');
    let convertedTemperatureValue;

    const convertTemp = (inputValue, toUnit) => {
        inputValue = Number(inputValue);
        if (isNaN(inputValue)) {
            temperatureInput.classList.add('form-error');
            return ''
        } else {
            temperatureInput.classList.remove('form-error');
        }
        const returnValue = toUnit === 'f' ? (inputValue * 1.8) + 32 : (inputValue - 32) / 1.8;
        return `${returnValue.toFixed()}˚${toUnit}`;
    }

    calculateTemperatureButton.addEventListener('click', (e) => {
        e.preventDefault();
        const temperatureUnit = qs('[name="temperature-unit"]:checked');

        const temperatureInputValue = temperatureInput.value;
        const temperatureUnitValue = temperatureUnit.value;

        convertedTemperatureValue = convertTemp(temperatureInputValue,temperatureUnitValue)

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

    (() => {
        const calculateSpeedButton = qs('#calculate-speed-button');
        const speedInput = qs('#speed-input');
        const calculatedSpeedValueDiv = qs('#calculated-speed-value-div');
        const clearSpeedInputButton = qs('#calculate-speed-clear-button');
        let convertedSpeedValue;

        const convertSpeed = (inputValue, toUnit) => {
            inputValue = Number(inputValue);
            if (isNaN(inputValue)) {
                speedInput.classList.add('form-error');
                return ''
            } else {
                speedInput.classList.remove('form-error');
            }
            const returnValue = toUnit === 'mph' ? inputValue * 0.621371 : inputValue / 0.621371;
            return `${returnValue.toFixed()} mph`;
        }

        calculateSpeedButton.addEventListener('click', (e) => {
            e.preventDefault();
            const speedUnit = qs('[name="speed-unit"]:checked');

            const speedInputValue = speedInput.value;
            const speedUnitValue = speedUnit.value;

            convertedSpeedValue = convertSpeed(speedInputValue,speedUnitValue);

            calculatedSpeedValueDiv.innerText = convertedSpeedValue;
        });

        speedInput.addEventListener("keyup", (event) => {
            clearSpeedInputButton.disabled = speedInput.value.length <= 0
            calculateSpeedButton.disabled = speedInput.value.length <= 0
        });


        clearSpeedInputButton.addEventListener('click', () => {
            temperatureInput.classList.remove('form-error');
            temperatureInput.value = '';
            calculatedSpeedValueDiv.innerText = '';
            clearSpeedInputButton.disabled = true;
            calculateSpeedButton.disabled = true;
        });
    })();

})(window.JSConfetti, window.moment, window._);
