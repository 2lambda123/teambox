(function () {

  var Note = {};

  Note.parse = function (response) {
    // Link slot objects from references
    return _.parseFromAPI(response);
  };

  /**
   * Check if the model has been loaded fully
   *
   * @return {Boolean}
   */
  Note.isLoaded = function () {
    // If it doesn't have a project_id, for example, it's not loaded
    return !!this.getAttributes().project_id;
  };


  // exports
  Teambox.Models.Note = Teambox.Models.Base.extend(Note);
}());
