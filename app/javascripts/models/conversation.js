(function () {
  var Conversation = {};

  Conversation.initialize = function (options) {
  };

 /**
  * Returns the class name
  *
  * @return {String}
  */
  Conversation.className = function () {
    return 'Conversation';
  };

  Conversation.klassName = Conversation.className;

  /**
   * TODO: Remove this hack, `isConversation` belongs to a Thread
   * no one should be talkin to a Conversation if its
   * expecting a Thread
   */
  Conversation.isConversation = function () {
    return true;
  };

  /**
   * Return the public url
   *
   * @return {String}
   */
  Conversation.publicUrl = function () {
    return '/projects/' + this.get('project_id') + '/conversations/' + this.id;
  };

  /**
   * Return the `convert_to_task` url
   *
   * @return {String}
   */
  Conversation.convertToTaskUrl = function () {
    return '/api/1/projects/' + this.get('project_id') + '/conversations/' + this.id + '/convert_to_task';
  };

  /**
   * Return the `comments` url
   *
   * @return {String}
   */
  Conversation.commentsUrl = function () {
    return '/api/1/projects/' + this.get('project_id') + '/conversations/' + this.id + '/comments';
  };

  /**
   * Return the resource url
   *
   * @return {String}
   */
  Conversation.url = function () {
    return "/api/1/conversations/" + this.id;
  };

  /**
   * Parses the incoming data from the API
   *
   * @return {Object}
   */
  Conversation.parse = function (response) {
    return _.parseFromAPI(response)[0];
  };

  /**
   * Check if the model has been loaded fully
   *
   * @return {Boolean}
   */
  Conversation.isLoaded = function () {
    // If it doesn't have a project_id, for example, it's not loaded
    return !!this.getAttributes().project_id;
  };

  /**
   * Calls to the convert_to_task API
   *
   * @param {Object} parameters
   * @param {Function} onSuccess
   * @param {Function} onFailure
   */
  Conversation.convertToTask = function (parameters, onSuccess, onFailure) {
    var url = this.convertToTaskUrl()
      , a = new Ajax.Request(url, { method: 'post'
                                  , parameters: parameters
                                  , requestHeaders: {Accept: 'application/json'}
                                  , onSuccess: onSuccess
                                  , onFailure: onFailure});
  };
  
  Conversation.prefix = function() {
    return "conversation" + this.id;
  };
  
  Conversation.parseComments = function (response) {
    var thread_attributes = response.objects || response
      , comment_attributes = _.detect(response.references, function (ref) {
          return thread_attributes.recent_comment_ids[0] === ref.id;
        })
      , assigned_user = _.detect(response.references, function (ref) {
          return ref.type === 'Person' && comment_attributes.assigned_id === ref.id;
        })
      , project = _.detect(response.references, function (ref) {
          return ref.type === 'Project' && comment_attributes.project_id === ref.id;
        });

    if (assigned_user) {
      comment_attributes.assigned = assigned_user;
    }

    if (project) {
      comment_attributes.project = project;
    }

    if (typeof comment_attributes.body_html === 'string') {
      comment_attributes.body = _.unescapeHTML(comment_attributes.body);
      comment_attributes.body_html = _.unescapeHTML(comment_attributes.body_html);
    }

    return comment_attributes;
  };

  // exports
  Teambox.Models.Conversation = Teambox.Models.Base.extend(Conversation);
}());
