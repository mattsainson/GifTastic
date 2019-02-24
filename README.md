# GifTastic
Site: https://mattsainson.github.io/GifTastic/

This solution was created as part of a homework assignement for UC Davis Coding Bootcamp. (Matt Sainson, Sun Jan 27 2019).

Using the GIPHY API, this is a dynamic web page that allows the user to create/save and remove searches. Each search finds ten gifs on giphy.com that match the search criteria.

The user's saved searches are stored with persistence in localStorage. The user can delete saved searches.
The solution checks if the input entered is blank and does nothing when searched. It also checks if the search value already exists. If it does, it's not added again but the search is performed.
A small set of seaches are provided by default. These can be deleted. If there are no saved searches, the system will show these searches by default.
A checkbox allows the user to determine if they want to clear existing gifs or append new searches to the gifs displayed.

The user's marked favorites are stored with persistence in localStorage. The user can unmark favorites.

A welcome gif is automatically loaded the first time. The user can unmark this as a favorite to remove it from the list.

The solution uses HTML, JavaScript, jQuery (ajax with the giphy API), Bootstrap, and other CSS. Glyphs from Bootstrap 3 are included, along with a glyph CSS file to support the favorite and delete glyphs used on the buttons.
