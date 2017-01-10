angular.module('categories.bookmarks.edit', [

])
	.config(function config($stateProvider) {
		$stateProvider
			.state('booky.categories.bookmarks.edit', {
				url: '/bookmarks/:bookmarkId/edit',
				templateUrl: 'app/categories/bookmarks/edit/bookmark-edit.tmpl.html',
				controller: 'BookmarkEditCtrl as bmEditCtrl'
			})
	})
	.controller('BookmarkEditCtrl', function BookmarkEditCtrl($state, $stateParams, BookmarksModel) {
		var bmEditCtrl = this;

		function returnToBookmarks() {
			$state.go('booky.categories.bookmarks',{
				category: $stateParams.category
			})
		}

		function cancelEditing() {
			returnToBookmarks();
		}

		function updateBookmark() {
			bmEditCtrl.bookmark = angular.copy(bmEditCtrl.editedBookmark);
			BookmarksModel.updateBookmark(bmEditCtrl.bookmark);
			returnToBookmarks();
		}

		BookmarksModel.getBookmarkById($stateParams.bookmarkId)
			.then(function(bookmark) {
				if(bookmark) {
					bmEditCtrl.bookmark = bookmark;
					bmEditCtrl.editedBookmark = angular.copy(bmEditCtrl.bookmark);
				} else {
					returnToBookmarks();
				}
			})

		bmEditCtrl.updateBookmark = updateBookmark;
		bmEditCtrl.cancelEditing = cancelEditing;
	})
;