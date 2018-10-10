if (typeof ELH_Config === 'undefined') {
    ELH_Config = {
        RESTEndpoint: null,
        WebSocketServer: null,
        PushErrors: false,
        KeepBuffer: 100
    };
}

var ELH = {
    Initialize: function () {
        window.addEventListener("error", ELH.HandleJSError, true);
        if (ELH_Config.WebSocketServer) {
            ELH.InitWSClient();
        }
    },
    InitWSClient: function () {
        // Connect to endpoint, if any
    },
    HandleJSError: function (event) {
        var errObj = ELH.prepareErrorObject(event);

        if (ELH_Config.RESTEndpoint) {
            ELH.PostErrorToREST(errObj);
        }

        if (ELH_Config.WebSocketServer) {
            ELH.PostErrorToWS(errObj);
        }

        if(!ELH_Config.RESTEndpoint && !ELH_Config.WebSocketServer) {
            console.log(errObj);
        }
    },
    prepareErrorObject: function (eventItem) {
        var errorObject = {
            url: location.href,
            userAgent: navigator.userAgent,
            connection: (navigator.connection ? { downlink: navigator.connection.downlink, effectiveType: navigator.connection.effectiveType, saveData: navigator.connection.saveData} : {}),
            platform: navigator.platform
        };
        if (eventItem instanceof ErrorEvent || eventItem.message) {
            errorObject.errorMessage = eventItem.message;
            errorObject.lineNumber = eventItem.lineno;
            errorObject.column = eventItem.colno;
            errorObject.fileName = eventItem.filename;

        } else if (eventItem.type === 'error') {
            if (eventItem.target.src) {
                errorObject.errorMessage = 'Failed to load resource';
                errorObject.lineNumber = -1;
                errorObject.column = -1;
                errorObject.fileName = eventItem.target.src;
            }
        } else {

        }
        console.log(eventItem);

        return errorObject;
    },
    PostErrorToWS: function (errorObject) {
        // Push data to WebSocket, if connected
    },
    PostErrorToREST: function (errorObject) {
        if (ELH_Config.RESTEndpoint) {
            if (self.fetch) {
                fetch(ELH_Config.RESTEndpoint, {
                    method: "POST",
                    mode: "no-cors",
                    body: JSON.stringify(errorObject),
                    credentials: 'omit',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                var xreq = new XMLHttpRequest();
                xreq.open('POST', ELH_Config.RESTEndpoint, true);
                xreq.setRequestHeader('Content-Type', 'application/json');
                xreq.setRequestHeader('Origin', location.href);
                xreq.send(JSON.stringify(errorObject));
            }
        }
    },
    Buffer: []
};

if (typeof window !== 'undefined') {
    ELH.Initialize();
}
