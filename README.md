A port of ALE to javascript for Windows 8 and Windows Phone 8.

--Development Process--

All of the ALE files need to be kept in sync between all of the tests. The first idea to do this was to have git submodules in each of the example directories, but the checkout process for these would just be too annoying having to ignore each index.html and the manifest and whatnot. Plus, submodules are just a pain, especially for beginning students.

To keep things simple, the primary working project should be web-fullscreen. Make changes here, then propagate them to the other example directories.