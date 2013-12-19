(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['backbone'], factory);
	} else {
		// Browser globals
		root.ProjectedCollection = factory(root.Backbone);
	}
}(this, function (Backbone) {
	var ProjectedCollection = function(collection,options) {
		var sourceCollection = collection;

		var targetCollection = new (options.collection || Backbone.Collection.extend({
			model: options.model || Backbone.Model
		}))();

		var _refresh = function() {
			var result = options.projection.call(sourceCollection);
			targetCollection.set(result);
		};

		_refresh();

		sourceCollection.on('all',_refresh);

		targetCollection.dispose = function() {
			sourceCollection.off(null,_refresh);
		};

		return targetCollection;
	};

	return ProjectedCollection;
}));
