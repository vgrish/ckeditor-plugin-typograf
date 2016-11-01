(function () {

	if (CKEDITOR.plugins.get('typograf')) {
		return false;
	}

	CKEDITOR.plugins.add('typograf', {

		lang: 'en,ru',
		icons: 'typograf',
		hidpi: true,
		init: function (editor) {
			var pluginName = 'typograf',
				plugin = this,
				tp;

			CKEDITOR.scriptLoader.load(plugin.path + 'lib/typograf/dist/typograf.min.js', function () {

				tp = new Typograf({
					lang: CKEDITOR.lang.detect(),
					mode: 'name'
				});
			});

			editor.addCommand(pluginName, {
				exec: function (e) {

					if (!tp) {
						return;
					}

					var sel = e.getSelection(),
						frag = e.getSelectedHtml(),
						html = frag.getHtml(),
						editable = e.editable(),
						range = sel.getRanges()[0];

					if (CKEDITOR.env.ie) {
						sel.root.fire('selectionchange');
					}
					
					if (html != '') {
						e.insertHtml(tp.execute(html));
					}

				},
				modes: {wysiwyg: 1},
				canUndo: true
			});

			editor.ui.addButton && editor.ui.addButton('Typograf', {
				label: editor.lang.typograf.toolbar,
				command: pluginName,
				toolbar: 'doctools,50'
			});

		}
	});

})();
