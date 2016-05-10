(function () {
    /**
     * JSer.ajaxUpload plugin.
     *
     * @Depend   : JSer.js
     * @author   : 子秋(ziquee)
     * @qq       : 39886616
     * @copyright: http://www.jdiy.org
     *
     * to use it like this:
     *
     * JSer.ajaxUpload({
     *     form: <JSer selector>,                 // The JSer-selector String, Need to select a form element.
     *                                            // example : form: "#form1"
     *
     *     url: <url>,                            // Upload url, if not specified, the default using form element 'action' property.
     *     type: <String: json|xml|script|html>,  // Set the type of data returned. Optional string value is (case-insensitive):
     *                                               'json': The data returned as a JSON object
     *                                               'xml':  The data returned as a XML Document object.
     *                                               'script': The data returned as a script code execution.
     *                                               'html' or any other string: The data returned as a normal string.
     *
     *     timeout: <int>,                        // Timeout seconds, more than the specified time,
     *                                               being executed AJAX requests will be forced to cancel
     *                                               and call the 'error' callback function.
     *
     *     success: function(data){..},           // AJAX request after the success of the callback function.
     *                                               Internal implicit object 'this' refers to the ajax form element.
     *                                               Parameter 'data': the ajax return object, its type depends on the 'type'.
     *                                               @Warning: here 'success', only refers to the ajax-request itself,
     *                                               does not mean that upload processing page perform 'success',
     *                                               if possible, when returned data type is 'html' or 'xml',
     *                                               you should try to check the contents of the returned data to
     *                                               confirm that the ajax-upload is really 'success'.
     *
     *     error: function(status, xml, err){..}, // ajax-upload failed callback function.
     *                                               Internal implicit object 'this' refers to the ajax form element.
     *                                               Parameters:
     *                                               'status': status string, Optional value is: 'timeout', 'errorJson', 'errorScript'.
     *                                               'xml':  the ajax-upload returned document object.
     *                                               'err':  The error object (if any), it returned by the 'try..catch' statement.
     *     complete: function(status, xml){..}    // ajax-upload request completion callback function.
     *                                               In addition to time-out request, whether successful or not it will be executed.
     *                                               Internal implicit object 'this' refers to the ajax form element.
     *                                               Parameters:
     *                                               'status': status string, Optional value is: 'timeout', 'errorJson', 'errorScript'.
     *                                               'xml':  the ajax-upload returned document object.
     * });
     **/
    JSer.ajaxUpload = function (args) {
        var fm = JSer(args.form);

        if (fm.length && 'form'.eq((fm = fm.get(0))[0].nodeName)) {
            var reset = function () {
                    for (var i in res) if (res.hasOwnProperty(i)) {
                        if (res[i]) fm.attr(i, res[i]);
                        else fm.removeAttr(i);
                    }
                    frm.remove();
                },
                timer = null,
                res = {action:fm.attr('action'), target:fm.attr('target'), method:fm.attr('method'),enctype:fm.attr('enctype')},
                fid = "JSerForm" + new Date().getTime(),
                frm = JSer('<iframe name="' + fid + '" id="' + fid + '"/>').appendTo("body").hide(),
                muti = fm[0]['encoding'] ? 'encoding' : 'enctype';

            res[muti] = fm.attr(muti);
            fm.attr(muti, 'multipart/form-data').attr({
                action:args.url || fm.attr('action') || '',
                method:'post',
                target:fid
            }).submit();

            frm.load(function () {
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                var doc, txt, fo = this.contentWindow || this.contentDocument, status = 'success', err = null;
                if (fo) {
                    txt = fo.document.body ? fo.document.body.innerHTML : null;
                    doc = fo.document.XMLDocument || fo.document;
                }

                if ('script'.eq(args.type)) try {
                    eval(txt);
                } catch (e) {
                    status = 'errorScript';
                    err = e;
                }
                else if ('json'.eq(args.type)) try {
                    eval('txt=' + txt.trim());
                } catch (e) {
                    status = 'errorJson';
                    err = e;
                }

                if (status == 'success' && args.success) args.success.call(fm[0], 'xml'.eq(args.type) ? doc : txt);
                if (err && args.error) args.error.call(fm[0], status, doc, err);

                if (args.complete) args.complete.call(fm[0], status, doc);
                reset();
            });

            if (args.timeout) timer = setTimeout(function () {
                if (args.error) args.error.call(fm[0], 'timeout', null, null);
                reset();
            }, args.timeout*1000);
        }
    }
})();