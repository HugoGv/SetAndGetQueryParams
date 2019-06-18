        setQueryParams(key, value) {
            // By this function, we add query parameter in URL
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);

            let search = document.location.search;
            let parameter = key + '=' + value;

            let reg = new RegExp('(&|\\?)' + key + '=[^\&]*');

            search = search.replace(reg, '$1' + parameter);

            if (!RegExp.$1) {
                search += (search.length > 0 ? '&' : '?') + parameter;
            }

            // Dynamic url replacement
            window.history.pushState('', '', search);

            // Save and pass value of parameters for tab URL
            EventBus.$emit('save.query.params', search);
        },
        
        (url) {
            // By this function, we parse URL to get query parameter object
            if (document.location.search) {
                let parser = document.createElement('a'),
                    searchObject = {},
                    queries,
                    split,
                    i;
                // Let the browser do the work
                parser.href = url;
                // Convert query string to object
                queries = parser.search.replace(/^\?/, '').split('&');
                for (i = 0; i < queries.length; i++) {
                    split = queries[i].split('=');
                    searchObject[split[0]] = split[1];
                }

                this.queryParams.client_id = searchObject.client_id;
                this.queryParams.location_id = searchObject.location_id;
            }
        },
