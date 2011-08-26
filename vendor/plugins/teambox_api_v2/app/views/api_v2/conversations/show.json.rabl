object @conversation

# FIXME: For some reason extends returns only empty hashes.
# extends 'api_v2/conversations/base'

attributes :id, :name, :project_id, :user_id, :simple, :comments_count, :is_private, :hidden_comments_count
extends 'api_v2/shared/type'
extends 'api_v2/shared/dates'

code(:watchers) { |c| Array.wrap(c.watcher_ids) }

child(:first_comment => :first_comment) { extends 'api_v2/comments/base' }
child(:recent_comments => :recent_comments) { extends 'api_v2/comments/base' }
child(:project) { extends 'api_v2/projects/base' }

# TODO add child(:comments) if required
