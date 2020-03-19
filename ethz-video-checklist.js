// ==UserScript==
// @name     ETHZ Video Checklist
// @version  1
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include  https://video.ethz.ch/*
// @grant        GM.getValue
// @grant        GM.setValue
// ==/UserScript==


console.log('init script');
$("head").append('<style id="style_changer" type="text/css"></style>');
$('#style_changer').html('a.custom_icon {display: inline-block; vertical-align:bottom; height:22px; background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIj4NCjxnIHN0cm9rZT0iIzJjYTAyYyIgc3Ryb2tlLXdpZHRoPSIyLjMiIGZpbGw9IiNmZmYiPg0KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOC41Ii8+DQo8cGF0aCBkPSJNNS4yLDEwIDguNSwxMy40IDE0LjgsNy4yIi8+DQo8L2c+DQo8L3N2Zz4=);' +
                         'background-position: 0 0px;background-repeat: no-repeat;padding-right:5px;width:20px;margin-left: 3px;}a.notwatched{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMTJwdCIgaGVpZ2h0PSIxMnB0IiB2aWV3Qm94PSIwIDAgMTIgMTIiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLXdpZHRoOjM4O3N0cm9rZS1saW5lY2FwOmJ1dHQ7c3Ryb2tlLWxpbmVqb2luOm1pdGVyO3N0cm9rZTpyZ2IoODMuMTM3MjU1JSwwJSwwJSk7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtbWl0ZXJsaW1pdDo0OyIgZD0iTSA5Ny45NDcyNjYgNDgxLjk2ODc1IEMgLTcuMzg4NjcyIDM3NS40OTYwOTQgLTYuODIwMzEyIDIwMy42NjIxMDkgOTkuNDYyODkxIDk3Ljc1NzgxMiBDIDIwNS43NDYwOTQgLTcuOTU3MDMxIDM3Ny41ODAwNzggLTcuNzY3NTc4IDQ4My42NzM4MjggOTguMzI2MTcyIEMgNTg5Ljc2NzU3OCAyMDQuNDE5OTIyIDU4OS45NTcwMzEgMzc2LjI1MzkwNiA0ODQuMjQyMTg4IDQ4Mi41MzcxMDkgQyAzNzguMzM3ODkxIDU4OC44MjAzMTIgMjA2LjUwMzkwNiA1ODkuMzg4NjcyIDEwMC4wMzEyNSA0ODQuMDUyNzM0IFogTSAxMjIuOTU1MDc4IDQ1Ni45NjA5MzggQyAzMS42Mzg2NzIgMzY0LjUwNzgxMiAzMi4yMDcwMzEgMjE1LjQwODIwMyAxMjQuNDcwNzAzIDEyMy43MTI4OTEgQyAyMTYuNzM0Mzc1IDMyLjAxNzU3OCAzNjUuODMzOTg0IDMyLjIwNzAzMSA0NTcuNzE4NzUgMTI0LjI4MTI1IEMgNTQ5Ljc5Mjk2OSAyMTYuMTY2MDE2IDU0OS45ODI0MjIgMzY1LjI2NTYyNSA0NTguMjg3MTA5IDQ1Ny41MjkyOTcgQyAzNjYuNTkxNzk3IDU0OS43OTI5NjkgMjE3LjQ5MjE4OCA1NTAuMzYxMzI4IDEyNS4wMzkwNjIgNDU5LjA0NDkyMiBaIE0gMTI0LjA5MTc5NyA0NTcuOTA4MjAzIEwgNDUzLjkyOTY4OCAxMjguMDcwMzEyICIgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMjA2MTg2LDAsMCwwLjAyMDYxODYsMCwwKSIvPgo8L2c+Cjwvc3ZnPgo=) ! important;}');

function initLocalStorage(keys){
  vals = [];
  (async () => {
    for(key in keys){
      let val = await GM.getValue(keys[key],0);
      if(val == 0){
        await GM.setValue(keys[key],0);
      }
      vals.push(val);
    }
  })();
}



function appendIcon (jNode) {
  var nb = jNode.children(".newsListBox");
  var keys = [];
  for(elem=0;elem<nb.length;elem++){
		keys.push(nb[elem].firstChild.firstChild.firstChild.href.substring(63,83)); // substring(63,99) would be full identifier
  }
  initLocalStorage(keys);
  for(elem=0;elem<nb.length;elem++){
    var nd = nb[elem].firstChild.firstChild; // <div class="play">
    var idx = nd.firstChild.href.substring(63,83);
    var icon = '';

    (async () => {
      let curr_idx = idx;
      let curr_n = nd;
          let count_before = await GM.getValue(curr_idx, 0);
      if(count_before == 0){
        icon = '<a title="watched status" class="custom_icon notwatched" href="javascript:void(0)" id="'+curr_idx+'"></a>';
      }else{
        icon = '<a title="watched status" class="custom_icon" href="javascript:void(0)" id="'+curr_idx+'"></a>';
      }
      $(curr_n).prepend(icon);
	 curr_n.firstChild.addEventListener('click',function(){$(curr_n).children().first().toggleClass('notwatched');
         (async () => {
            let count_before = await GM.getValue(curr_idx, 0);
            count_before=count_before==1?0:1;
            await GM.setValue(curr_idx, count_before);
          })();
      },false);
    })();
  }
}

/*************** LIBRARY *********************/
// taken from https://gist.github.com/BrockA/2625891
// retrieved 18.03.2020

waitForKeyElements ("#filter-container", appendIcon);

/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content.

    IMPORTANT: This function requires your script to have loaded jQuery.
*/
function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  || false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  && timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
