# Icons for jQuery-UI #
* 332 unique icons for jQuery UI / jQuery Mobile. All icons are complete drawn by hand and optimized for a minimal size of 14×14 pixels. 
* Resizable and mobile friendly icons. 
* Change the color of icons without generating graphic files. 
* Works with all jQuery UI 1.11.2, 1.11.3, 1.11.4, 1.12 & 1.12.1 themes and jQuery Mobile 1.4.5. 
* Easy to use, no extra plugins or hacks needed. 
* Included CSS3 animation for e.g. AJAX loading status. 
* Icon License [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/)


### Usage ###
#### Include the Icon Font ####
Copy the file _`jquery-ui-1.12.icon-font.min.css`_ or _`jquery-ui-1.11.icon-font.min.css`_ and the folder _`font`_ into your folder, 
which holds your CSS-files. You can also rename e.g. _`jquery-ui-1.12.icon-font.min.css`_ to _`jquery-ui.icon-font.min.css`_. For debugging and/or develope you may use CSS-files without _`.min`_ (e.g. _`jquery-ui-1.12.icon-font.css`_).  
Add in the `<head>`-section of your html document a link to the new CSS-file.  
For jQuery Mobile it doesn't matter wich file is used, but only _`jquery-ui-1.11.icon-font`_ is fully tested.

##### Example Include #####
```html
  <head>
    <!-- ... -->
    <link href="css/theme/jquery-ui.css" rel="stylesheet" type="text/css" /> 
    <link href="css/theme/jquery-ui.icon-font.css" rel="stylesheet" type="text/css" /> 
    <script src="js/jquery.min.js" type="text/javascript"></script> 
    <script src="js/jquery-ui.min.js" type="text/javascript"></script> 
    <!-- ... --> 
  </head>
```
**Note:**  
The file _`jquery-ui.icon-font.css`_ and the minified version are for jQuery UI 1.12.x.
For jQuery UI 1.11.x or jQuery Mobile please use the _`jquery-ui-1.11.icon-font.css`_ or the minified
version _`jquery-ui-1.11.icon-font.min.css`_. 

#### How to use an icon in HTML-markup ####

To display an icon is really simple:
```html
  <p class="ui-widget-content
    ui-state-default ui-helper-clearfix">
    <span style="float: left; margin-right: 0.5em;"
      class="ui-icon ui-icon-jquery">icon</span>
    ui-icon-jquery
  </p>
```  

**Note:**  
Please only use the class names in the CSS-file to display the required icon and never the unicode value (e.g. "\e601"). I could not guarantee that the entered unicode will show the requested glyph on future releases.

### Bugs, features and feedback ###
Please report bugs or feature requests on the [issue-tracker](https://github.com/mkkeck/jquery-ui-iconfont/issues).


### Demo ###
Take a look at the demo under [https://mkkeck.github.io/jquery-ui-iconfont/](http://mkkeck.github.io/jquery-ui-iconfont/)

### Screenshot ###
![Screenshot](https://raw.githubusercontent.com/mkkeck/jquery-ui-iconfont/master/screen.png)
