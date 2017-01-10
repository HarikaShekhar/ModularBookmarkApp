angular.module('models.bookmarks', [

])
	.service('BookmarksModel', function BookmarksModel($http, $q) {
		var model = this,
		URL = {
			FETCH: 'data/bookmarks.json'
		},
		bookmarks;

		function extract(result) {
			return result.data;
		}

		function cacheBookmarks(result) {
			bookmarks = extract(result);
			return bookmarks;
		}

		model.getBookmarks = function() {
			return (bookmarks) ? $q.when(bookmarks) : $http.get(URL.FETCH).then(cacheBookmarks);
		};

		model.getBookmarkById = function(bookmarkId) {
			var deferred = $q.defer();
			var fetchedBookmark;

			function findBookmark() {
				bookmarks.forEach(function(bookmark) {
					if (bookmark.id == parseInt(bookmarkId,10)) {
						fetchedBookmark = bookmark;
					}
				})
				// console.log(fetchedBookmark);
				return fetchedBookmark;
			}

			if (bookmarks) {
				deferred.resolve(findBookmark());
			} else {
				model.getBookmarks().then(function() {
					deferred.resolve(findBookmark());
				});
			}

			return deferred.promise;
		}

		model.createBookmark = function(bookmark) {
			bookmark.id = bookmarks.length;
			bookmarks.push(bookmark);
		}

		model.updateBookmark = function(bookmark) {
			bookmarks.forEach(function(b,id) {
				// console.log(b);
				if (b.id == bookmark.id) {
					// console.log(bookmark.id);
					bookmarks[id] = bookmark;
				}
			})
		}

        // model.updateBookmark = function (bookmark) {
        //     var index = _.findIndex(bookmarks, function (b) {
        //         return b.id == bookmark.id
        //     });

        //     bookmarks[index] = bookmark;
        // };

		// model.deleteBookmark = function(bookmark) {
		// 	bookmarks = bookmarks.filter(function(el, id) {
		// 		return el.id !== bookmark.id;
		// 	})
		// 	// console.log(bookmarks);
		// }

        model.deleteBookmark = function (bookmark) {
            _.remove(bookmarks, function (b) {
                return b.id == bookmark.id;
            });
        };
	})
;