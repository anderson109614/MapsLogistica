
(function ($, window, document, undefined) {

    //Damit das ganze funktioniert, muss die Tabelle einen thead und einen tbody element haben
    $.fn.quickSearch = function (options) {
        //
        var defaultsOptions = {
            searchField: '#qsearch', //der Container in dem das Inputfeld für die Suche erstellt wird
            searchFieldId: 'searchbox',
            searchFieldName: 'Schnellsuche', //wenn angeben, dann wird noch ein Label erstellt mit dem Namen
            defaultQuery: '',
            minSearchLength: 3
        },
            config = $.extend(defaultsOptions, options),
            currentUrl = document.URL.split('?')[0], //die aktuelle URL, wird genommen als Key für den LocalStorage um den Searchfield Value abzulegen
            searchTable,
            timer,
            rows;

        //Binden aller wichtigen Events
        function bindEvents() {
            $('#' + config.searchFieldId).on('keyup', setFilter);

            //Das Event für Speichern des Inhaltes nur dann anwenden wenn auch localStorage vom Browser unterstüzt wird.
            if (supportLocalStorage) {
                $('#' + config.searchFieldId).on('keyup', saveContent);
            }
        }

        //Erstellen des Inputfeldes in dem der Suchstring angegeben werden kann
        function createSearchControl() {
            //Das label mit dem namen vor das Eingabefeld setzten
            if (config.searchFieldName.length > 0) {
                $('<label>',
                    {
                        text: config.searchFieldName,
                        class: 'searchLabel'
                    }).appendTo(config.searchField);
            }

            //Input für die Suche erstellen
            $('<input>',
                {
                    type: 'text',
                    name: config.searchFieldId,
                    id: config.searchFieldId
                }).appendTo(config.searchField);

            //den Inhalt des Eingabefeldes laden aus dem localstorage
            loadContent();
        }

        //setzten des Filters für die Tabellendaten (Timeout)
        function setFilter() {
            //das $(this) in diesem falle auf das Inputfeld verweißt,
            //da es sich um eine funktion handelt die vom Eventhandler aufgerufen wird ist this das Inputcontrol
            input = this;

            if (input.value.length < config.minSearchLength) {
                //Alle Rows anzeigen, da der Filter erst ab 2 Eingaben ausgeführt wird, müssen hier immer alle Rows angezeigt werden
                rows.show();
            }

            clearTimeout(timer);
            //Nicht gleich Filtern, erst wenn mind. 3 Zeichen eingegeben wurden und wenn 400ms vorbei sind.
            self.timer = (input.value.length >= config.minSearchLength) && setTimeout(function () {
                //Setzten des Filters
                config.defaultQuery = input.value.toLowerCase();
                //Die Filtermethode heraussuchen
                filter();
            }, 200);
        }

        //Filtern der werte für die Tabelle
        function filter() {
            //Alle Rows anzeigen, da der Filter erst ab 2 Eingaben ausgeführt wird, müssen hier immer alle Rows angezeigt werden
            rows.show();

            $.each(rows, function (index, row) {
                //den Ganzen Text aus einer Zeile "extrahieren und dann in diesem Text nach dem passenden String suchen
                var currentText = $('*', row).text();
                if (!checkTextWithRegexp(currentText)) {
                    //Jede Row die nicht den Regeln entspricht ausblenden
                    $(row).hide();
                }
            });
        }

        //Den übergebenen Text überprüfen ob die Worte darin vorkommen
        function checkTextWithRegexp(checkText) {
            var query = config.defaultQuery,
                regexp, count = 0;

            //alle worte nach denen gesucht werden soll heraussuchen
            var words = $.trim(query).split(' ');
            for (var i = 0; i < words.length; i++) {
                regexp = '/' + words[i] + '/ig';
                //Der Regex ausdruck muss erst noch "umgewandelt" werden mit eval, damit dieser auch als Regex Ausdruck erkannt werden kann.
                if (checkText.match(eval(regexp))) {
                    //jedesmal wenn ein Wort gefunden wurde was gesucht wird hochzählen
                    count++;
                }
            }

            //Der gesucht String für eine Zeile stimmt nur dann, wenn auch die Anzahl
            //von count der anzahl der Worte entspricht die gesucht wurden.
            if (count === words.length) {
                return true;
            }

            return false;
        }

        //Nutzen von LocalStorage aus HTML 5 um den Inhalt des aktuellen Filters zu speichern
        function saveContent() {
            //Den wert im localstorage ablegen, für den Key wird hier die aktuelle Seite mit verwendet.
            //damit wenn die suche auf unterschiedlichen Seiten eingesetzt wird, diese auch auf jeder Seite individuell gespeichert wird.
            localStorage['Search_' + currentUrl] = $('#' + config.searchFieldId).val();
        }

        //Laden von Inhalt für das Suchfeld auf der aktuellen Seite
        function loadContent() {
            //Nur laden, wenn auch localstorage unterstüzt wird
            if (supportLocalStorage) {
                //Den wert aus dem Localstorage für die aktuelle Seite in das Suchfeld schreiben
                 $('#' + config.searchFieldId).val(localStorage['Search_' + currentUrl]);
            }
        }

        //Prüfen ob HTML5 LocalStorage zur Verüfgung steht.
        function supportLocalStorage() {
            try {
                return 'localStorage' in window && window.localStorage !== null;
            } catch (e) {
                return false;
            }
        }

        //alle "Elemente" durchgehen die mit dem jQuery Selector beim Aufrufen des Plugins gefunden wurden
        $(this).each(function () {
            searchTable = this; //Selector für die Tabellen wo die Suche durchgeführt werden soll
            rows = $(' tbody tr', searchTable);

            $(config.searchField).show();
            createSearchControl();
            bindEvents();

        });
    };

})(jQuery, window, document);

