// Keyboard Language
// please update this section to match this language and email me with corrections!
// ja = ISO 639-1 code for Japanese
// ***********************
jQuery.keyboard.language.ja = {
	language: '\u65e5\u672c\u8a9e (Japanese)',
	display : {
		'a'      : '\u2714:Accept (Shift+Enter)', // check mark - same action as accept
		'accept' : 'Accept:Accept (Shift+Enter)',
		'alt'    : 'AltGr:Alternate Graphemes',
		'b'      : '\u2190:Backspace',    // Left arrow (same as &larr;)
		'bksp'   : 'Bksp:Backspace',
		'c'      : '\u2716:Cancel (Esc)', // big X, close - same action as cancel
		'cancel' : 'Cancel:Cancel (Esc)',
		'clear'  : 'C:Clear',             // clear num pad
		'combo'  : '\u00f6:Toggle Combo Keys',
		'dec'    : '.:Decimal',           // decimal point for num pad (optional), change '.' to ',' for European format
		'e'      : '\u21b5:Enter',        // down, then left arrow - enter symbol
		'enter'  : 'Enter:Enter',
		'lock'   : '\u21ea Lock:Caps Lock', // caps lock
		's'      : '\u21e7:Shift',        // thick hollow up arrow
		'shift'  : 'Shift:Shift',
		'sign'   : '\u00b1:Change Sign',  // +/- sign for num pad
		'space'  : '&nbsp;:Space',
		't'      : '\u21e5:Tab',          // right arrow to bar (used since this virtual keyboard works with one directional tabs)
		'tab'    : '\u21e5 Tab:Tab',      // \u21b9 is the true tab symbol (left & right arrows)

		// these definitions are specific to the "ms-Japanese Hiragana" layout
		'default': '\u30ab \u30bf:Hiragana', // Harigana active; switch to Katakana
		'full'   : '',
		'meta1'  : 'Kana', // English half (normal) width active
		'meta2'  : 'Kana', // English full width active
		'meta3'  : '\u3072 \u3089:Katakana', // Kanakana full width active; switch to Hiragana
		'meta4'  : '\u534a:full' // Kana half width active
	},
	// Message added to the key title while hovering, if the mousewheel plugin exists
	wheelMessage : 'Use mousewheel to see other keys',
};
